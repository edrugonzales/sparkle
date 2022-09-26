import React, { useState, useEffect } from "react"
import BroadcastCard, { BroadcastType } from "./BroadcastCard"
import { Box } from "@mui/system"
import { getPromotions } from "../../../../api/public/broadcast"
import CenteredProgress from "../../../misc/centeredProgress"

const PageIndexPromos = () => {
  const [isLoading, setisLoading] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    setisLoading(true)
    getPromotions()
      .then((response) => {
        if (response.status === 200) {
          response.json().then((result) => {
            setNotifications(result)
          })
          setisLoading(false)
        } else {
          setisLoading(false)
        }
      })
      .catch((e) => {
        setisLoading(false)
      })
  }, [])

  if (isLoading) {
    return <CenteredProgress />
  }

  return (
    <div
      style={{
        margin: "0 0 100px 0",
      }}
    >
      {notifications.map((notification) => {
        let images = notification.images.flatMap((image) => image.url)
        return (
          <BroadcastCard
            title={notification.title}
            body={notification.body}
            images={images}
            type={BroadcastType.Promotion}
          />
        )
      })}
      <Box height="100px" />
    </div>
  )
}

export default PageIndexPromos
