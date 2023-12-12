"use client"
import { Stack, StackProps } from "@mui/material"
import { animated, AnimationConfig, useTrail } from "@react-spring/web"
import React, { Children } from "react"

import { SPRING_CONFIGS } from "../utils/utils"

export type StaggeredListProps = StackProps & {
  config?: Partial<AnimationConfig>
  secondary?: boolean
  show?: boolean
}

const SHOW_STATE = { opacity: 1, y: 0 }
const HIDE_STATE = { opacity: 0, y: -15 }
const INIT_STATE = { opacity: 0, y: -15 }

const SEC_SHOW_STATE = { opacity: 1, x: 0 }
const SEC_HIDE_STATE = { opacity: 0, x: 30 }
const SEC_INIT_STATE = { opacity: 0, x: 30 }

export function StaggeredList(props: StaggeredListProps) {
  const { children, show = true, config, secondary = false, ...rest } = props
  const hideState = secondary ? SEC_HIDE_STATE : HIDE_STATE
  const showState = secondary ? SEC_SHOW_STATE : SHOW_STATE
  const initState = secondary ? SEC_INIT_STATE : INIT_STATE

  const items = Children.toArray(children)
  const trails = useTrail(items.length, {
    config: config || (show ? SPRING_CONFIGS.quicker : SPRING_CONFIGS.veryQuick),
    from: show ? initState : hideState,
    reverse: !show,
    to: show ? showState : hideState,
  })

  return (
    <Stack {...rest}>
      {trails.map((props, index) => (
        <animated.div key={index} style={props}>
          {items[index]}
        </animated.div>
      ))}
    </Stack>
  )
}
