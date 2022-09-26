import React, { useState, useEffect } from "react"
import StaggeredCard from "../component/StaggeredCard"
import NoStoreFound from "../component/NoStoreFound"
import useWindowDimensions from "../../../../custom-hooks/useWindowDimensions"

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// import 'firebase/analytics';

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

// const firestore = firebase.firestore();

const ShopsList = ({ shops = [] }) => {
  // const [surge, setSurge] = useState({})

  // useEffect(async () => {
  //   const surgeRef = firestore.doc(`SURGE/ZZZAoCXyyekSyIc2zM0P`);
  //   const surgeSnap = await surgeRef.get()
  //
  //   setSurge(surgeSnap.data());
  // }, [])
  const { height, width } = useWindowDimensions()

  let isShopAnArray = Array.isArray(shops)

  if (!isShopAnArray) {
    return <NoStoreFound />
  }

  if (shops.length <= 0) {
    return <NoStoreFound />
  } 

  // remove from array Sparkle shop and FBC

  let filteredShops = shops.filter(function (s) {
    if (
      s.name === "Sparkle Shop" ||
      s.name === "Food Basket Corporation's Shop"
    ) {
    } else {
      return s
    }
  })

  let column1Shops = filteredShops
    .filter((shop, index) => {
      return index % 2 === 1
    })
    .map((shop, index) => {
      let i = index % 2 === 1 ? "Small" : "Large"
      return (
        <StaggeredCard
          key={shop._id}
          Size={i}
          shop={{ ...shop, deliveryFee: shop.deliveryFee }}
        />
      )
    })

  let column2Shops = filteredShops
    .filter((shop, index) => {
      return index % 2 === 0
    })
    .map((shop, index) => {
      let i = index % 2 === 1 ? "Large" : "Small"
      return (
        <StaggeredCard
          key={shop._id}
          Size={i}
          shop={{ ...shop, deliveryFee: shop.deliveryFee }}
        />
      )
    })

  return (
    <div style={{ paddingTop: "0.4em" }}>
      {/* {surge.isSurge ?  
            <div  style={{
              whiteSpace: 'pre-wrap'
            }}>
              <p className="notice">{surge.notice.replace(/\\n/g,'\n')}</p>
            </div> 
            : <></>} */}
      {shops.length > 0 ? (
        <div className={"masonry_list"} style={{width: (width > 444) ? "inherit" : "93%"}}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {column2Shops}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {column1Shops}
          </div>
        </div>
      ) : (
        <NoStoreFound />
      )}
    </div>
  )
}

export default ShopsList
