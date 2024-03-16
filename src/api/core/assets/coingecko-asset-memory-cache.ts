import { AssetMetadata } from "src/interfaces"
import { ASSET_FILES_LOCATION, PLATFORMS_META } from "src/settings"

export const memoryCacheMap: Record<string, AssetMetadata> = {
  [PLATFORMS_META.ethereum.nativeAssetId as string]: {
    coingeckoId: "ethereum",
    logoUrl: `https://assets.coingecko.com/coins/images/279/large/ethereum.png`,
    name: "Ethereum",
    symbol: "ETH",
  },
  "binance:BUSD": {
    coingeckoId: "busd",
    logoUrl: `/${ASSET_FILES_LOCATION}/overrides/BUSD.svg`,
    name: "Binance USD",
    symbol: "BUSD",
  },
  "binance:EUR": {
    logoUrl: `/${ASSET_FILES_LOCATION}/overrides/EUR.png`,
    name: "Euro",
    symbol: "EUR",
  },
  "ethereum:0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2:WETH": {
    coingeckoId: "weth",
    logoUrl: `https://assets.coingecko.com/coins/images/2518/standard/weth.png`,
    name: "Wrapped ETH",
    symbol: "WETH",
  },
}
