import React, { useState, useContext, useEffect } from "react"
import Carousel from "nuka-carousel"

import { HomeMadeCartContext } from "../../globalstates"
import Typography from "@material-ui/core/Typography"
import { Box } from "@material-ui/core"

import { LazyLoadImage } from "react-lazy-load-image-component"

import "./ProductPage.css"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Button from "@material-ui/core/Button"
import { theme } from "../../../assets/mui/"
import { MuiThemeProvider } from "@material-ui/core/styles"
import ProductReviews from "../Reviews/ProductReviews"
import ProductLikeDislike from "./components/ProductLikeDislike"
import isShopOpen from "../../../helpers/shop-op-checker"

import Navigation from "../ShopPage/components/Navigation"
import useBag from "../BagPage/custom_hooks/useBag"

import {computePrice} from '../helpers'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      className="tabpanel"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const ProductPage = ({ location }) => {

  let product = {
    ...location.state.product,
    count: 1,
  }

  useEffect(() => {
    let data = location.state.product
    let mounted = true;
    console.log(data)

    if (mounted) {
      //compute discount here
      if (data.discount !== "0") {
        let result = 0
        if (data.discount.includes('%'))
          result = data.price * (Number(data.discount.trim().replaceAll('%', "")) / 100)
        else
          result = Number(data.discount)

          console.log(result)
        setDiscount(result)
      }
    }
    return () => {
      mounted = false
    }
  }, [])




  const [discount, setDiscount] = useState(0)

  const [value, setValue] = useState(0)

  const { addToBag, BagButton } = useBag()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [bagItems, updateBag] = useContext(HomeMadeCartContext)

  const [dialogState, setDialogState] = useState({
    showDialog: false,
    dialogMessage: "",
    isError: false,
  })

  const [confirmDialogState, setConfirmDialogState] = useState({
    showDialog: false,
    dialogMessage: "",
    isError: false,
  })

  const [closeShopDialogState, setCloseShopDialogState] = useState({
    showDialog: false,
    dialogMessage: "",
    isError: false,
  })

  //This function will check if the product is already in the bag
  function isProductInTheBag(product, productArray) {
    let result = false

    for (let index = 0; index < productArray.length; index++) {
      if (product._id === productArray[index]._id) {
        result = true
      }
    }

    return result
  }

  // function addToBag(data) {
  //   //Check for duplicate item
  //   if (isProductInTheBag(data, bagItems)) {
  //     setDialogState((prevState) => ({
  //       ...prevState,
  //       showDialog: true,
  //       dialogMessage: "Item is already in the bag",
  //       isError: true,
  //     }))

  //     return
  //   } else {
  //     //check if item is on the same shop

  //     if (bagItems.length > 0) {
  //       if (bagItems[0].shop._id === data.shop._id) {
  //         updateBag((prevState) => [...prevState, product])
  //         setDialogState((prevState) => ({
  //           ...prevState,
  //           showDialog: true,
  //           dialogMessage: "Product added to bag",
  //           isError: false,
  //         }))
  //       } else {
  //         setConfirmDialogState((prevState) => ({
  //           ...prevState,
  //           showDialog: true,
  //           dialogMessage:
  //             "This is a different shop, existing items will be removed do you wish to continue?",
  //           isError: false,
  //         }))

  //         return
  //       }
  //     } else {
  //       updateBag((prevState) => [...prevState, product])
  //       setDialogState((prevState) => ({
  //         ...prevState,
  //         showDialog: true,
  //         dialogMessage: "Product added to bag",
  //         isError: false,
  //       }))
  //     }
  //   }
  // }

  //

  return (
    <div className="page">
      <MuiThemeProvider theme={theme}>
        <Navigation location={location} />
        <BagButton />
        <div className="container">
          <div className="ProductHeader">
            <Carousel autoplay={true} withoutControls={true} wrapAround={true}>
              {location.state.product.images.map((image) => {
                if (image.isApproved) {
                  return (
                    <LazyLoadImage
                      placeholder={<span>loading</span>}
                      effect="blur"
                      src={image.url + "?auto=compress&w=300"}
                      alt={location.state.product.name}
                      threshold={10}
                      width="100%"
                      height="400px"
                    />
                  )
                } else {
                  return null
                }
              })}
            </Carousel>
          </div>
          <div className="ProductBody">
            <div className="row space-between">
              <span className="ProductDetailName">
                {location.state.product.name}
              </span>
              <div>
                {discount > 0 && <span className = "ProductPreviousPrice">P {computePrice(location.state.product)}</span>}
                <span className="ProductDetailPrice">
                  P {computePrice(location.state.product) - discount}
                </span>
              </div>
            </div>
            <div className="row space-between">
              <div
                className="row space-between"
                style={{
                  fontSize: "0.8em",
                }}
              >
                <div
                  className="m-1"
                  style={{
                    color: location.state.product.status ? "green" : "red",
                  }}
                >
                  {location.state.product.status ? "Available" : "Unavailable"}
                </div>
                <ProductLikeDislike productId={location.state.product._id} />
              </div>
              <div style={{ fontSize: "0.8em" }}>
                {location.state.product.quantity > 0
                  ? `${location.state.product.quantity} in stock`
                  : "Out of Stock"}
              </div>
            </div>
          </div>
          <div
            className="mt-0"
            style={{
              paddingLeft: "2em",
              paddingRight: "2em",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="fullWidth"
              centered
            >
              <Tab
                className="ProductTab"
                label="Description"
                {...a11yProps(0)}
              />
              <Tab
                className="ProductTab"
                label="Ingredients"
                {...a11yProps(1)}
              />
              <Tab className="ProductTab" label="Reviews" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <div className="ProductDescription">
                {location.state.product.description}
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="ProductDescription">
                {location.state.product.ingredients}
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className="ProductDescription">
                <ProductReviews productId={location.state.product._id} />
              </div>
            </TabPanel>
          </div>
        </div>
        <div className="BottomButton">
          <Button
            style={{
              width: "100%",
            }}
            variant="contained"
            color="secondary"
            fullWidth={true}
            onClick={() => {
              addToBag(location.state.product)
            }}
          >
            Add to bag
          </Button>
        </div>
      </MuiThemeProvider>
    </div>
  )
}

export default ProductPage
