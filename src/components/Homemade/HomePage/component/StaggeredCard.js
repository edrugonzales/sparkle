import React from "react"
import "./StaggeredCard.css"
import Lazyload from "react-lazyload"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import TimerIcon from "@material-ui/icons/Timer"
import { Link } from "gatsby"
import Badges from "./Badges"

import "react-lazy-load-image-component/src/effects/blur.css"

import Image from "./StaggeredCardImage"
import noImage from "../../../../assets/images/no_image.png"

const styles = {
  pin: {
    margin: "2px 2px",
    padding: 0,
    borderRadius: "16px",
    backgroundColor: "white",
    position: "relative",
  },
  Small: {
    gridRowEnd: "span 15",
    flex: "45%",
    height: "12em",
  },
  Medium: {
    gridRowEnd: "span 20",
  },
  Large: {
    gridRowEnd: "span 30",
    flex: "45%",
    height: "23em",
  },
  Large2: {
    gridRowEnd: "span 30",
    flex: "45%",
    height: "20em",
    marginTop: "-5em",
  },
}

const StaggeredCard = ({ shop, Size }) => {
  return (
    <div style={{ ...styles.pin, ...styles[Size] }}>
      <Lazyload
        style={{
          ...styles[Size],
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          borderRadius: "1em",
        }}
      >
        <div className={`cardImageContainer${Size}`}>
          <Link to="/shop" state={{ shop: shop }}>
            {shop.banner != "" ? (
              <Image className="cardBanner" src={shop.banner} alt={shop.name} />
            ) : (
              <img className="cardBanner" src={noImage} alt={shop.name} />
            )}
          </Link>
          <div
            style={{
              position: "absolute",
              top: "15px",
              left: "20px",
            }}
          >
            <Badges
              isNew={shop?.isNew}
              isBestSeller={shop?.isBestSeller}
              isMostReview={shop?.isMostReview}
            />
          </div>
        </div>
        <div className="cardDetails">
          <Link to="/shop" state={{ shop: shop }}>
            {shop.logo != "" ? (
              <Image className="cardLogo" src={shop.logo} alt={shop.name} />
            ) : (
              <img className="cardLogo" src={noImage} alt={shop.name} />
            )}
          </Link>
          <div className="cardTitle">
            <div className="shopName">{shop.name}</div>
            <div className="partOne">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <LocationOnIcon fontSize="small" />
                {shop.shopDistance}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <TimerIcon fontSize="small" />
                45 min
              </div>
            </div>
            <div className="partTwo">
              {Math.round(shop.deliveryFee)} Delivery Fee
            </div>
          </div>
        </div>
      </Lazyload>
    </div>
  )
}

export default StaggeredCard
