import fs from "fs"
import { join } from "path"
import { findAuditLogs } from "src/api/account/audit-logs-api"
import { computeBalances, getHistoricalBalances } from "src/api/account/balances-api"
import { addFileImport } from "src/api/account/file-imports/file-imports-api"
import { findTransactions } from "src/api/account/transactions-api"
import { getAccount, resetAccount } from "src/api/database"
import { ProgressUpdate } from "src/stores/task-store"
import { beforeAll, expect, it } from "vitest"

const accountName = "azure"

beforeAll(async () => {
  //
  await resetAccount(accountName)
})

it("should add a file import", async () => {
  // arrange
  const fileName = "etherscan.csv"
  const filePath = join("test/files", fileName)
  const buffer = await fs.promises.readFile(filePath, "utf8")
  const file = new File([buffer], fileName, { lastModified: 0, type: "text/csv" })
  // act
  const fileImport = await addFileImport(file, undefined, accountName)
  const { docs: auditLogs } = await getAccount(accountName).auditLogsDB.find({
    selector: {
      fileImportId: fileImport._id,
    },
  })
  auditLogs.sort((a, b) => b.timestamp - a.timestamp)
  // assert
  expect(fileImport).toMatchInlineSnapshot(`
    {
      "_id": "32174469",
      "metadata": {
        "integration": "ethereum",
        "logs": 16,
        "operations": [
          "Deposit",
          "Withdraw",
          "Fee",
        ],
        "rows": 9,
        "symbols": [
          "ETH",
        ],
        "transactions": 9,
        "wallets": [
          "Spot",
        ],
      },
    }
  `)
  expect(auditLogs.length).toMatchInlineSnapshot(`16`)
  expect(auditLogs).toMatchSnapshot()
})

it("should add an erc20 file import", async () => {
  // arrange
  const fileName = "etherscan-erc20.csv"
  const filePath = join("test/files", fileName)
  const buffer = await fs.promises.readFile(filePath, "utf8")
  const file = new File([buffer], fileName, { lastModified: 0, type: "text/csv" })
  // act
  const fileImport = await addFileImport(file, undefined, accountName, {
    userAddress: "0xf98c96b5d10faafc2324847c82305bd5fd7e5ad3",
  })
  const { docs: auditLogs } = await getAccount(accountName).auditLogsDB.find({
    selector: {
      fileImportId: fileImport._id,
    },
  })
  auditLogs.sort((a, b) => b.timestamp - a.timestamp)
  // assert
  expect(fileImport).toMatchInlineSnapshot(`
    {
      "_id": "3090763006",
      "metadata": {
        "integration": "ethereum",
        "logs": 8,
        "operations": [
          "Deposit",
        ],
        "rows": 8,
        "symbols": [
          "XNN",
          "XDATA",
          "VIU",
          "INSP",
          "CAN",
          "LOOM",
          "HEALP",
          "LPT",
        ],
        "transactions": 0,
        "wallets": [
          "Spot",
        ],
      },
    }
  `)
  expect(auditLogs.length).toMatchInlineSnapshot(`8`)
  expect(auditLogs).toMatchSnapshot()
})

it.sequential("should compute balances", async () => {
  // arrange
  const until = Date.UTC(2021, 0, 0, 0, 0, 0, 0) // 1 Jan 2021
  // act
  const updates: ProgressUpdate[] = []
  await computeBalances(accountName, { until }, (state) => updates.push(state))
  const balances = await getHistoricalBalances(accountName)
  const auditLogs = await findAuditLogs({}, accountName)
  const transactions = await findTransactions({}, accountName)
  // assert
  expect(updates.join("\n")).toMatchInlineSnapshot(`
    "0,Computing balances for 24 audit logs
    0,Processing logs 1 to 24
    90,Processed 1153 daily balances
    95,Setting networth cursor to Dec 31, 1969
    96,Filling balances to reach today
    100,Saved 1210 records to disk"
  `)
  expect(balances.length).toMatchInlineSnapshot(`1210`)
  expect(balances).toMatchSnapshot()
  expect(auditLogs.length).toMatchInlineSnapshot(`24`)
  expect(auditLogs).toMatchSnapshot()
  expect(transactions.length).toMatchInlineSnapshot(`9`)
  expect(transactions).toMatchSnapshot()
})
