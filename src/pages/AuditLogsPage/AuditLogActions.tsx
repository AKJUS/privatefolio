import { MemoryRounded, MoreHoriz } from "@mui/icons-material"
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import React, { useState } from "react"
import { $activeAccount } from "src/stores/account-store"

import { enqueueTask, TaskPriority } from "../../stores/task-store"
import { clancy } from "../../workers/remotes"

export function AuditLogActions() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton color="secondary" onClick={handleClick} sx={{ marginRight: -1 }}>
        <MoreHoriz fontSize="small" />
      </IconButton>
      <Menu
        
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}

        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem
          dense
          onClick={() => {
            enqueueTask({
              description: "Recomputing indexes for all audit logs.",
              function: async (progress) => {
                await clancy.indexAuditLogs(progress, $activeAccount.get())
              },
              name: "Recompute audit logs indexes",
              priority: TaskPriority.Low,
            })
            handleClose()
          }}
        >
          <ListItemIcon>
            <MemoryRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText>Recompute indexes</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
