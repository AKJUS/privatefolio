import { Typography } from "@mui/material"
import React, { useEffect, useMemo, useState } from "react"

import { MemoryTable } from "../../components/EnhancedTable/MemoryTable"
import { StaggeredList } from "../../components/StaggeredList"
import { Balance } from "../../interfaces"
import { SerifFont } from "../../theme"
import { HeadCell } from "../../utils/table-utils"
import { clancy } from "../../workers/remotes"
import { BalancesChart } from "./BalancesChart"
import { BalanceTableRow } from "./BalanceTableRow"

export function BalancesPage({ show }: { show: boolean }) {
  const [queryTime, setQueryTime] = useState<number | null>(null)
  const [balances, setBalances] = useState<Balance[]>([])

  useEffect(() => {
    const start = Date.now()
    clancy.getLatestBalances().then((balances) => {
      setQueryTime(Date.now() - start)
      setBalances(balances)
    })
  }, [])

  const headCells = useMemo<HeadCell<Balance>[]>(
    () => [
      {
        filterable: true,
        key: "symbol",
        label: "Asset",
        sortable: true,
      },
      {
        key: "price",
        label: "Price",
        numeric: true,
        sortable: true,
        valueSelector: (row: Balance) => row.price?.value,
      },
      {
        key: "balance",
        label: "Balance",
        numeric: true,
        sortable: true,
      },
      {
        key: "value",
        label: "Value",
        numeric: true,
        sortable: true,
      },
    ],
    []
  )

  return (
    <StaggeredList gap={1} show={show}>
      <Typography variant="h6" fontFamily={SerifFont} sx={{ marginX: 2 }}>
        <span>Net worth</span>
      </Typography>
      <BalancesChart />
      <Typography variant="h6" fontFamily={SerifFont} sx={{ marginX: 2 }}>
        <span>Balances</span>
      </Typography>
      <MemoryTable<Balance>
        initOrderBy="value"
        headCells={headCells}
        TableRowComponent={BalanceTableRow}
        rows={balances}
        defaultRowsPerPage={10}
        queryTime={queryTime}
      />
    </StaggeredList>
  )
}
