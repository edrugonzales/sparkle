import React, { useState, useEffect, useContext } from "react"

import { CurrentSelectedAddress } from "../globalstates"
import AppBar from "@material-ui/core/AppBar"
import { navigate } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Toolbar from "@material-ui/core/Toolbar"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import SearchIcon from "@material-ui/icons/Search"
import Button from "@material-ui/core/Button"
import Autocomplete from "react-google-autocomplete"
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete"
import Modal from "@material-ui/core/Modal"

import { theme } from "../../assets/mui"
import { MuiThemeProvider } from "@material-ui/core/styles"
import useWindowDimensions from "../../custom-hooks/useWindowDimensions"
import SecureLS from "secure-ls"

import { reverseGeocode } from "../../api/public/google_api"
// import { placesAutoComplete } from "../../api/public/google_api"

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps"
// import { Link } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  confirmButton: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: 50,
  },
  searchBox: {
    fontSize: 16,
    height: 30,
    width: "90%",
    zIndex: 100,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}))

function Map(props) {
  return (
    <GoogleMap
      defaultCenter={{ lat: props.lat, lng: props.lng }}
      options={{ streetViewControl: false }}
      onClick={props.onClick}
      center={{
        lat: props.lat,
        lng: props.lng,
      }}
      zoom={18}
    >
      <Marker
        position={{
          lat: props.lat,
          lng: props.lng,
        }}
      />
    </GoogleMap>
  )
}

const WrappedMap = withScriptjs(withGoogleMap((props) => Map(props)))

const MapPage = ({ startLat = 14.6038894, startLng = 120.9890886 }) => {
  const classes = useStyles()

  const { height } = useWindowDimensions()

  const [showSearch, setShowSearch] = useState(false)

  const [currentSelectedAddress, setcurrentSelectedAddress] = useContext(
    CurrentSelectedAddress
  )

  const [mapLocalState, setmapLocalState] = useState({
    address: currentSelectedAddress.address,
    lat: currentSelectedAddress.lat,
    lng: currentSelectedAddress.lng,
  })
  // const [search, setSearch] = useState("Fern Building")

  // const [places, setPlaces] = useState([])

  const [userAgent, setUserAgent] = useState("")
  const [isAndroid, setIsAndroid] = useState(false)
  const [isApple, setIsApple] = useState(false)
  const [isWindows, setIsWindows] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState(null)

  const [open, setOpen] = useState()

  const handleClose = () => {
    setOpen(false)
  }

  const visible = localStorage.getItem("formModal")

  useEffect(() => {
    if (!visible) {
      localStorage.setItem("formModal", 1)
      setOpen(true)
    }
    if (visible) {
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    if (navigator.userAgent.match(/Android/i)) {
      setIsAndroid(true)
    } else if (navigator.userAgent.match(/iPhone|iPod|iPad/i)) {
      setIsApple(true)
    } else {
      setIsWindows(true)
    }
  }, [])

  useEffect(() => {
    async function setAddress() {
      let data = await reverseGeocode(
        currentSelectedAddress.lng,
        currentSelectedAddress.lat
      )

      setcurrentSelectedAddress((prevState) => ({
        ...prevState,
        address: data.results[0].formatted_address,
        lat: currentSelectedAddress.lat,
        lng: currentSelectedAddress.lng,
        refreshLists: true,
      }))
    }

    setAddress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleMapClick(lat, lng) {
    if (showSearch) {
      setShowSearch(false)
    }
    let data = await reverseGeocode(lng, lat)

    setmapLocalState((prevState) => ({
      ...prevState,
      address: data.results[0].formatted_address,
      lat: lat,
      lng: lng,
    }))
  }

  function handleSearchPlaceSelection(params) {
    //Update place search state
    setSelectedPlace(params)

    //get lat lng

    geocodeByAddress(params.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        //
        //set map local state
        setmapLocalState((prevState) => ({
          ...prevState,
          address: params.label,
          lat: lat,
          lng: lng,
        }))
      })
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className="container">
        <div className="Header">
          <AppBar style={{ zIndex: 1 }}>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  navigate(-1)
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <Typography className={classes.title}>
                {showSearch ? (
                  <GooglePlacesAutocomplete
                    className={classes.searchBox}
                    apiKey={process.env.REACT_APP_GOOGLE_KEY}
                    selectProps={{
                      selectedPlace,
                      onChange: handleSearchPlaceSelection,
                    }}
                  />
                ) : (
                  // <Autocomplete
                  //   className={classes.searchBox}
                  //   apiKey={process.env.REACT_APP_GOOGLE_KEY}
                  //   options={{
                  //     types: ["geocode"],
                  //     componentRestrictions: { country: "ph" },
                  //   }}
                  //   onPlaceSelected={(place) => {
                  //     let lat = place.geometry.location.lat()
                  //     let lng = place.geometry.location.lng()
                  //
                  //
                  //     setmapLocalState((prevState) => ({
                  //       ...prevState,
                  //       address: place.formatted_address,
                  //       lat: lat,
                  //       lng: lng,
                  //     }))
                  //   }}
                  // />
                  <div
                    className="addressText"
                    onClick={() => {
                      setShowSearch(!showSearch)
                    }}
                  >
                    {mapLocalState.address.substring(0, 70)}
                    {mapLocalState.address.length >= 70 ? "..." : ""}
                  </div>
                )}
              </Typography>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setShowSearch(!showSearch)
                }}
              >
                <SearchIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>

        <div>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCwjH9_I1j2FH89huz-Ld5YVHxNM0mVhn0`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: height }} />}
            mapElement={<div style={{ height: `93%` }} />}
            lat={mapLocalState.lat}
            lng={mapLocalState.lng}
            onClick={async (e) => {
              let lat = e.latLng.lat()
              let lng = e.latLng.lng()
              handleMapClick(lat, lng)
            }}
          />
        </div>

        <Button
          className={classes.confirmButton}
          variant="contained"
          color="secondary"
          onClick={async () => {
            const ls = new SecureLS({ encodingType: "aes" })

            ls.set(
              "currentSelectedLocation.address",
              currentSelectedAddress.address
            )
            ls.set("currentSelectedLocation.lat", currentSelectedAddress.lat)
            ls.set("currentSelectedLocation.lng", currentSelectedAddress.lng)

            //Test if it saves correctly

            setcurrentSelectedAddress((prevData) => ({
              ...prevData,
              address: mapLocalState.address,
              lng: mapLocalState.lng,
              lat: mapLocalState.lat,
              refreshLists: true,
            }))
            navigate(-1)
          }}
        >
          Confirm
        </Button>
      </div>
      <div>
        {isApple ? (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={`${classes.modal}`}
            open={open}
            onClose={handleClose}
            closeAfterTransition
          >
            <div id="popup" className="triangle">
              <div className="h4_addtohome">Add Sparkle!</div>
              <p className="p__addtohome">
                Tap below to add an icon to your home screen for quick access!
              </p>
            </div>
          </Modal>
        ) : null}
      </div>
    </MuiThemeProvider>
  )
}

export default MapPage
