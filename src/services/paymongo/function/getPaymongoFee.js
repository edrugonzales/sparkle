import { isCardForeign } from "../../binlist/isCardForeign"

/**
 * @getPaymongoFee this function will calculate the paymongo service fee base on the payment method that the user selected,
 * for more info about the paymongo pricing visit https://www.paymongo.com/pricing
 * @amount this is the price amount of the product or service that you offer
 * @paymentMethod type of payment method the user is using default is ["card"]
 * @cardNumber if payment method is a card number we will use this to calculate the payment
 */
export const getPaymongoFee = async ({
  amount = 0,
  paymentMethod = "card",
  cardNumber = "521069",
}) => {
  //This function is for calculating card payment service fee
  const cardFee = async ({ amount, cardNumber }) => {
    let foreignFee = (await isCardForeign({ cardNumber: cardNumber }))
      ? amount * 0.01
      : 0

    // let foreignFee = amount * 0.01
    let paymongo0035 = amount * 0.035
    return Math.round(paymongo0035 + 15 + foreignFee)
  }

  switch (paymentMethod) {
    case "card":
      return await cardFee({ amount: amount, cardNumber: cardNumber })

    default:
      return await cardFee({ amount: amount, cardNumber: cardNumber })
  }
}
