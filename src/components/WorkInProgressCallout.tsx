import { AlertTitle, Link } from "@mui/material"
import React from "react"

import { Callout } from "./Callout"

export function WorkInProgressCallout() {
  return (
    <Callout
    // icon={
    //   <Chip
    //     size="small"
    //     color="primary"
    //     sx={{ fontSize: "0.65rem", height: 20, paddingX: 0.5 }}
    //     label="WIP"
    //   />
    // }
    >
      <AlertTitle sx={{ fontSize: "0.85rem" }}>This feature is still being developed.</AlertTitle>
      If you have any ideas on how we can improve it, please{" "}
      <Link target="_blank" href="https://github.com/kernelwhisperer/privatefolio/issues/new">
        let us know
      </Link>
      !
    </Callout>
  )
}
