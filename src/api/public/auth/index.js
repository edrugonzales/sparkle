
import { API } from "../../api-config"

export const signIn = async (email, password) => {

    return await fetch(`${API}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          
          return err
        })
}


export const signUp = async (userData) => {
    return await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          
          return err
        })
}


export const resetPassword = async (email) => {
    return await fetch(`${API}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          
          return err
        })
}