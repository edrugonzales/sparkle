export default function getUserName(user_id, usersFromServer) {
  if (user_id) {
    let specificUser = usersFromServer.find((u) => u.user.id === user_id)
    //
    if (specificUser) {
      return specificUser.user.full_name
        ? specificUser.user.full_name
        : specificUser.user.email
    } else {
      return `User ${String(user_id)}`
    }
  } else {
    return `No one`
  }

  // String(user_id)

  // specificUser.user.full_name ? specificUser.user.full_name : specificUser.user.email
}
