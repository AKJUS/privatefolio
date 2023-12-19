/* eslint-disable @typescript-eslint/member-ordering */
import { CanvasRenderingTarget2D } from "fancy-canvas"
import {
  CandlestickData,
  CrosshairMode,
  ISeriesPrimitive,
  ISeriesPrimitivePaneRenderer,
  ISeriesPrimitivePaneView,
  LineData,
  MouseEventParams,
  SeriesAttachedParameter,
  SeriesPrimitivePaneViewZOrder,
  Time,
  WhitespaceData,
} from "lightweight-charts"
import { throttle } from "lodash"

import { formatNumber } from "../../../utils/formatting-utils"
import { positionsLine } from "../../helpers/dimensions/positions"
import { convertTime, formattedDateAndTime } from "../../helpers/time"
import { TooltipElement, TooltipOptions } from "./tooltip-element"

class TooltipCrosshairLinePaneRenderer implements ISeriesPrimitivePaneRenderer {
  _data: TooltipCrosshairLineData

  constructor(data: TooltipCrosshairLineData) {
    this._data = data
  }

  draw(target: CanvasRenderingTarget2D) {
    if (!this._data.visible) return
    target.useBitmapCoordinateSpace((scope) => {
      const ctx = scope.context
      const crosshairPos = positionsLine(this._data.x, scope.horizontalPixelRatio, 1)
      ctx.fillStyle = this._data.color
      ctx.fillRect(
        crosshairPos.position,
        this._data.topMargin * scope.verticalPixelRatio,
        crosshairPos.length,
        scope.bitmapSize.height
      )
    })
  }
}

class MultiTouchCrosshairPaneView implements ISeriesPrimitivePaneView {
  _data: TooltipCrosshairLineData
  constructor(data: TooltipCrosshairLineData) {
    this._data = data
  }

  update(data: TooltipCrosshairLineData): void {
    this._data = data
  }

  renderer(): ISeriesPrimitivePaneRenderer | null {
    return new TooltipCrosshairLinePaneRenderer(this._data)
  }

  zOrder(): SeriesPrimitivePaneViewZOrder {
    return "bottom"
  }
}

interface TooltipCrosshairLineData {
  x: number
  visible: boolean
  color: string
  topMargin: number
}

const defaultOptions: TooltipPrimitiveOptions = {
  currencySymbol: "",
  lineColor: "rgba(127, 127, 127, 0.5)",
  priceExtractor: (
    data: LineData | CandlestickData | WhitespaceData,
    significantDigits: number
  ) => {
    if ((data as LineData).value !== undefined) {
      return formatNumber((data as LineData).value, {
        maximumFractionDigits: significantDigits,
        minimumFractionDigits: significantDigits,
      })
    }
    if ((data as CandlestickData).close !== undefined) {
      return formatNumber((data as CandlestickData).close, {
        maximumFractionDigits: significantDigits,
        minimumFractionDigits: significantDigits,
      })
    }
    return ""
  },
  significantDigits: 2,
}

export interface TooltipPrimitiveOptions {
  lineColor: string
  tooltip?: Partial<TooltipOptions>
  priceExtractor: <T extends WhitespaceData>(dataPoint: T, significantDigits: number) => string
  /**
   * @default 2
   */
  significantDigits: number
  /**
   * @default ""
   */
  currencySymbol: string
}

export class TooltipPrimitive implements ISeriesPrimitive<Time> {
  private _options: TooltipPrimitiveOptions
  private _tooltip: TooltipElement | undefined = undefined
  _paneViews: MultiTouchCrosshairPaneView[]
  _data: TooltipCrosshairLineData = {
    color: "rgba(0, 0, 0, 0)",
    topMargin: 0,
    visible: false,
    x: 0,
  }

  _attachedParams: SeriesAttachedParameter<Time> | undefined

  constructor(options: Partial<TooltipPrimitiveOptions> = {}) {
    this._options = {
      ...defaultOptions,
      ...options,
    }
    this._paneViews = [new MultiTouchCrosshairPaneView(this._data)]
  }

  attached(param: SeriesAttachedParameter<Time>): void {
    this._attachedParams = param
    this._setCrosshairMode()
    param.chart.subscribeCrosshairMove(this._moveHandler)
    this._createTooltipElement()
  }

  detached(): void {
    const chart = this.chart()
    if (chart) {
      chart.unsubscribeCrosshairMove(this._moveHandler)
    }
  }

  paneViews() {
    return this._paneViews
  }

  updateAllViews() {
    this._paneViews.forEach((pw) => pw.update(this._data))
  }

  setData(data: TooltipCrosshairLineData) {
    this._data = data
    this.updateAllViews()
    this._attachedParams?.requestUpdate()
  }

  currentColor() {
    return this._options.lineColor
  }

  chart() {
    return this._attachedParams?.chart
  }

  series() {
    return this._attachedParams?.series
  }

  applyOptions(options: Partial<TooltipPrimitiveOptions>) {
    this._options = {
      ...this._options,
      ...options,
    }
    if (this._tooltip) {
      this._tooltip.applyOptions({ ...this._options.tooltip })
    }
  }

  private _setCrosshairMode() {
    const chart = this.chart()
    if (!chart) {
      throw new Error("Unable to change crosshair mode because the chart instance is undefined")
    }
    chart.applyOptions({
      crosshair: {
        horzLine: {
          labelVisible: false,
          visible: false,
        },
        mode: CrosshairMode.Magnet,
        vertLine: {
          labelVisible: false,
          visible: false,
        },
      },
    })
  }

  private _moveHandler = throttle((param: MouseEventParams) => this._onMouseMove(param), 10)

  private _hideTooltip() {
    if (!this._tooltip) return
    this._tooltip.updateTooltipContent({
      date: "",
      price: "",
      symbol: "",
      time: "",
      title: "",
    })
    this._tooltip.updatePosition({
      paneX: 0,
      paneY: 0,
      visible: false,
    })
  }

  private _hideCrosshair() {
    this._hideTooltip()
    this.setData({
      color: this.currentColor(),
      topMargin: 0,
      visible: false,
      x: 0,
    })
  }

  private _onMouseMove(param: MouseEventParams) {
    const chart = this.chart()
    const series = this.series()
    const logical = param.logical
    if (!logical || !chart || !series) {
      this._hideCrosshair()
      return
    }
    const data = param.seriesData.get(series)
    if (!data) {
      this._hideCrosshair()
      return
    }
    const price = this._options.priceExtractor(data, this._options.significantDigits)
    const coordinate = chart.timeScale().logicalToCoordinate(logical)
    const [date, time] = formattedDateAndTime(param.time ? convertTime(param.time) : undefined)
    if (this._tooltip) {
      const tooltipOptions = this._tooltip.options()
      const topMargin = tooltipOptions.followMode === "top" ? tooltipOptions.topOffset + 10 : 0
      this.setData({
        color: this.currentColor(),
        topMargin,
        visible: coordinate !== null,
        x: coordinate ?? 0,
      })
      this._tooltip.updateTooltipContent({
        date,
        price,
        symbol: this._options.currencySymbol,
        time,
      })
      this._tooltip.updatePosition({
        paneX: param.point?.x ?? 0,
        paneY: param.point?.y ?? 0,
        visible: true,
      })
    }
  }

  private _createTooltipElement() {
    const chart = this.chart()
    if (!chart) throw new Error("Unable to create Tooltip element. Chart not attached")
    this._tooltip = new TooltipElement(chart, {
      ...this._options.tooltip,
    })
  }
}
