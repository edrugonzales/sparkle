import { API } from "../../api-config"
import SecureLS from "secure-ls"

const getSecretAuthKey = () => {
  let token = Buffer(`${process.env.REACT_APP_PAYMONGO_SECRET_KEY}`).toString(
    "base64"
  )
  return token
}




export const savePaymongoRefundResource =  async ({referenceNumber, metadata = {"message": null}}) => {

  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")
  const userId = ls.get("userId")


     let reqBody =  {
      "referenceNumber": `${referenceNumber}`,
      "userId": `${userId}`,
      "metadata": JSON.stringify(metadata)
    }


  try {
    let response = await fetch(`${API}/paymongo/refund/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody),
    })

    return response
  } catch (err) {
    throw err
  }
}


export const getAllPaymongoRefundResource = async () => {
  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")
  const userId = ls.get("userId")

  try {
    let response = await fetch(`${API}/paymongo/refund/all/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })

    return response
  } catch (err) {
    throw err
  }

}



export const retrievePaymongoRefundResource = async ({refId}) => {
  try {
    let response = await fetch(`https://api.paymongo.com/refunds/${refId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${getSecretAuthKey()}`,
      },
    })

    return response
  } catch (err) {
    throw err
  }
}