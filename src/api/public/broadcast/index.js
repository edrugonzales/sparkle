
import { API } from "../../api-config"
import SecureLS from "secure-ls"


export const getAllBroadcasts = async () => {

  const ls = new SecureLS({ encodingType: "aes" })

  let userId = ls.get('userId') 
  let token = ls.get('token')

  let url = userId ? `${API}/broadcasts/all/types/${userId}` : `${API}/broadcasts`

  return await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        return response
      })
      .catch((err) => {
        
        return err
      })
}


export const markAsRead = async (broadcastId) => {

  const ls = new SecureLS({ encodingType: "aes" })

  let userId = ls.get('userId') 
  let token = ls.get('token')



  return await fetch(`${API}/broadcasts/${broadcastId}/${userId}` , {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        return response
      })
      .catch((err) => {
        
        return err
      })
}



export const getNotifications= async () => {

  const ls = new SecureLS({ encodingType: "aes" })

  let userId = ls.get('userId') 
  let token = ls.get('token')

  let url = userId ? `${API}/broadcasts/notifications/${userId}` : `${API}/broadcasts`

  return await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        return response
      })
      .catch((err) => {
        
        return err
      })
}



export const getPromotions = async () => {

  const ls = new SecureLS({ encodingType: "aes" })

  let userId = ls.get('userId') 
  let token = ls.get('token')

  let url = userId ? `${API}/broadcasts/promotions/${userId}` : `${API}/broadcasts`

  return await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        return response
      })
      .catch((err) => {
        
        return err
      })
}



export const getAdvisory = async () => {

  const ls = new SecureLS({ encodingType: "aes" })

  let userId = ls.get('userId') 
  let token = ls.get('token')

  let url = userId ? `${API}/broadcasts/advisory/${userId}` : `${API}/broadcasts`

  return await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        return response
      })
      .catch((err) => {
        
        return err
      })
}


export const createOrderUpdateBroadcast = async ({title, body}) => {

  const ls = new SecureLS({ encodingType: "aes" })

  let userId = ls.get('userId') 
  let token = ls.get('token')

  const formdata = new FormData();

  formdata.append("title", title);
  formdata.append("body", body);
  formdata.append("createdBy", userId);
  formdata.append("type", "OrderUpdate");
  formdata.append("link", "sparkles.com.ph");
  formdata.append("published", true);
  formdata.append("targetUsers", userId);

  return await fetch(
    `${API}/broadcasts/selected/post`, 
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formdata
    })
      .then((response) => {
        return response
      })
      .catch((err) => {
        
        return err
      })
}
