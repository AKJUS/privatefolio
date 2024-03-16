import { PlatformId, Web3Address } from "src/interfaces"

import { memoize } from "./fp-utils"

/**
 * Returns the ticker/symbol of an asset
 */
export const getAssetTicker = memoize(function getAssetTicker(assetId: string) {
  if (assetId === undefined) return "-"

  const parts = assetId.split(":")
  if (parts.length === 2) return parts[1]
  return parts[2]
})

export const getAssetPlatform = memoize(function getAssetPlatform(assetId: string) {
  return assetId.split(":")[0] as PlatformId
})

export const getAssetContract = memoize(function getAssetPlatform(assetId: string) {
  return assetId.split(":")[1] as Web3Address
})
