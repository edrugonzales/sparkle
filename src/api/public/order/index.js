import SecureLS from "secure-ls"
import { API } from "../../api-config"
import { getUser } from "../../../services/auth"



export const createOrder = async (userId, order) => {

    const ls = new SecureLS({ encodingType: "aes" })
    const token = ls.get("token")
  
    return await fetch(`${API}/order/create/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        return response
      })
      .catch((err) => {
        
        return err
      })
}


export const getAllOrders = async () => {

  let user = await getUser()

  return await fetch(`${API}/user/list/purchase-history/${user.userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => {
      return response
    })
    .catch((err) => {
      
    })
}

export const getOrderByOrderId = async (orderId) => {

  return await fetch(`${API}/order/${orderId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response
    })
    .catch((err) => {
      
    })
}


