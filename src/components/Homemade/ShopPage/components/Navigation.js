import React, { useContext } from "react"
import IconButton from "@material-ui/core/IconButton"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import { navigate } from "gatsby"
// import { HomeMadeCartContext } from "../../../globalstates"
// import BagButton from "../../../Buttons/BagButton"

import "../ShopPage.css"

const Navigation = ({ location }) => {
  function getPath() {
    let path = location.pathname.split("/")[1]
    return path
  }
  // eslint-disable-next-line no-unused-vars

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        className="shop-nav-back"
        onClick={() => {
          if (getPath() === "shop") return navigate("/food")
          navigate(-1)
        }}
      >
        <ChevronLeftIcon style={{ fill: "#0286FE" }} />
      </IconButton>
    </>
  )
}

export default Navigation
