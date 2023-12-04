/* eslint-disable sort-keys-fix/sort-keys-fix */
import { AuditLog } from "../interfaces"
import { ActiveFilterMap } from "../stores/audit-log-store"
import { auditLogsDB } from "./database"

const _filterOrder = ["integration", "wallet", "operation", "symbol"]
const _filterOrderBySpecificity = ["symbol", "operation", "wallet", "integration"]

export async function indexAuditLogs() {
  const { indexes } = await auditLogsDB.getIndexes()
  console.log("📜 LOG > indexAuditLogs > indexes:", indexes)

  for (const { name, ddoc } of indexes) {
    if (!ddoc) continue
    await auditLogsDB.deleteIndex({ ddoc, name })
  }
  console.log("📜 LOG > indexAuditLogs > deleted")

  await auditLogsDB.createIndex({
    index: {
      // MUST respect the order in _orderedFilters
      fields: ["integration", "timestamp", "wallet", "operation", "symbol"],
      name: "integration",
    },
  })
  console.log("📜 LOG > indexAuditLogs > created", 1)
  await auditLogsDB.createIndex({
    index: {
      // MUST respect the order in _orderedFilters
      fields: ["wallet", "timestamp", "integration", "operation", "symbol"],
      name: "wallet",
    },
  })
  console.log("📜 LOG > indexAuditLogs > created", 2)
  await auditLogsDB.createIndex({
    index: {
      // MUST respect the order in _orderedFilters
      fields: ["operation", "timestamp", "integration", "wallet", "symbol"],
      name: "operation",
    },
  })
  console.log("📜 LOG > indexAuditLogs > created", 3)
  await auditLogsDB.createIndex({
    index: {
      // MUST respect the order in _orderedFilters
      fields: ["symbol", "timestamp", "integration", "wallet", "operation"],
      name: "symbol",
    },
  })
  console.log("📜 LOG > indexAuditLogs > created", 4)
  await auditLogsDB.createIndex({
    index: {
      fields: ["timestamp"],
      name: "timestamp",
    },
  })
  console.log("📜 LOG > indexAuditLogs > created", 5)
}

type FindAuditLogsRequest = {
  fields?: string[]
  filters?: ActiveFilterMap
  limit?: number
  /**
   * orderBy = timestamp, always
   *
   * @default "desc"
   */
  order?: "asc" | "desc"
  skip?: number
}

export async function findAuditLogs(request: FindAuditLogsRequest = {}) {
  const { filters = {}, limit, skip, order = "desc", fields } = request

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

  const sort: PouchDB.Find.FindRequest<AuditLog>["sort"] = !preferredFilter
    ? [{ timestamp: order }]
    : [{ [preferredFilter]: order }, { timestamp: order }]

  const _req: PouchDB.Find.FindRequest<AuditLog> = {
    fields,
    limit,
    selector,
    skip,
    sort,
  }
  console.log("📜 LOG > findAuditLogs > _req:", _req)

  const explain = await (auditLogsDB as any).explain(_req)
  console.log("📜 LOG > findAuditLogs > explain:", explain.index)

  //
  const { docs, warning } = await auditLogsDB.find(_req)
  if (warning) console.warn("findAuditLogs", warning)
  return docs as AuditLog[]
}
