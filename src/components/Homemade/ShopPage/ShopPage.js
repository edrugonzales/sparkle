import React, { useState, useEffect, useContext } from "react"
import "./ShopPage.css"

import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import { Divider, Grid } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import { Box } from "@material-ui/core"
import Menu from "./components/Menu"
import Inspiration from "./components/Inspiration"
import Reviews from "./components/Reviews"
import Schedule from "./components/Schedule"
import ShopLikeDislike from "./components/ShopLikeDislike"
import { LazyLoadImage } from "react-lazy-load-image-component"
import isShopOpen from "../../../helpers/shop-op-checker"
import "../ShopPage/ShopPage.css"
import ShareIcon from "@mui/icons-material/Share"

import Popover from "@material-ui/core/Popover"
import Navigation from "./components/Navigation"
import SplashScreen from "../../SplashScreen"

import InfoDialog from "../../Dialogs/InfoDialog"
import ShareUrl from "./shareUrl"

import {
  HomemadeShopList,
  HomePageCurrentState,
} from "./../HomePage/state/HomePageState"
import { ShowBubbleContext } from "../../globalstates"
import { navigate } from "gatsby"

import { getShop } from "../../../api/public/shops"
import useBag from "../BagPage/custom_hooks/useBag"

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

const ShopPage = ({ location, shopId }) => {

  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)

  const [shopData, setShopData] = useState(location.state)

  const [shops] = useContext(HomemadeShopList)
  const [pageState] = useContext(HomePageCurrentState)

  const [showBubbleState, setShowBubbleState] = useContext(ShowBubbleContext)

  const [infoDialog, setInfoDialog] = useState({
    showDialog: false,
    message: "",
  })

  const [viewMode, setViewMode] = useState(false)

  const [fetching, setFetching] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const findShop = (id) => {
    if (!fetching) {
      setFetching(true)
      getShop(id).then((response) => {
        setShopData({ shop: response })
        setFetching(false)
      })
    }
  }

  const open = anchorEl

  useEffect(() => {
    //check the url parameter
    //60f7ce53cf3fa00017e68659
    //find the shops

    if (pageState == 2 && shopId && shops.length > 0) {
      let id = shopId.split("--")[1]
      let shopFound = shops.find((shop) => shop._id === id)
      if (shopFound) setShopData({ shop: shopFound })
      // else findShop(id)
    }
  }, [pageState])

  const onShare = () => {
    let id = `${
      shopData.shop.name
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .trim()
        .split(" ")[0]
    }--${shopData.shop._id}`
    let url = `${window.location.origin}/shop/${id}`
    console.log(url)
    ShareUrl(shopData.shop.name, url)
  }

  const { addToBag, BagButton } = useBag()

  return (
    <div className="page">
      {shops.length && shopData?.shop ? (
        <Grid container className="shop-page">
          <div>
            <Paper elevation={3}>
              <div className="HeroHeader">
                <Navigation location={location} />
                <BagButton />
                <ShareIcon className="ShopShare" onClick={onShare} />
                <img
                  placeholder={<span>loading</span>}
                  effect="blur"
                  className="BannerImage"
                  src={shopData?.shop.banner}
                  alt={shopData?.shop.name}
                  threshold={10}
                />

                <div className="HeadingDetails">
                  <div
                    className="LogoAndTitle"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <LazyLoadImage
                      placeholder={<span>loading</span>}
                      effect="blur"
                      className="ShopLogo"
                      src={shopData?.shop.logo}
                      alt={shopData?.shop.name}
                      threshold={10}
                    />
                    <div>
                      <div className="ShopName">{shopData?.shop.name}</div>
                      <div className="ShopLocation">
                        <LocationOnIcon
                          fontSize="small"
                          className="ShopLocation__logo"
                        />
                        <span
                          onClick={handleClick}
                          className="ShopLocation__text"
                        >
                          Location
                        </span>
                        <Popover
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          <span
                            style={{
                              margin: "10px",
                              textAlign: "center",
                              justifyContent: "center",
                              fontFamily: "visby",
                            }}
                          >
                            {shopData?.shop.address}
                          </span>
                        </Popover>
                      </div>
                    </div>
                  </div>
                  <div className="StatusAndLikes">
                    <div
                      className="ShopStatus"
                      style={{
                        color: isShopOpen(shopData?.shop.schedule)
                          ? "green"
                          : "red",
                      }}
                    >
                      {isShopOpen(shopData?.shop.schedule) ? "Open" : "Closed"}
                    </div>
                    <ShopLikeDislike
                      shopId={shopData?.shop._id}
                      name={shopData?.shop.name}
                    />
                  </div>
                </div>
              </div>
            </Paper>
          </div>
          <div
            style={{
              backgroundColor: "white",
              position: "relative",
              top: "200px",
              width: "100%",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="fullWidth"
              centered
              className="shop-tabs"
            >
              <Tab className="shop-tabs" label="Menu" {...a11yProps(0)} />
              <Tab label="Inspiration" {...a11yProps(1)} />
              <Tab label="Reviews" {...a11yProps(2)} />
              <Tab label="Schedule" {...a11yProps(3)} />
            </Tabs>
            <Container maxWidth="xs" disableGutters="true">
              <TabPanel value={value} index={0}>
                <Menu
                  addToBag={addToBag}
                  viewMode={viewMode}
                  shopId={shopData?.shop._id}
                  shopSchedule={shopData?.shop.schedule}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Inspiration inspiration={shopData?.shop.inspiration} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Reviews shopId={shopData?.shop._id} />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Schedule schedules={shopData?.shop.schedule} />
              </TabPanel>
            </Container>
          </div>
        </Grid>
      ) : (
        <SplashScreen />
      )}

      <InfoDialog
        showDialog={infoDialog.showDialog}
        message={infoDialog.message}
        onConfirm={() => {
          setInfoDialog({
            ...infoDialog,
            showDialog: false,
          })
        }}
      />
    </div>
  )
}

export default ShopPage