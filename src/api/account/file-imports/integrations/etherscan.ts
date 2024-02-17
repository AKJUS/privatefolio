import {
  AuditLogOperation,
  EtherscanAuditLog,
  EtherscanTransaction,
  ParserResult,
  TransactionType,
} from "src/interfaces"
import { Platform } from "src/settings"
import { asUTC } from "src/utils/formatting-utils"

export const Identifier = "etherscan"
export const platform: Platform = "ethereum"

export const HEADER =
  '"Txhash","Blockno","UnixTimestamp","DateTime (UTC)","From","To","ContractAddress","Value_IN(ETH)","Value_OUT(ETH)","CurrentValue","TxnFee(ETH)","TxnFee(USD)","Historical $Price/Eth","Status","ErrCode","Method"'

export function parser(csvRow: string, index: number, fileImportId: string): ParserResult {
  const columns = csvRow
    .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    .map((column) => column.replaceAll('"', ""))
  //
  const txHash = columns[0]
  // const blockNumber = columns[1]
  // const unixTimestamp = columns[2]
  const datetimeUtc = columns[3]
  const from = columns[4]
  const to = columns[5]
  const contractAddress = columns[6]
  const incoming = columns[7].replaceAll(",", "") // valueIn
  const outgoing = columns[8].replaceAll(",", "") // valueOut
  // const ethCurrentValue = columns[9]
  const txnFee = columns[10].replaceAll(",", "")
  // const txnFeeUsd = columns[11]
  // const ethHistoricalPrice = columns[12]
  const status = columns[13]
  // const errorCode = columns[14]
  const method = columns[15].trim()

  // TODO statuses like Error(1) means only some internal txns failed
  const hasError = status === "Error(0)" || undefined
  //
  const timestamp = asUTC(new Date(datetimeUtc))
  if (isNaN(timestamp)) {
    throw new Error(`Invalid timestamp: ${datetimeUtc}`)
  }
  // const hash = hashString(`${index}_${csvRow}`)
  const txId = `${fileImportId}_${txHash}`
  const assetId = "ethereum:0x0000000000000000000000000000000000000000:ETH"
  const wallet = incoming === "0" ? from : to
  //
  const logs: EtherscanAuditLog[] = []
  let type: TransactionType
  const operation: AuditLogOperation =
    outgoing === "0" && incoming !== "0"
      ? "Deposit"
      : incoming === "0" && outgoing === "0"
      ? "Smart Contract Interaction"
      : "Withdraw"

  if (operation === "Smart Contract Interaction") {
    type = "Unknown"
  } else {
    type = operation
    if (!hasError) {
      const change = operation === "Deposit" ? incoming : `-${outgoing}`
      const changeN = parseFloat(change)

      logs.push({
        _id: `${txId}_VALUE_0`,
        assetId,
        change,
        changeN,
        importId: fileImportId,
        importIndex: index,
        operation,
        platform,
        timestamp,
        txId,
        wallet,
      })
    }
  }

  let fee: string | undefined, feeAsset: string | undefined, feeN: number | undefined

  if (txnFee !== "0" && incoming === "0") {
    fee = `-${txnFee}`
    feeN = parseFloat(fee)
    feeAsset = assetId

    logs.push({
      _id: `${txId}_FEE_0`,
      assetId,
      change: fee,
      changeN: feeN,
      importId: fileImportId,
      importIndex: index + 0.1,
      operation: "Fee",
      platform,
      timestamp,
      txId,
      wallet,
    })
  }

  const tx: EtherscanTransaction = {
    _id: txId,
    contractAddress: contractAddress || undefined,
    fee,
    feeAsset,
    feeN,
    importId: fileImportId,
    importIndex: index,
    incoming: hasError || incoming === "0" ? undefined : incoming,
    incomingAsset: hasError || incoming === "0" ? undefined : assetId,
    incomingN: hasError || incoming === "0" ? undefined : parseFloat(incoming),
    method,
    outgoing: hasError || outgoing === "0" ? undefined : outgoing,
    outgoingAsset: hasError || outgoing === "0" ? undefined : assetId,
    outgoingN: hasError || outgoing === "0" ? undefined : parseFloat(outgoing),
    platform,
    status: status || undefined,
    // price,
    // priceN,
    // role,
    timestamp,
    txHash,
    type,
    wallet,
  }

  return { logs, txns: [tx] }
}
