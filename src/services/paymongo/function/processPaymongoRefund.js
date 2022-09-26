import { savePaymongoRefundResource } from "../../../api/public/paymongo"

const getSecretAuthKey = () => {
  let token = Buffer(`${process.env.REACT_APP_PAYMONGO_SECRET_KEY}`).toString(
    "base64"
  )
  return token
}

async function payMongoRefundResourceRequest({
  amount,
  payment_id,
  notes = "",
  reason = "others",
}) {
  let data = {
    data: {
      attributes: {
        amount: amount,
        notes: `${notes}`,
        payment_id: `${payment_id}`,
        reason: `${reason}`,
      },
    },
  }

  try {
    let response = await fetch(`https://api.paymongo.com/refunds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${getSecretAuthKey()}`,
      },
      body: JSON.stringify(data),
    })

    return response
  } catch (err) {
    throw err
  }
}

export default async function processPaymongoRefund({
  amount,
  payment_id,
  notes = "",
  reason = "others",
}) {
  try {
    let refundRequestResponse = await payMongoRefundResourceRequest({
      payment_id: payment_id,
      amount: amount,
      notes: notes,
      reason: reason,
    })

    if (refundRequestResponse.status === 200) {
      let refundRequestResponseData = await refundRequestResponse.json()
      let savePaymongoResponse = await savePaymongoRefundResource({
        referenceNumber: refundRequestResponseData.data.id,
        metadata: refundRequestResponseData,
      })

      let savePaymongoResult = await savePaymongoResponse.json()

      return savePaymongoResult
      // return refundRequestResponseData
    } else {
      throw "Something went wrong on paymongo refund request"
    }
  } catch (err) {
    setTimeout(async () => {
      await processPaymongoRefund({
        amount: amount,
        payment_id: payment_id,
        notes: notes,
        reason: reason,
      })
    }, 10000)
  }
}
