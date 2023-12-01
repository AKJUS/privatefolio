import { useStore } from "@nanostores/react"
import React from "react"
import { Navigate, useParams } from "react-router-dom"

import { AssetAvatar } from "../../components/AssetAvatar"
import { StaggeredList } from "../../components/StaggeredList"
import { $assetMap, $filterMap } from "../../stores/metadata-store"
import { AuditLogsTable } from "../AuditLogsPage/AuditLogTable"

export default function AssetPage({ show }: { show: boolean }) {
  const params = useParams()
  const symbol = params.symbol?.toLocaleUpperCase()
  console.log("📜 LOG > AssetPage > symbol:", symbol)
  const assetMap = useStore($assetMap)

  const filterMap = useStore($filterMap)

  if (!symbol || (filterMap.symbol && !filterMap.symbol.includes(symbol))) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <StaggeredList gap={1} show={show}>
      <AssetAvatar src={assetMap[symbol]?.image} alt={symbol} />

      <AuditLogsTable symbol={symbol} />
      {/* <AssetInfo
           assetSymbol={assetSymbol}
           amountBought={amounts.amountBought.toNumber()}
           amountSold={amounts.amountSold.toNumber()}
           moneyIn={amounts.moneyIn.toNumber()}
           moneyOut={amounts.moneyOut.toNumber()}
           holdings={amounts.holdings.toNumber()}
           costBasis={amounts.costBasis.toNumber()}
           tradeHistory={tradeHistory}
         /> */}
    </StaggeredList>
  )
}

// const [tradeHistory, setTradeHistory] = useState<Transaction[]>([])
// const [amounts, setAmounts] = useState<any>({})

// useEffect(() => {
// readCsv<ParsedTransaction>(filePath, mexcParser).then((tradeHistory) => {
//   const parsedTradeHistory = tradeHistory.filter((x) => x.symbol === assetSymbol)
//   let amountBought = new Decimal(0)
//   let amountSold = new Decimal(0)
//   let moneyIn = new Decimal(0)
//   let moneyOut = new Decimal(0)
//   const frontendTradeHistory: Transaction[] = parsedTradeHistory.map((x) => {
//     if (x.side === "BUY") {
//       amountBought = amountBought.plus(x.amount)
//       moneyIn = moneyIn.plus(x.total)
//     } else {
//       amountSold = amountSold.plus(x.amount)
//       moneyOut = moneyOut.plus(x.total)
//     }
//     return {
//       ...x,
//       amount: x.amount.toNumber(),
//       filledPrice: x.filledPrice.toNumber(),
//       total: x.total.toNumber(),
//     }
//   })
//   const holdings = amountBought.minus(amountSold)
//   console.log("📜 LOG > readCsv<ServerTrade> > holdings:", holdings)
//   const costBasis = moneyIn.div(amountBought)
//   setTradeHistory(frontendTradeHistory)
//   setAmounts({
//     amountBought,
//     amountSold,
//     costBasis,
//     holdings,
//     moneyIn,
//     moneyOut,
//   })
// })
// }, [])
