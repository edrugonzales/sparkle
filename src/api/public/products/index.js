import {get} from "../../requests"



export const getProductsByShopId = async (shopId) => {
    return await get(`product/list/shop/${shopId}`)
}