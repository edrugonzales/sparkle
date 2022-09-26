import SecureLS from "secure-ls"
import { API } from "../../../api-config"

export const getVortexTokenBase = async () => {

  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")


  return await fetch(`${API}/vortex/token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then((response) => {
        return response
      })
      .catch((err) => {
        
        return err
      })
}
