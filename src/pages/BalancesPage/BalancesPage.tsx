import { InfoOutlined, VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material"
import { IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { useStore } from "@nanostores/react"
import { proxy } from "comlink"
import { debounce } from "lodash-es"
import React, { useEffect, useMemo, useState } from "react"
import { AttentionBlock } from "src/components/AttentionBlock"
import { DEFAULT_DEBOUNCE_DURATION } from "src/settings"
import { $hideSmallBalances, $hideSmallBalancesMap } from "src/stores/account-settings-store"
import { $activeAccount } from "src/stores/account-store"
import { $inspectTime } from "src/stores/pages/balances-store"
import { formatDate } from "src/utils/formatting-utils"

import { MemoryTable } from "../../components/EnhancedTable/MemoryTable"
import { Subheading } from "../../components/Subheading"
import { Balance } from "../../interfaces"
import { HeadCell } from "../../utils/table-utils"
import { clancy } from "../../workers/remotes"
import { BalancesChart } from "./BalancesChart"
import { BalanceTableRow } from "./BalanceTableRow"

/**
 * TODO rename to NetworthPage
 */
export default function BalancesPage() {
  const [queryTime, setQueryTime] = useState<number | null>(null)
  const [rows, setRows] = useState<Balance[]>([])
  const [hiddenBalances, setHiddenBalances] = useState<number>(0)

  const hideSmallBalances = useStore($hideSmallBalances)
  const inspectTime = useStore($inspectTime)
  const activeAccount = useStore($activeAccount)

  useEffect(() => {
    function fetchData() {
      const start = Date.now()
      clancy.getBalancesAt(inspectTime, activeAccount).then((allBalances) => {
        // fetch no longer accurate
        if (activeAccount !== $activeAccount.get()) return

        const visibleBalances = hideSmallBalances
          ? allBalances.filter((x) => x.value && (x.value > 0.1 || x.value < -0.1))
          : allBalances

        setQueryTime(Date.now() - start)
        setRows(visibleBalances)
        setHiddenBalances(allBalances.length - visibleBalances.length)
      })
    }

    fetchData()

    const unsubscribePromise = clancy.subscribeToDailyPrices(
      proxy(
        debounce(() => {
          fetchData()
        }, DEFAULT_DEBOUNCE_DURATION)
      ),
      activeAccount
    )

    return () => {
      unsubscribePromise.then((unsubscribe) => {
        unsubscribe()
      })
    }
  }, [inspectTime, activeAccount, hideSmallBalances])

  const headCells = useMemo<HeadCell<Balance>[]>(
    () => [
      {
        filterable: true,
        key: "assetId",
        label: "Asset",
        sortable: true,
        sx: { width: "66%" },
      },
      {
        key: "balanceN",
        label: "Balance",
        numeric: true,
        sortable: true,
        sx: { maxWidth: 220, minWidth: 220, width: 220 },
      },
      {
        key: "price",
        label: "Price",
        numeric: true,
        sortable: true,
        sx: { maxWidth: 220, minWidth: 220, width: 220 },
        valueSelector: (row: Balance) => row.price?.value,
      },
      {
        key: "value",
        label: "Value",
        numeric: true,
        sortable: true,
        sx: { maxWidth: 220, minWidth: 220, width: 220 },
      },
    ],
    []
  )

  return (
    <Stack gap={4}>
      <BalancesChart />
      {rows.length + hiddenBalances > 0 && (
        <div>
          <Subheading>
            <span>
              Balances{" "}
              {inspectTime !== undefined && (
                <Typography variant="caption" color="text.secondary">
                  at {formatDate(inspectTime)}
                </Typography>
              )}
            </span>
            <Tooltip title={hideSmallBalances ? "Show small balances" : "Hide small balances"}>
              <IconButton
                color="secondary"
                onClick={() => {
                  $hideSmallBalancesMap.setKey($activeAccount.get(), String(!hideSmallBalances))
                }}
              >
                {hideSmallBalances ? (
                  <VisibilityOffRounded fontSize="small" />
                ) : (
                  <VisibilityRounded fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Subheading>
          <MemoryTable<Balance>
            initOrderBy="value"
            headCells={headCells}
            TableRowComponent={BalanceTableRow}
            rows={rows}
            rowCount={rows.length + hiddenBalances}
            defaultRowsPerPage={10}
            queryTime={queryTime}
            extraRow={
              !!hiddenBalances && (
                <AttentionBlock>
                  <InfoOutlined sx={{ height: 20, width: 20 }} />
                  <span>{hiddenBalances} small balances hidden...</span>
                </AttentionBlock>
              )
            }
          />
        </div>
      )}
    </Stack>
  )
}
