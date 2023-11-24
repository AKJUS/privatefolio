import Container from "@mui/material/Container"
import { a, useTransition } from "@react-spring/web"
import React from "react"
import { Route, Routes, useLocation } from "react-router-dom"

import { Header } from "./components/Header/Header"
import { AuditLogsPage } from "./pages/AuditLogsPage/AuditLogsPage"
import { BalancesPage } from "./pages/BalancesPage/BalancesPage"
import { ImportDataPage } from "./pages/ImportDataPage/ImportDataPage"

// const Offset = styled("div")(({ theme }) => theme.mixins.toolbar)

// const StyledContainer = styled(Container)`
//   // margin-top: ${(props) => props.theme.mixins.toolbar.minHeight}px;
//   background: red;
// `

export default function App() {
  const location = useLocation()
  const { pathname } = location

  const transitions = useTransition(location, {
    config: { friction: 160, mass: 5, tension: 2500 },
    enter: {
      // delay: 133,
      opacity: 2,
    },
    exitBeforeEnter: true,
    from: { opacity: 1 },
    keys: (location) => location.pathname,
    leave: { opacity: 1 },
  })

  return (
    <>
      <Header />
      {/* <Offset /> */}
      <Container maxWidth="lg" sx={{ paddingTop: 3 }}>
        {transitions((styles, item) => (
          <a.div
            style={
              {
                ...styles,
                maxWidth: 1200 - 48, // TODO
                paddingBottom: 24,
                position: "absolute",
                width: "calc(100% - 48px)",
              } as any
            }
          >
            <Routes location={item}>
              {/* <Route path="/" element={<HomePage show={pathname === ""}/>} /> */}
              {/* <Route path="/asset/:assetSymbol" element={<AssetPage show={pathname === ""}/>} /> */}
              {/* <Route path="/transactions" element={<TransactionsPage show={pathname === ""}/>} /> */}
              <Route
                path="/import-data"
                element={<ImportDataPage show={pathname === "/import-data"} />}
              />
              <Route
                path="/audit-logs"
                element={<AuditLogsPage show={pathname === "/audit-logs"} />}
              />
              <Route path="/balances" element={<BalancesPage show={pathname === "/balances"} />} />
              <Route path="*" element={<BalancesPage show={pathname === "/"} />} />
            </Routes>
          </a.div>
        ))}
      </Container>
    </>
  )
}
