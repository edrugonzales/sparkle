import SecureLS from "secure-ls"

export default function useLoggedUser() {
  const setUser = ({ userData }) => {
    const ls = new SecureLS({ encodingType: "aes" })
    ls.set("token", userData?.token)
    ls.set("userId", userData?.user?._id)
    ls.set("email", userData?.user?.email)
    ls.set("name", userData?.user?.name)
    ls.set("phone", userData?.user?.phone)
    ls.set("address", userData?.user?.address)
    ls.set("photo", userData?.user?.photo)
    ls.set("messenger", userData?.user?.messenger)
  }

  const setNewUserPhoto = ({ userPhoto }) => {
    const ls = new SecureLS({ encodingType: "aes" })
    ls.set("photo", userPhoto)
  }

  const getUser = () => {
    const ls = new SecureLS({ encodingType: "aes" })

    let token = ls.get("token")
    let userId = ls.get("userId")
    let email = ls.get("email")
    let name = ls.get("name")
    let phone = ls.get("phone")
    let address = ls.get("address")
    let photo = ls.get("photo")
    let messenger = ls.get("messenger")

    return { token, userId, email, name, address, photo, phone, messenger }
  }

  const isLoggedIn = () => {
    const user = getUser()

    return user.userId.length > 0 ? true : false
  }

  return { getUser, setUser, setNewUserPhoto, isLoggedIn }
}
