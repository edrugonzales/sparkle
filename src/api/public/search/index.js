import {get, post} from "../../requests"

export const getAllCategories = async () => {
    return await get('category/list/all')
}

export const getAllProducts = async ( long, lat) => {
    return await get(`product/list/all?limit=100&long=${long}&lat=${lat}`)
}

export const searchProducts = async (query, long, lat) => {
    return await get(`product/list/search?search=${query}&long=${long}&lat=${lat}`)
}

export const getProductsByCategory = async (
  long,
  lat,
  skip,
  limit,
  filters
) => {
  const data = {
    "filters": { "category": filters },
    "limit": limit,
    "skip": skip,
    "long": long,
    "lat": lat,
  }
  // 
  // return await post({long, lat, skip, limit, filters}, `product/list/by-search`)

  return await post(data, `product/list/by-search`)
}


export const getProductsByCategoryAndPrice = async (
  long,
  lat,
  skip,
  limit,
  filters
) => {
  const data = {
    "filters": filters,
    "limit": limit,
    "skip": skip,
    "long": long,
    "lat": lat,
  }
  // 
  // return await post({long, lat, skip, limit, filters}, `product/list/by-search`)

  return await post(data, `product/list/by-search`)
}