import {get} from "../../requests"
import {API} from "../../api-config"

export const getShop = async (id) => {
  return await get(`shop/${id}`)
}

export const getDistanceAndDeliveryFee = async (from_lat, from_lng, to_lat, to_lng) => {

  let response = await fetch(`${API}/shop-distance?from_lat=${from_lat}&from_lng=${from_lng}&to_lat=${to_lat}&to_lng=${to_lng}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
  return response.json()
}


export const getAutomaticVouchers = async () => {
  let response = await fetch(`${API}/voucher/sparkle-automatic-vouchers`, {
    method: "GET", 
    headers: {
      Accept: 'application/json'
    }
  })

  return response.json()
}


export const getAllShops = async (limit, long, lat) => {
    return await get(`shop/list/allv2?limit=100&long=${long}&lat=${lat}`)
}


export const getAllShopsV2 = async (userId, long, lat) => {
  let response;
    try {
      
      if(userId){
       response =  await fetch(`${API}/shop/list/all/${userId}?long=${long}&lat=${lat}&limit=1000`,{
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })}

    else  {
      
      response = await fetch(`${API}/shop/list/all/${process.env.REACT_APP_TEMP_USERID}?long=${long}&lat=${lat}&limit=1000`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })}
  
    //let jsonData = await response.json()
    
      return response.json();
  
    } catch (error) {
      
      
    }
}