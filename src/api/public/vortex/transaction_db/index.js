import { API } from "../../../api-config"
import SecureLS from "secure-ls"


export const saveVortexTopUpTransaction = async ({ referenceNumber, transactionData = { "message": null }, requestInputPayload, paymentId, convenienceFee, totalAmount = 0 }) => {

  try {
    const ls = new SecureLS({ encodingType: "aes" })
    const token = ls.get("token")
    const userId = ls.get("userId")

    let reqBody = {
      "referenceNumber": referenceNumber,
      "userId": `${userId}`,
      "transactionData": JSON.stringify(transactionData),
      "requestInputPayload": JSON.stringify(requestInputPayload),
      "paymentId": paymentId,
      "convenienceFee": convenienceFee,
      "totalAmount": totalAmount
    }

    return await fetch(`${API}/vortex/transaction/topup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody)
    })
      .then((response) => {
        if (response.status !== 200) {
          throw Error("Failed creating a vortex transaction")
        }
        return response.json()
      })
      .catch((err) => {
        throw err
      })
  } catch (error) {
    throw error
  }
}

export const saveVortexBillsPaymentTransaction = async ({ referenceNumber, transactionData = { "message": null }, requestInputPayload, paymentId, convenienceFee, totalAmount }) => {

  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")
  const userId = ls.get("userId")

  let reqBody = {
    "referenceNumber": referenceNumber,
    "userId": `${userId}`,
    "transactionData": JSON.stringify(transactionData),
    "requestInputPayload": JSON.stringify(requestInputPayload),
    "paymentId": paymentId,
    "convenienceFee": convenienceFee,
    "totalAmount": totalAmount
  }

  return await fetch(`${API}/vortex/transaction/billspayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(reqBody)
  })
    .then((response) => {
      if (response.status !== 200) {
        throw Error("Failed creating a vortex transaction")
      }
      return response.json()
    })
    .catch((err) => {

      throw err
    })
}


export const saveVortexGiftTransaction = async ({ referenceNumber, transactionData = { "message": null }, requestInputPayload, paymentId, convenienceFee, totalAmount }) => {

  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")
  const userId = ls.get("userId")

  let reqBody = {
    "referenceNumber": referenceNumber,
    "userId": `${userId}`,
    "transactionData": JSON.stringify(transactionData),
    "requestInputPayload": JSON.stringify(requestInputPayload),
    "paymentId": paymentId,
    "convenienceFee": convenienceFee,
    "totalAmount": totalAmount
  }

  return await fetch(`${API}/vortex/transaction/gift`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(reqBody)
  })
    .then((response) => {
      if (response.status !== 200) {
        throw Error("Failed creating a vortex transaction")
      }
      return response.json()
    })
    .catch((err) => {
      throw err

    })
}


export const getAllVortexTransactions = async () => {

  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")
  const userId = ls.get("userId")


  return await fetch(`${API}/vortex/transaction/all/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response
    })
    .catch((err) => {

      return err
    })
}


export const getVortexTransactionByRefId = async ({ refId }) => {

  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")



  return await fetch(`${API}/vortex/transaction/byref/${refId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        throw Error('Unable to get data')
      }
      return response.json()
    })
    .catch((err) => {

      throw err
    })
}


export const updateVortexByRefId = async ({ refId, data }) => {

  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")

  let reqBody = data

  return await fetch(`${API}/vortex/transaction/update/${refId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(reqBody)
  })
    .then((response) => {
      if (response.status !== 200) {
        throw Error("Failed creating a vortex transaction")
      }
      return response.json()
    })
    .catch((err) => {
      throw err
    })
}


export const getVortexTransactionByDocId = async ({ docId }) => {

  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")


  return await fetch(`${API}/vortex/transaction/bydocid/${docId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response
    })
    .catch((err) => {

      throw err
    })
}








