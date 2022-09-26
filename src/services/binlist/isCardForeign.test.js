import { isCardForeign } from "./isCardForeign"
import { rest } from "msw"
import { setupServer } from "msw/node"

const server = setupServer(
  rest.get(`https://lookup.binlist.net/521069`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        number: {},
        scheme: "mastercard",
        type: "debit",
        brand: "Debit",
        country: {
          numeric: "608",
          alpha2: "PH",
          name: "Philippines",
          emoji: "🇵🇭",
          currency: "PHP",
          latitude: 13,
          longitude: 122,
        },
        bank: {},
      })
    )
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

it("Checking if card is foreign equals to false", async () => {
  const isForeign = await isCardForeign({ cardNumber: 521069 })

  expect(isForeign).toBe(false)
})

it("Checking if card is foreign equals to true", async () => {
  server.use(
    rest.get(`https://lookup.binlist.net/521069`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          number: {},
          scheme: "mastercard",
          type: "debit",
          brand: "Debit",
          country: {
            numeric: "608",
            alpha2: "US",
            name: "Philippines",
            emoji: "🇵🇭",
            currency: "PHP",
            latitude: 13,
            longitude: 122,
          },
          bank: {},
        })
      )
    })
  )

  const isForeign = await isCardForeign({ cardNumber: 521069 })

  expect(isForeign).toBe(true)
})

it("Handles request failure", async () => {
  server.use(
    rest.get(`https://lookup.binlist.net/521069`, (req, res, ctx) => {
      return res(ctx.status(400))
    })
  )

  await expect(isCardForeign({ cardNumber: 521069 })).rejects.toThrow(
    "Request failed with status code 400"
  )
})
