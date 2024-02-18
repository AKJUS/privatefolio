import {
  AddRounded,
  QuestionMarkRounded,
  RemoveRounded,
  SvgIconComponent,
  SwapHoriz,
} from "@mui/icons-material"
import { alpha, Chip, Stack, Tooltip } from "@mui/material"
import { grey } from "@mui/material/colors"
import React from "react"
import { AuditLogOperation, TransactionType } from "src/interfaces"
import { greenColor, redColor } from "src/utils/color-utils"

import { Truncate } from "./Truncate"

type Action = AuditLogOperation | TransactionType

type ActionBlockProps = {
  IconComponent?: SvgIconComponent
  action: string
  color?: string
}

const colorMap: Partial<Record<Action, string>> = {
  Buy: greenColor,
  Distribution: greenColor,
  Fee: redColor,
  Sell: redColor,
}

const iconMap: Partial<Record<Action, SvgIconComponent>> = {
  Buy: AddRounded,
  Deposit: AddRounded,
  Distribution: AddRounded,
  Fee: RemoveRounded,
  Sell: RemoveRounded,
  Swap: SwapHoriz,
  Unknown: QuestionMarkRounded,
  Withdraw: RemoveRounded,
}

export function ActionBlock(props: ActionBlockProps) {
  const { action, color: colorOverride, IconComponent: IconComponentOverride } = props

  const color = colorOverride || colorMap[action] || grey[500]
  const IconComponent = IconComponentOverride || iconMap[action]

  return (
    <Tooltip title={action}>
      <Chip
        size="small"
        sx={{ background: alpha(color, 0.075) }}
        label={
          <Stack direction="row" gap={0.5} alignItems="center" paddingRight={0.5}>
            {IconComponent && <IconComponent sx={{ color, fontSize: "inherit" }} />}
            <Truncate>{action}</Truncate>
          </Stack>
        }
      />
    </Tooltip>
  )
}
