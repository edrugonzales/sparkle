import { API } from "../../../api-config"
import SecureLS from "secure-ls"
import { v4 as uuidv4 } from 'uuid';

/**
 * 
 * @param {*} access_token 
 * @param {*} docId - This is the mongodb ID
 * @param {*} clientRequestId 
 * @param {*} billerId 
 * @param {*} billDetails 
 * @param {*} paymentId 
 * @param {*} totalAmount 
 * @param {*} callbackUrl 
 * @returns 
 */
export const createBillsPaymentTransaction = async ({ access_token, docId, clientRequestId, billerId, billDetails, paymentId, convenienceFee, totalAmount, callbackUrl }) => {

  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")
  const userId = ls.get("userId")
  let uniqueId = uuidv4()

  let reqBody = {
    "docId": docId,
    "clientRequestId": `${clientRequestId}${uniqueId}`,
    "billerId": billerId,
    "billDetails": {
      ...billDetails
    },
    "callbackUrl": callbackUrl,
    "userId": userId,
    "paymentId": paymentId,
    "convenienceFee": convenienceFee,
    "totalAmount": totalAmount
  }

  return await fetch(`${API}/vortex/bills-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "access_token": `${access_token}`,
    },
    body: JSON.stringify(reqBody)
  })
    .then((response) => {
      return response
    })
    .catch((err) => {

      return err
    })
}


export const getBillers = async (access_token, pageNumber = 3, pageSize = 10) => {

  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")


  return await fetch(`${API}/vortex/bills-payment/billers?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "access_token": access_token
    },

  })
    .then((response) => {
      return response
    })
    .catch((err) => {

      return err
    })
}

export const getBillerById = async (access_token, billerId) => {


  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")

  return await fetch(`${API}/vortex/bills-payment/billers/${billerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "access_token": access_token
    },

  })
    .then((response) => {
      return response
    })
    .catch((err) => {

      return err
    })
}


export const getBillspaymentTransactionByRefNumber = async (access_token, refNo) => {

  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")

  return await fetch(`${API}/vortex/bills-payment/${refNo}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "access_token": access_token
    },

  })
    .then((response) => {
      return response
    })
    .catch((err) => {

      return err
    })
}


export const getTransactionByClientRequestId = async (access_token, clientRequestId) => {

  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")

  return await fetch(`${API}/vortex/bills-payment/clientRequestId/${clientRequestId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "access_token": access_token
    },

  })
    .then((response) => {
      return response
    })
    .catch((err) => {

      return err
    })
}


export const getTransactionHistory = async (access_token, startDate, endDate, pageNumber, pageSize) => {

  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")

  return await fetch(`${API}/vortex/bills-payment/history?startDate=${startDate}&endDate=${endDate}&pageNumber=${pageNumber}&pageSize=${pageSize}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "access_token": access_token
    },
  })
    .then((response) => {
      return response
    })
    .catch((err) => {

      return err
    })
}


