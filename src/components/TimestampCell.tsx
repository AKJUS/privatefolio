import { Stack, Tooltip, Typography } from "@mui/material"
import { useStore } from "@nanostores/react"
import React from "react"

import { Timestamp } from "../interfaces"
import { $devMode } from "../stores/app-store"
import {
  formatDate,
  formatDateRelative,
  formatDateWithHour,
  formatHour,
} from "../utils/formatting-utils"

type TimestampCellProps = {
  relative?: boolean
  timestamp: Timestamp
}

export function TimestampCell(props: TimestampCellProps) {
  const { timestamp, relative } = props

  const devMode = useStore($devMode)

  return (
    <Tooltip
      title={
        <Stack>
          <span>
            {formatDateWithHour(timestamp, {
              second: "numeric",
              timeZoneName: "short",
            })}{" "}
            <span className="secondary">local</span>
          </span>
          <span>
            {formatDateWithHour(timestamp, {
              second: "numeric",
              timeZone: "UTC",
              timeZoneName: "short",
            })}
          </span>
          {devMode && (
            <span>
              {timestamp} <span className="secondary">unix timestamp</span>
            </span>
          )}
        </Stack>
      }
    >
      <span>
        {relative ? (
          <span>{formatDateRelative(timestamp)}</span>
        ) : (
          <>
            <span>{formatDate(timestamp)}</span>{" "}
            <Typography component="span" color="text.secondary" variant="inherit">
              at {formatHour(timestamp)}
            </Typography>
          </>
        )}
      </span>
    </Tooltip>
  )
}
