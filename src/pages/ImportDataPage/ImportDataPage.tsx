import { Stack } from "@mui/material"
import React from "react"
import { useSearchParams } from "react-router-dom"
import { NavTab } from "src/components/NavTab"
import { Tabs } from "src/components/Tabs"

import { StaggeredList } from "../../components/StaggeredList"
import { Subheading } from "../../components/Subheading"
import { ConnectionsTable } from "./connections/ConnectionsTable"
import { DatabaseInfo } from "./DatabaseInfo"
import { FileImportsTable } from "./file-imports/FileImportsTable"
import { ImportDataActions } from "./ImportDataActions"
import { PortfolioInfo } from "./PortfolioInfo"

export function ImportDataPage({ show }: { show: boolean }) {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") || ""

  return (
    <StaggeredList component="main" gap={2} show={show}>
      <div>
        <Subheading>
          <span>Database info</span>
          <ImportDataActions />
        </Subheading>
        <Stack direction={{ sm: "row" }} gap={1}>
          <DatabaseInfo />
          <PortfolioInfo />
        </Stack>
      </div>
      <Stack>
        <Tabs value={tab}>
          <NavTab value="" to={`/import-data`} label="Connections" replace />
          <NavTab
            value="file-imports"
            to={`/import-data?tab=file-imports`}
            label="File imports"
            replace
          />
        </Tabs>
        {tab === "" && <ConnectionsTable />}
        {tab === "file-imports" && <FileImportsTable />}
      </Stack>
    </StaggeredList>
  )
}
