import { Avatar, AvatarProps } from "@mui/material"
import { keccak256, toUtf8Bytes } from "ethers"
import { memoize } from "lodash-es"
import React from "react"

export interface AccountAvatarProps extends AvatarProps {
  alt: string
  size?: "small" | "medium" | "large"
}

const SIZE_MAP = {
  large: 50,
  medium: 28,
  small: 20,
}

export function AccountAvatar(props: AccountAvatarProps) {
  const { alt, size = "medium", sx, ...rest } = props
  const colors = getGradientColors(stringToHex(alt))

  return (
    <Avatar
      sx={{
        backgroundColor: colors[0],
        backgroundImage: `
        radial-gradient(at 66% 77%, ${colors[1]} 0px, transparent 50%),
        radial-gradient(at 29% 97%, ${colors[2]} 0px, transparent 50%),
        radial-gradient(at 99% 86%, ${colors[3]} 0px, transparent 50%),
        radial-gradient(at 29% 88%, ${colors[4]} 0px, transparent 50%)`,
        // boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.1)",
        color: "transparent",
        height: SIZE_MAP[size],
        width: SIZE_MAP[size],
        ...sx,
      }}
      {...rest}
    >
      {alt}
    </Avatar>
  )
}

export const stringToHex = memoize((string: string) => keccak256(toUtf8Bytes(string)))

// https://github.com/JackHamer09/web3-avatar/blob/main/js/index.ts
export const getGradientColors = memoize((address: string) => {
  const seedArr = address.match(/.{1,7}/gi)?.splice(0, 5)
  const colors: string[] = []

  seedArr?.forEach((seed) => {
    let hash = 0
    for (let i = 0; i < seed.length; i += 1) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash)
      hash = hash & hash
    }

    const rgb = [0, 0, 0]
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 255
      rgb[i] = value
    }
    colors.push(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`)
  })

  return colors
})
