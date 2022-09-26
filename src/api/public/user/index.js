import { getUser, getListPurchaseHistory, update, updatePhoto } from "../../requests"

export const getUserById = async (userId, token) => {
    return await getUser(userId, token)
}

export const getPurchaseHistory = async (userId, token) => {
    return await getListPurchaseHistory(userId, token)
}

export const updateUser = async (userId, token, user) => {
    return await update(userId, token, user)
}

export const updatePicture = async (userId, token, image) => {
    return await updatePhoto(userId, token, image)
}
