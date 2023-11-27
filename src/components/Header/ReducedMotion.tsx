import {
  AnimationRounded,
  DisplaySettingsRounded,
  RadioButtonUncheckedRounded,
} from "@mui/icons-material"
import { Tab, Tabs, tabsClasses } from "@mui/material"
import { useStore } from "@nanostores/react"
import React from "react"

import { $reducedMotion } from "../../stores/app-store"

export function ReducedMotion() {
  const reducedMotion = useStore($reducedMotion)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const newReducedMotion = newValue === 0 ? "always" : newValue === 1 ? "user" : "never"
    $reducedMotion.set(newReducedMotion)
    localStorage.setItem("reduced-motion", newReducedMotion)
  }

  return (
    <Tabs
      variant="fullWidth"
      textColor="inherit"
      value={reducedMotion === "always" ? 0 : reducedMotion === "user" ? 1 : 2}
      onChange={handleTabChange}
      sx={(theme) => ({
        background: "var(--mui-palette-background-default)",
        borderRadius: 1,
        padding: 0.5,
        [`& .${tabsClasses.indicator}`]: {
          background: "var(--mui-palette-background-paper)",
          backgroundImage: "var(--mui-overlays-2)",
          borderRadius: 0.75,
          height: "100%",
        },
        [`& .${tabsClasses.flexContainer}`]: {
          gap: 0.5,
        },
        [`& .${tabsClasses.flexContainer} > button`]: {
          borderRadius: 0.75,
          minHeight: 20,
          textTransform: "none !important",
          transition: theme.transitions.create("background"),
          willChange: "background",
          zIndex: 2,
        },
        [`& .${tabsClasses.flexContainer} > button:hover`]: {
          background:
            theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.75)",
        },
      })}
    >
      <Tab
        label="Fewer"
        icon={<RadioButtonUncheckedRounded />}
        iconPosition="start"
        disableRipple
      />
      <Tab label="System" icon={<DisplaySettingsRounded />} iconPosition="start" disableRipple />
      <Tab label="More " icon={<AnimationRounded />} iconPosition="start" disableRipple />
    </Tabs>
  )
}
