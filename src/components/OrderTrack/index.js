import React, { useEffect, useState } from "react"

import useWindowDimensions from "../../custom-hooks/useWindowDimensions"

import firebase from "firebase/app"
import "firebase/database"

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps"

import OrderDetails from "./orderDetails"

import Navigation from "../Homemade/ShopPage/components/Navigation"

const Map = ({ orderId }) => {
  let [center, setCenter] = useState({
    lat: 14.5833516,
    lng: 120.97994711297704,
  })

  useEffect(() => {
    let mounted = true

    let ref = `order_status/${orderId}`
    let riderLocationRef = firebase.database().ref(`${ref}/rider_location`)

    if (mounted) {
      riderLocationRef.on("value", async (snapshot) => {
        if (snapshot.val() === null) {
        } else {
          setCenter(snapshot.val())
        }
      })
    }

    return () => {
      mounted = false
    }
  }, [])
  //
  return (
    <GoogleMap
      defaultZoom={18}
      defaultCenter={{ lat: center.lat, lng: center.lng }}
      options={{
        streetViewControl: false,
        fullscreenControl: false,
        disableDefaultUI: true,
      }}
      center={{
        lat: center.lat,
        lng: center.lng,
      }}
    >
      <Marker position={{ lat: center.lat, lng: center.lng }} />
    </GoogleMap>
  )
}

const WrappedMap = withScriptjs(withGoogleMap((props) => Map(props)))
const OrderTrack = ({ orderId, location }) => {
  const { height } = useWindowDimensions()

  return (
    <>
      <Navigation location={location} />
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: height * 0.8 }} />}
        mapElement={<div style={{ height: `100%` }} />}
        lat={14.5833516}
        lng={120.97994711297704}
        orderId={orderId}
      />
      <OrderDetails orderId={orderId} />
    </>
  )
}

export default OrderTrack
