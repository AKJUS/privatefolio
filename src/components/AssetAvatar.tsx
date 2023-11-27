import { alpha, Avatar, AvatarProps, styled, Typography } from "@mui/material"
import React from "react"

import { MonoFont } from "../theme"
import { stringToColor } from "../utils/color-utils"

const StyledAvatar = styled(Avatar)`
  &.MuiAvatar-colorDefault {
    border: 1px solid ${({ color = "#fff" }) => alpha(color, 0.25)};
    background: ${({ color = "#fff" }) => alpha(color, 0.15)};
  }
`

export interface AssetAvatarProps extends AvatarProps {
  alt: string
  size?: "small" | "large"
}

const smallSize = 18
const largeSize = 40

export function AssetAvatar(props: AssetAvatarProps) {
  const { alt, size = "large", sx, ...rest } = props
  const color = stringToColor(alt)

  return (
    <StyledAvatar
      sx={{
        height: size === "small" ? smallSize : largeSize,
        width: size === "small" ? smallSize : largeSize,
        ...sx,
      }}
      color={color}
      {...rest}
    >
      <Typography
        fontWeight={500}
        fontSize={size === "small" ? "0.65rem" : "0.85rem"}
        fontFamily={MonoFont}
        color={color}
      >
        {alt.slice(0, size === "small" ? 1 : 3)}
      </Typography>
    </StyledAvatar>
  )
}
