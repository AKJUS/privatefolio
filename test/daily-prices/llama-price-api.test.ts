import { getPair, mapToChartData, queryPrices } from "src/api/core/prices/llama-price-api"
import { ResolutionString } from "src/interfaces"
import { expect, it } from "vitest"

it("should fetch WETH prices within a range", async () => {
  // act
  const result = await queryPrices({
    limit: 3,
    pair: getPair("ethereum:0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"), // WETH
    since: 1518566400000,
    timeInterval: "1d" as ResolutionString,
    until: 1518739200000,
  })
  // assert
  expect(result.map(mapToChartData)).toMatchInlineSnapshot(`
    [
      {
        "time": 1518566400,
        "value": 839.535,
      },
      {
        "time": 1518652800,
        "value": 947.358,
      },
      {
        "time": 1518739200,
        "value": 886.961,
      },
    ]
  `)
})

it("should return 0 for non-supported", async () => {
  // act
  const results = await queryPrices({
    pair: "EFJAUSDT",
    timeInterval: "1d" as ResolutionString,
  })
  // assert
  expect(results.length).toBe(0)
})
