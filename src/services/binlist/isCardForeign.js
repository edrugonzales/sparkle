import axios from "axios"
/**
 * @isCardForeign This will check if card is foreign
 */

export const isCardForeign = async ({ cardNumber }) => {
  try {
    let subnumber = `${cardNumber}`.substring(0, 6)
    const result = await axios.get(`https://lookup.binlist.net/${subnumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = result.data

    return data?.country?.alpha2 === "PH" ? false : true
  } catch (error) {
    throw error
  }
}
