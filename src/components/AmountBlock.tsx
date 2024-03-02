import { Box, Stack, Tooltip, Typography, TypographyProps } from "@mui/material"
import { useStore } from "@nanostores/react"
import React, { useMemo, useState } from "react"
import { $debugMode } from "src/stores/app-store"
import { MonoFont } from "src/theme"
import { greenColor, redColor } from "src/utils/color-utils"
import { EMPTY_OBJECT } from "src/utils/utils"

import { formatNumber, getDecimalPrecision } from "../utils/formatting-utils"

type AmountBlockProps = TypographyProps & {
  amount?: string | number
  colorized?: boolean
  currencySymbol?: string
  currencyTicker?: string
  // formatOpts?: Intl.NumberFormatOptions
  maxDigits?: number
  placeholder?: string
  showSign?: boolean
  showTicker?: boolean
  significantDigits?: number
  tooltipMessage?: string
}

const showSignOpts = { signDisplay: "always" } as const

export function AmountBlock(props: AmountBlockProps) {
  const {
    amount,
    currencyTicker,
    currencySymbol = "",
    significantDigits,
    tooltipMessage,
    // formatOpts = EMPTY_OBJECT,
    placeholder = "Unknown",
    colorized,
    showTicker,
    showSign,
    maxDigits,
    ...rest
  } = props

  const hasValue = amount !== undefined
  const amountN = hasValue ? Number(amount) : undefined
  const formatOpts = showSign && amount !== 0 ? showSignOpts : EMPTY_OBJECT

  const debugMode = useStore($debugMode)

  // let minimumFractionDigits = currencyTicker === "USDT" ? 2 : significantDigits TODO derive this from the ticker
  let minimumFractionDigits = debugMode ? 4 : significantDigits

  // auto-adjust minimumFractionDigits
  if (minimumFractionDigits === undefined && typeof amountN === "number") {
    if (amountN > 10_000 || amountN < -10_000) minimumFractionDigits = 0
    else if (amountN < 1 && amountN > -1)
      minimumFractionDigits = Math.min(getDecimalPrecision(amountN), 6)
  }

  const [copied, setCopied] = useState(false)

  const formattedValue = useMemo(() => {
    if (typeof amountN !== "number") return ""

    return formatNumber(amountN, {
      maximumFractionDigits: minimumFractionDigits,
      minimumFractionDigits,
      // notation: "compact",
      ...formatOpts,
    })
  }, [amountN, formatOpts, minimumFractionDigits])

  const fullLabel = useMemo(() => {
    if (typeof amountN !== "number") return ""

    let fullLabel = `${currencySymbol}${formattedValue}`

    if (showTicker) {
      fullLabel = `${fullLabel} ${currencyTicker}`
    }

    fullLabel = fullLabel.replace(`${currencySymbol}-`, `-${currencySymbol}`)

    return fullLabel
  }, [amountN, currencySymbol, currencyTicker, formattedValue, showTicker])

  return (
    <Tooltip
      title={
        typeof amountN === "number" ? (
          <Stack alignItems="center">
            <Box sx={{ fontFamily: MonoFont }}>
              {formattedValue} {currencyTicker}
            </Box>
            <span className="secondary">({copied ? "copied" : "copy to clipboard"})</span>
          </Stack>
        ) : (
          tooltipMessage
        )
      }
    >
      <Typography
        fontFamily={MonoFont}
        variant="inherit"
        component="span"
        sx={{
          color: !colorized
            ? undefined
            : typeof amountN !== "number"
            ? undefined
            : amountN === 0
            ? "text.secondary"
            : amountN > 0
            ? greenColor
            : redColor,
          cursor: hasValue ? "pointer" : undefined,
        }}
        onClick={() => {
          if (!hasValue) return

          const clipText = maxDigits ? (amountN as number).toFixed(maxDigits) : String(amount)
          navigator.clipboard.writeText(clipText)

          setCopied(true)

          setTimeout(() => {
            setCopied(false)
          }, 1_000)
        }}
        {...rest}
      >
        {typeof amountN === "number" ? (
          fullLabel
        ) : (
          <Typography color="text.secondary" component="span" variant="inherit">
            {placeholder}
          </Typography>
        )}
      </Typography>
    </Tooltip>
  )
}
