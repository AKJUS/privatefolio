import { mapToChartData, queryPrices } from "src/api/core/prices/coinbase-price-api"
import { ResolutionString } from "src/interfaces"
import { expect, it } from "vitest"

it("should fetch BTC prices within a range", async () => {
  // act
  const result = await queryPrices({
    limit: 3,
    pair: "BTC-USD",
    since: 1502928000000,
    timeInterval: "1d" as ResolutionString,
    until: 1503100800000,
  })
  // assert
  expect(result.map(mapToChartData)).toMatchInlineSnapshot(`
    [
      {
        "close": 4157.41,
        "high": 4186.1,
        "low": 4000,
        "open": 4101.72,
        "time": 1503100800,
        "value": 4157.41,
        "volume": 10502.74082464,
      },
      {
        "close": 4101.72,
        "high": 4350,
        "low": 3960.47,
        "open": 4280.01,
        "time": 1503014400,
        "value": 4101.72,
        "volume": 20823.05141554,
      },
      {
        "close": 4280.01,
        "high": 4469,
        "low": 4180,
        "open": 4370.01,
        "time": 1502928000,
        "value": 4280.01,
        "volume": 19980.89160504,
      },
    ]
  `)
})

it("should throw an error", async () => {
  // act
  const promise = queryPrices({
    pair: "EFJAUSDT",
    since: 0,
    timeInterval: "1d" as ResolutionString,
    // until: 0,
  })
  // assert
  await expect(promise).rejects.toMatchInlineSnapshot(`[Error: Coinbase: NotFound]`)
})
