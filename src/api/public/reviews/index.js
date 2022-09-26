import { API } from "../../api-config"

export const  getReviewsByProductId = async ({productId}) => {
  
    return await fetch(`${API}/review/product/${productId}`, {
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


export const getLikesByProductId  = async ({productId}) => {
    return await fetch(`${API}/review/product-rating/${productId}`, {
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


export const getLikesByShopId = async (shopId) => {
    return await fetch(`${API}/review/shop-rating/${shopId}`, {
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


export const getReviewsByShopId = async ({shopId}) => {
    return await fetch(`${API}/review/shop/${shopId}`, {
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


export const submitRating = async (rating) => {

  return await fetch(`${API}/review/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rating),
  })
    .then((response) => {
      return response
    })
    .catch((err) => {
      
      return err
    })

}






