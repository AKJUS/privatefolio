// /* eslint-disable sort-keys-fix/sort-keys-fix */
import { proxy } from "comlink"

import { Transaction } from "../interfaces"
import { ProgressCallback } from "../stores/task-store"
import { noop } from "../utils/utils"
import { transactionsDB } from "./database"

const _filterOrder = ["integration", "wallet", "type", "outgoingSymbol", "incomingSymbol"]
const _filterOrderBySpecificity = [
  "outgoingSymbol",
  "incomingSymbol",
  "type",
  "wallet",
  "integration",
]

export async function indexTransactions(progress: ProgressCallback = noop) {
  progress([60, "Transactions: cleaning up stale indexes"])
  await transactionsDB.viewCleanup()
  progress([70, "Transactions: creating index on 'timestamp'"])
  await transactionsDB.createIndex({
    index: {
      fields: ["timestamp"],
      name: "timestamp",
    },
  })
  progress([75, "Transactions: creating index on 'integration'"])
  await transactionsDB.createIndex({
    index: {
      fields: ["integration", "timestamp", "wallet", "type", "outgoingSymbol", "incomingSymbol"], // MUST respect the order in _filterOrder
      name: "integration",
    },
  })
  progress([80, "Transactions: creating index on 'wallet'"])
  await transactionsDB.createIndex({
    index: {
      fields: ["wallet", "timestamp", "integration", "type", "outgoingSymbol", "incomingSymbol"], // MUST respect the order in _filterOrder
      name: "wallet",
    },
  })
  progress([85, "Transactions: creating index on 'type'"])
  await transactionsDB.createIndex({
    index: {
      fields: ["type", "timestamp", "integration", "wallet", "outgoingSymbol", "incomingSymbol"], // MUST respect the order in _filterOrder
      name: "type",
    },
  })
  progress([90, "Transactions: creating index on 'outgoingSymbol'"])
  await transactionsDB.createIndex({
    index: {
      fields: ["outgoingSymbol", "timestamp", "integration", "wallet", "type", "incomingSymbol"], // MUST respect the order in _filterOrder
      name: "outgoingSymbol",
    },
  })
  progress([95, "Transactions: creating index on 'incomingSymbol'"])
  await transactionsDB.createIndex({
    index: {
      fields: ["incomingSymbol", "timestamp", "integration", "wallet", "type", "outgoingSymbol"], // MUST respect the order in _filterOrder
      name: "incomingSymbol",
    },
  })
}

type FindTransactionsRequest = {
  fields?: string[]
  filters?: Partial<Record<keyof Transaction, string | number>>
  limit?: number
  /**
   * orderBy = timestamp, always
   *
   * @default "desc"
   */
  order?: "asc" | "desc"
  selectorOverrides?: PouchDB.Find.Selector
  skip?: number
}

export async function findTransactions(request: FindTransactionsRequest = {}) {
  await indexTransactions()

  const { filters = {}, limit, skip, order = "desc", fields, selectorOverrides = {} } = request

  // Algorithm to help PouchDB find the best index to use
  const preferredFilter = _filterOrderBySpecificity.find((x) => filters[x])

  const selector: PouchDB.Find.Selector = !preferredFilter
    ? { timestamp: { $exists: true } }
    : {
        [preferredFilter]: filters[preferredFilter],
        timestamp: { $exists: true },
      }

  if (preferredFilter) {
    _filterOrder.forEach((filter) => {
      if (filter === preferredFilter) return
      selector[filter] = filters[filter] ? filters[filter] : { $exists: true }
    })
  }

  const sort: PouchDB.Find.FindRequest<Transaction>["sort"] = !preferredFilter
    ? [{ timestamp: order }]
    : [{ [preferredFilter]: order }, { timestamp: order }]

  const _req: PouchDB.Find.FindRequest<Transaction> = {
    fields,
    limit,
    selector: {
      ...selector,
      ...selectorOverrides,
    },
    skip,
    sort,
  }
  // console.log("📜 LOG > findTransactions > _req:", _req)
  // const explain = await (transactionsDB as any).explain(_req)
  // console.log("📜 LOG > findTransactions > explain:", explain.index)

  //
  const { docs, warning } = await transactionsDB.find(_req)
  if (warning) console.warn("findTransactions", warning)
  return docs as Transaction[]
}

export async function countTransactions() {
  const indexes = await transactionsDB.allDocs({
    // Prefix search
    // https://pouchdb.com/api.html#batch_fetch
    endkey: `_design\ufff0`,

    include_docs: false,
    startkey: "_design",
  })
  const result = await transactionsDB.allDocs({ include_docs: false, limit: 1 })
  return result.total_rows - indexes.rows.length
}

export function subscribeToTransactions(callback: () => void) {
  const changesSub = transactionsDB
    .changes({
      live: true,
      since: "now",
    })
    .on("change", callback)

  return proxy(() => {
    try {
      changesSub.cancel()
    } catch {}
  })
}
