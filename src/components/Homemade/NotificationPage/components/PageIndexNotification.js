import React, { useContext, lazy, useState, Suspense } from "react"
import BroadcastCard from "./BroadcastCard"
import { Box } from "@mui/system"
import { markAsRead } from "../../../../api/public/broadcast"
import CenteredProgress from "../../../misc/centeredProgress"
import {
  ListOfNotifications,
  NotificationPageCurrentState,
  NotificationPageStates,
  RefreshNotifications,
} from "../state/NotificationPageState"
import ErrorCard from "../../../misc/ErrorCard"
import { Typography } from "@mui/material"
import NoNotif from "../../../../assets/svg/graphics/no_notif.svg"
import useNotificationViewer from "../custom-hooks/useNotificationViewer"

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
const BroadcastDialog = lazy(() => import('./BroadcastDialog'))



TimeAgo.addDefaultLocale(en)

const PageIndexNotification = () => {
  const [notifToView, setNotifToView] = useState(false)

  const [state, setState] = useContext(NotificationPageCurrentState)
  const [notifications, setNotifications] = useContext(ListOfNotifications)
  const [refresh, setRefresh] = useContext(RefreshNotifications)

  const { viewNotification, NotificationViewer } = useNotificationViewer()

  function State(state) {
    switch (state) {
      case NotificationPageStates.loading:
        return <CenteredProgress />
      case NotificationPageStates.loaded:
        if (notifications.length <= 0) {
          return (
            <div
              style={{
                textAlign: "center",
                alignItems: "center",
                height: "500px",
              }}
            >
              <img
                src={NoNotif}
                alt="No Notif found"
                width={"100%"}
                height={"200px"}
              />
              <Typography variant="h6">No notifications found!</Typography>
            </div>
          )
        }

        return (
          <div
            style={{
              margin: "0 0 100px 0",
            }}
          >
            {notifications.map((notification, index) => {
              let images = notification.images.flatMap((image) => image.url)
              return (
                <BroadcastCard
                  title={notification.title}
                  body={notification.body}
                  images={images}
                  isRead={notification.isRead}
                  createdAt={notification.createdAt}
                  onClick={() => {
                    if (images.length > 0) {
                      console.log(notifications[index])
                      setNotifToView(notifications[index])
                    }


                    markAsRead(notification._id)
                      .then((response) => {
                        if (response.status === 200) {
                          setRefresh(!refresh)
                          notifications[index].isRead = true

                          //Update local state
                          let newArr = [...notifications]
                          newArr[index].isRead = true
                          setNotifications(newArr)
                        }
                        return
                      })
                      .catch((e) => { })
                  }}
                />
              )
            })}
            <Box height="100px" />
          </div>
        )
      default:
        return <ErrorCard />
    }
  }

  return <> <Suspense fallback={<></>}> <BroadcastDialog notifToView={notifToView} onClose={() => {
    setNotifToView(false)
  }} /> </Suspense>{State(state)}</>
}

export default PageIndexNotification
