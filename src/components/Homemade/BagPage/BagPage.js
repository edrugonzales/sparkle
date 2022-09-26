import React, { useContext, useState } from "react"
import { HomeMadeCartContext } from "../../globalstates"

//import { makeStyles } from "@material-ui/core/styles"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import { theme } from "../../../assets/mui/"
import { MuiThemeProvider } from "@material-ui/core/styles"

import CloseIcon from "@material-ui/icons/Close"
import Container from "@material-ui/core/Container"
import { AppBar, Box, Button, List, Paper } from "@material-ui/core"
import { navigate } from "gatsby"
import InfoDialog from "../../Dialogs/InfoDialog"
import BagItems from "./components/BagItems"
import { Link } from "gatsby"

import "./BagPage.css"
import BagNoItems from "./components/BagNoItems"

import useWindowDimensions from "../../../custom-hooks/useWindowDimensions"
import computeProductPrice from "../../../helpers/computeProductPrice"

const BagPage = () => {
  const [bagItems, updateBag] = useContext(HomeMadeCartContext)
  const { height, width } = useWindowDimensions()
  const [dialogState, setDialogState] = useState({
    showDialog: false,
    dialogMessage: "",
    isError: false,
  })

  function total(productList) {
    let total = 0
    for (let index = 0; index < productList.length; index++) {
      let discount = 0
      let product = productList[index]
      let productPrice = computeProductPrice(product)

      total = total + productPrice 
    }

    return total
  }

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              navigate(-1)
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <h3 className="header"> My Bag</h3>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="xs" disableGutters="true">
        {bagItems.length > 0 ? (
          <List className="items">
            {bagItems.map((e, index) => (
              <BagItems
                product={e}
                index={index}
                onMin={() => {
                  let newArr = [...bagItems]
                  if (newArr[index].count <= 1) {
                    return
                  }

                  newArr[index].count -= 1
                  updateBag(newArr)
                }}
                onPlus={() => {
                  let newArr = [...bagItems]

                  if (newArr[index].count >= newArr[index].quantity) {
                    return
                  }
                  newArr[index].count += 1
                  updateBag(newArr)
                }}
                onClose={() => {
                  updateBag(
                    bagItems.filter((items) => items.key !== bagItems[index].key)
                  )
                }}
              />
            ))}
            <Box height={"10em"} />
          </List>
        ) : (
          <BagNoItems />
        )}

        <div
          style={{
            position: "fixed",
            bottom: "20px",
            width: (width > 444) ? 444 : "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px",
              fontWeight: "bold",
              fontFamily: "visby",
            }}
          >
            <div>Total</div>
            <div>P {total(bagItems)}</div>
          </div>
          <Button
            style={{
              width: "80%",
              height: "50px",
              marginLeft: "10%",
              marginRight: "10%",
            }}
            variant="contained"
            color="secondary"
            className="checkout-button"
            onClick={() => {
              if (bagItems?.length <= 0) {
                setDialogState((prevState) => ({
                  ...prevState,
                  showDialog: true,
                  dialogMessage: `Your bag is empty, please add products`,
                }))
              } else {
                navigate("/checkoutpage")
              }
            }}
          >
            Proceed to Checkout
          </Button>
          <InfoDialog
            showDialog={dialogState.showDialog}
            message={dialogState.dialogMessage}
            onConfirm={() => {
              setDialogState((prevState) => ({
                ...prevState,
                showDialog: false,
              }))
            }}
          />
        </div>
      </Container>
    </MuiThemeProvider>
  )
}

export default BagPage
