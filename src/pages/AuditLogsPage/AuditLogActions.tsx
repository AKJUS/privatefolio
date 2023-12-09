import {
  CalculateOutlined,
  CurrencyExchange,
  MemoryRounded,
  MoreHoriz,
  Storage,
} from "@mui/icons-material"
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import React from "react"

import { indexAuditLogs } from "../../api/audit-logs-api"
import { computeBalances } from "../../api/balances-api"
import { fetchAssetPrices } from "../../api/daily-prices-api"
import { resetDatabase } from "../../api/database"
import { enqueueTask, TaskPriority } from "../../stores/task-store"

export function AuditLogActions() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton color="secondary" onClick={handleClick} sx={{ marginRight: -2, marginY: -2 }}>
        <MoreHoriz fontSize="small" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem
          dense
          onClick={() => {
            enqueueTask({
              function: async () => {
                await indexAuditLogs()
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
        <MenuItem
          dense
          onClick={() => {
            enqueueTask({
              function: async () => {
                await computeBalances()
              },
              name: "Recompute balances",
              priority: TaskPriority.Low,
            })
            handleClose()
          }}
        >
          <ListItemIcon>
            <CalculateOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Recompute balances</ListItemText>
        </MenuItem>
        <MenuItem
          dense
          onClick={() => {
            enqueueTask({
              function: async () => {
                await fetchAssetPrices()
              },
              name: "Fetch asset prices",
              priority: TaskPriority.Low,
            })
            handleClose()
          }}
        >
          <ListItemIcon>
            <CurrencyExchange fontSize="small" />
          </ListItemIcon>
          <ListItemText>Fetch asset prices</ListItemText>
        </MenuItem>
        <MenuItem
          dense
          onClick={() => {
            enqueueTask({
              function: async () => {
                await resetDatabase()
              },
              name: "Reset database",
              priority: TaskPriority.High,
            })
            handleClose()
          }}
        >
          <ListItemIcon>
            <Storage fontSize="small" />
          </ListItemIcon>
          <ListItemText>Reset database</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
