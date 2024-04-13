import { ArrowRightAltRounded, CloseRounded } from "@mui/icons-material"
import { Button, Drawer, DrawerProps, IconButton, Stack, Typography } from "@mui/material"
import { useStore } from "@nanostores/react"
import React from "react"
import { Link } from "react-router-dom"
import { ActionBlock } from "src/components/ActionBlock"
import { AmountBlock } from "src/components/AmountBlock"
import { AppLink } from "src/components/AppLink"
import { AssetBlock } from "src/components/AssetBlock"
import { IdentifierBlock } from "src/components/IdentifierBlock"
import { PlatformBlock } from "src/components/PlatformBlock"
import { SectionTitle } from "src/components/SectionTitle"
import { TimestampBlock } from "src/components/TimestampBlock"
import { ValueChip } from "src/components/ValueChip"
import { AuditLog, ChartData } from "src/interfaces"
import { $activeIndex } from "src/stores/account-store"
import { PopoverToggleProps } from "src/stores/app-store"
import { getAssetTicker } from "src/utils/assets-utils"

type AuditLogDrawerProps = DrawerProps &
  PopoverToggleProps & {
    auditLog: AuditLog
    priceMap?: Record<string, ChartData>
    relativeTime: boolean
  }

export function AuditLogDrawer(props: AuditLogDrawerProps) {
  const { open, toggleOpen, auditLog, relativeTime, priceMap, ...rest } = props

  const {
    assetId,
    change,
    balance,
    operation,
    timestamp,
    platform,
    wallet,
    _id,
    txId,
    importId: _importId,
    importIndex: _importIndex,
    // ...extra
  } = auditLog

  const activeIndex = useStore($activeIndex)

  return (
    <Drawer open={open} onClose={toggleOpen} {...rest}>
      <Stack
        // config={SPRING_CONFIGS.ultra}
        paddingX={2}
        paddingY={1}
        gap={2}
        // show={open}
        sx={(theme) => ({
          maxWidth: 358,
          minWidth: 358,
          overflowX: "hidden",
          ...theme.typography.body2,
        })}
      >
        <Stack marginBottom={2} direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" letterSpacing="0.025rem">
            Audit log details
          </Typography>
          <IconButton onClick={toggleOpen} edge="end" color="secondary">
            <CloseRounded fontSize="small" />
          </IconButton>
        </Stack>
        <div>
          <SectionTitle>Identifier</SectionTitle>
          <IdentifierBlock id={_id} />
        </div>
        <div>
          <SectionTitle>Timestamp</SectionTitle>
          <TimestampBlock timestamp={timestamp} relative={relativeTime} />
        </div>
        <div>
          <SectionTitle>Platform</SectionTitle>
          <PlatformBlock platform={platform} />
        </div>
        <div>
          <SectionTitle>Wallet</SectionTitle>
          <IdentifierBlock id={wallet} />
        </div>
        <div>
          <SectionTitle>Operation</SectionTitle>
          <ActionBlock action={operation} />
        </div>
        <div>
          <SectionTitle>Change</SectionTitle>
          <Stack direction="row" alignItems="center" gap={0.25}>
            <AmountBlock
              colorized
              amount={change}
              showSign
              currencyTicker={getAssetTicker(assetId)}
              variant="body1"
            />
            <Button
              size="small"
              component={AppLink}
              to={`../asset/${encodeURI(assetId)}`}
              sx={{ fontSize: "0.9rem", paddingX: 1 }}
            >
              <AssetBlock asset={assetId} size="small" />
            </Button>
            <ValueChip
              value={
                priceMap && change && priceMap[assetId]?.value
                  ? priceMap[assetId].value * Number(change)
                  : undefined
              }
            />
          </Stack>
        </div>
        <div>
          <SectionTitle>New balance</SectionTitle>
          <Stack direction="row" alignItems="center" gap={0.25}>
            <AmountBlock
              amount={balance}
              currencyTicker={getAssetTicker(assetId)}
              variant="body1"
            />
            <Button
              size="small"
              component={AppLink}
              to={`../asset/${encodeURI(assetId)}`}
              sx={{ fontSize: "0.9rem", padding: 1 }}
            >
              <AssetBlock asset={assetId} size="small" />
            </Button>
            <ValueChip
              value={
                priceMap && balance && priceMap[assetId]?.value
                  ? priceMap[assetId].value * Number(balance)
                  : undefined
              }
            />
          </Stack>
        </div>
        {txId && (
          <div>
            <SectionTitle>Transaction ID</SectionTitle>
            <IdentifierBlock id={txId} />
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              component={Link}
              to={`/u/${activeIndex}/transactions?id=${txId}`}
              sx={{ marginTop: 1, paddingX: 2 }}
              // onClick={toggleOpen}
              endIcon={<ArrowRightAltRounded fontSize="inherit" />}
            >
              See transaction
            </Button>
          </div>
        )}
        {/* <pre>{JSON.stringify(extra, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(auditLog, null, 2)}</pre> */}
      </Stack>
    </Drawer>
  )
}
