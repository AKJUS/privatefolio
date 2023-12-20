/* eslint-disable @typescript-eslint/member-ordering */
import { IChartApi } from "lightweight-charts"

import { MainFont, MonoFont } from "../../../theme"
import { CommonTooltipOptions } from "../../../utils/chart-utils"

export interface TooltipOptions extends CommonTooltipOptions {
  title: string
  followMode: "top" | "tracking"
  /** fallback horizontal deadzone width */
  horizontalDeadzoneWidth: number
  verticalDeadzoneHeight: number
  verticalSpacing: number
  /** topOffset is the vertical spacing when followMode is 'top' */
  topOffset: number
}

const defaultOptions: TooltipOptions = {
  backgroundColor: "yellow",
  borderColor: "blue",
  color: "green",
  dateSecondary: false,
  followMode: "top",
  horizontalDeadzoneWidth: 45,
  secondaryColor: "brown",
  showTime: true,
  title: "",
  topOffset: 15,
  verticalDeadzoneHeight: 60,
  verticalSpacing: 20,
}

export interface TooltipContentData {
  title?: string
  price: string
  date: string
  time: string
  symbol: string
}

export interface TooltipPosition {
  visible: boolean
  paneX: number
  paneY: number
}

export class TooltipElement {
  private _chart: IChartApi | null

  private _element: HTMLDivElement | null
  private _titleElement: HTMLDivElement | null
  private _priceElement: HTMLDivElement | null
  private _dateElement: HTMLDivElement | null
  private _timeElement: HTMLDivElement | null

  private _options: TooltipOptions

  private _lastTooltipWidth: number | null = null

  public constructor(chart: IChartApi, options: Partial<TooltipOptions>) {
    this._options = {
      ...defaultOptions,
      ...options,
    }
    this._chart = chart

    const element = document.createElement("div")
    applyStyle(element, {
      "align-items": "center",
      "background-color": this._options.backgroundColor,
      "box-shadow": `0px 0px 1px ${this._options.borderColor}}`,
      color: this._options.color,
      display: "flex",
      "flex-direction": "column",
      "font-family": MainFont,
      "font-size": "14px",
      "font-weight": "300",
      left: "0%",
      "line-height": "16px",
      opacity: "0",
      padding: "8px 12px",
      "pointer-events": "none",
      position: "absolute",
      top: "0",
      transform: "translate(calc(0px - 50%), 0px)",
      "z-index": "100",
    })

    const titleElement = document.createElement("div")
    applyStyle(titleElement, {
      "font-size": "16px",
      "font-weight": "500",
      "line-height": "20px",
    })
    setElementText(titleElement, this._options.title)
    element.appendChild(titleElement)

    const dateContainer = document.createElement("div")
    applyStyle(dateContainer, {
      color: this._options.dateSecondary ? this._options.secondaryColor : "inherit",
      display: "flex",
      "flex-direction": "row",
      "font-weight": "400",
      "margin-bottom": "8px",
    })
    element.appendChild(dateContainer)

    const dateElement = document.createElement("div")
    setElementText(dateElement, "")
    dateContainer.appendChild(dateElement)

    const timeElement = document.createElement("div")
    applyStyle(timeElement, {
      color: this._options.secondaryColor,
      "margin-left": "5px",
    })
    setElementText(timeElement, "")
    dateContainer.appendChild(timeElement)

    const priceElement = document.createElement("div")
    applyStyle(priceElement, {
      "font-family": MonoFont,
      "font-size": "18px",
      "font-weight": "500",
      "line-height": "18px",
    })
    setElementText(priceElement, "")
    element.appendChild(priceElement)

    this._element = element
    this._titleElement = titleElement
    this._priceElement = priceElement
    this._dateElement = dateElement
    this._timeElement = timeElement

    const chartElement = this._chart.chartElement()
    chartElement.appendChild(this._element)

    const chartElementParent = chartElement.parentElement
    if (!chartElementParent) {
      console.error("Chart Element is not attached to the page.")
      return
    }
    const position = getComputedStyle(chartElementParent).position
    if (position !== "relative" && position !== "absolute") {
      console.error("Chart Element position is expected be `relative` or `absolute`.")
    }
  }

  public destroy() {
    if (this._chart && this._element) this._chart.chartElement().removeChild(this._element)
  }

  public applyOptions(options: Partial<TooltipOptions>) {
    this._options = {
      ...this._options,
      ...options,
    }
  }

  public options(): TooltipOptions {
    return this._options
  }

  public updateTooltipContent(content: TooltipContentData) {
    if (!this._element) return
    const tooltipMeasurement = this._element.getBoundingClientRect()
    this._lastTooltipWidth = tooltipMeasurement.width
    if (content.title !== undefined && this._titleElement) {
      setElementText(this._titleElement, content.title)
    }
    setElementText(this._priceElement, `${content.symbol}${content.price}`)
    setElementText(this._dateElement, content.date)
    setElementText(this._timeElement, this._options.showTime ? `at ${content.time}` : "")
  }

  public updatePosition(positionData: TooltipPosition) {
    if (!this._chart || !this._element) return
    this._element.style.opacity = positionData.visible ? "1" : "0"
    if (!positionData.visible) {
      return
    }
    const x = this._calculateXPosition(positionData, this._chart)
    const y = this._calculateYPosition(positionData)
    this._element.style.transform = `translate(${x}, ${y})`
  }

  private _calculateXPosition(positionData: TooltipPosition, chart: IChartApi): string {
    const x = positionData.paneX + chart.priceScale("left").width()
    const deadzoneWidth = this._lastTooltipWidth
      ? Math.ceil(this._lastTooltipWidth / 2)
      : this._options.horizontalDeadzoneWidth
    const xAdjusted = Math.min(
      Math.max(deadzoneWidth, x),
      chart.timeScale().width() - deadzoneWidth
    )
    return `calc(${xAdjusted}px - 50%)`
  }

  private _calculateYPosition(positionData: TooltipPosition): string {
    if (this._options.followMode === "top") {
      return `${this._options.topOffset}px`
    }
    const y = positionData.paneY
    const flip = y <= this._options.verticalSpacing + this._options.verticalDeadzoneHeight
    const yPx = y + (flip ? 1 : -1) * this._options.verticalSpacing
    const yPct = flip ? "" : " - 100%"
    return `calc(${yPx}px${yPct})`
  }
}

function setElementText(element: HTMLDivElement | null, text: string) {
  if (!element) return
  if (text !== element.innerText) {
    element.innerText = text
  }
  if (element.style.display !== text ? "block" : "none") {
    element.style.display = text ? "block" : "none"
  }
}

function applyStyle(element: HTMLElement, styles: Record<string, string>) {
  for (const [key, value] of Object.entries(styles)) {
    element.style.setProperty(key, value)
  }
}
