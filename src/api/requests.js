import { API } from "./api-config"
import SecureLS from "secure-ls"

export const formData = (_data) => {
  let new_formData = new FormData()
  for (var key in _data) {
    new_formData.append(key, _data[key])
  }
  return new_formData
}

const post = async (_data, _url) => {
  const ls = new SecureLS({ encodingType: "aes" })
  const token = ls.get("token")

  return await fetch(`${API}/${_url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(_data),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      return err
    })
}

const get = async (_url) => {
  return await fetch(`${API}/${_url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {})
}

const patch = async (_data, _url) => {
  return await fetch(`${API}/${_url}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(_data),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {})
}

const remove = async (_data, _url) => {
  return await fetch(`${API}/${_url}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {})
}

const getUser = async (_url, token) => {
  return await fetch(`${API}${_url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {})
}

const getListPurchaseHistory = (_url, token) => {
  return fetch(`${API}${_url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {})
}

const update = (userId, token, user) => {
  return fetch(`${API}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {})
}

const updatePhoto = async (userId, token, image) => {

  const formdata = new FormData();

  formdata.append("file", image);

  return await fetch(`${API}/user/photo/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      
    })
}

export {
  post,
  get,
  patch,
  remove,
  getUser,
  getListPurchaseHistory,
  update,
  updatePhoto,
}
