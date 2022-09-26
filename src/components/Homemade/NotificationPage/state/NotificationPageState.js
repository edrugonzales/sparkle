import React, { useEffect, useState, useContext } from "react"
import { getAllBroadcasts } from "../../../../api/public/broadcast"
import { io } from "socket.io-client"
import { getUser } from "../../../../services/auth"
import socket from "../../../../services/socketio"

export const NotificationPageStates = Object.freeze({
  loading: 1,
  loaded: 2,
  error: 3,
})

export const ListOfNotifications = React.createContext([])

export const NotificationPageCurrentState = React.createContext(
  NotificationPageStates.loading
)

export const RefreshNotifications = React.createContext(false)

export const NumberOfUnreadNotifications = React.createContext(0)

const NotificationPageState = ({ children }) => {
  const [state, setState] = useState(NotificationPageStates.loading)
  const [notifications, setNotifications] = useState([])
  const [refresh, setRefresh] = useState(true)
  const [numberOfUnread, setNumberOfUnread] = useState(0)

  useEffect(() => {
    const user = getUser()
    socket.on(`receive-selected-broadcasts-${user.userId}`, (data) => {
      setNotifications((prevData) => [data, ...prevData])
      setRefresh(!refresh)
    })

    socket.on(`receive-general-broadcasts`, (data) => {
      setNotifications((prevData) => [data, ...prevData])
      setRefresh(!refresh)
    })
  }, [])

  useEffect(() => {
    let n = 0
    for (let index = 0; index < notifications.length; index++) {
      if (notifications[index].isRead === false) {
        n++
      }
    }
    setNumberOfUnread(n)
  }, [refresh, notifications])

  useEffect(() => {
    setState(NotificationPageStates.loading)
    getAllBroadcasts()
      .then((response) => {
        if (response.status === 200) {
          response.json().then((result) => {
            setNotifications(result)
            let n = 0
            for (let index = 0; index < result.length; index++) {
              if (result[index].isRead === false) {
                n++
              }
            }
            setNumberOfUnread(n)
          })
          setState(NotificationPageStates.loaded)
        } else {
          setState(NotificationPageStates.loaded)
        }
      })
      .catch((e) => {
        setState(NotificationPageStates.error)
      })
  }, [])

  return (
    <ListOfNotifications.Provider value={[notifications, setNotifications]}>
      <NotificationPageCurrentState.Provider value={[state, setState]}>
        <RefreshNotifications.Provider value={[refresh, setRefresh]}>
          <NumberOfUnreadNotifications.Provider
            value={[numberOfUnread, setNumberOfUnread]}
          >
            {children}
          </NumberOfUnreadNotifications.Provider>
        </RefreshNotifications.Provider>
      </NotificationPageCurrentState.Provider>
    </ListOfNotifications.Provider>
  )
}

export default NotificationPageState
