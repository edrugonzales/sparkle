import { API } from "../../api-config"

export const getPlatformVariables = async () => {
    let response =  await fetch(`${API}/auth/platform-variables`,{
    method: "GET",

    headers: {
      Accept: "application/json",
    },
  })

let jsonData = await response.json()

// 

return jsonData;
}
