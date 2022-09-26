 import React, { useState, useContext, useEffect } from "react"

import Box from "@material-ui/core/Box"
import { makeStyles } from "@material-ui/core/styles"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import Container from "@material-ui/core/Container"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import TuneIcon from "@material-ui/icons/Tune"
import ProductSearchFilterDialog from "./components/ProductSearchFilterDialog"

import { GlobalStateSearchResult } from "./state/SearchPageState"
import { GlobalStateCategories } from "./state/SearchPageState"
import { GlobalStateSearchParams } from "./state/SearchPageState"
import { GlobalStateSearchShowLoader } from "./state/SearchPageState"
import { CurrentSelectedAddress } from "../../globalstates"

import { searchProducts } from "../../../api/public/search"
import ProductList from "./ProductList"

import "../ShopPage/components/ProductCard.css"
import { theme } from "../../../assets/mui"
import {
  Backdrop,
  Chip,
  CircularProgress,
  MuiThemeProvider,
} from "@material-ui/core"
import { getAllFavoriteProducts } from "../helpers"
import { navigate } from "gatsby"
import NoResults from "./components/NoResults"
import "../../../assets/css/HorizontalCardList.css"
import Bottom from "../BottomNavigator"
import useBag from "../BagPage/custom_hooks/useBag"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  input: {
    width: "100%",
  },
  top: {
    paddingTop: "15%",
  },
  backSize: {
    fontSize: "1.5em",
  },
  product: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(0.5),
    borderRadius: "1em",
    boxShadow: "1px 2px 2px 1px grey",
    fontFamily: "visby",
    textTransform: "lowercase",
    fontWeight: "bold",
  },
  backdrop: {
    zIndex: 1000,
  },
  scrollMenu: {
    marginTop: "1%",
    overflow: "auto",
    whiteSpace: "nowrap",
  },
}))

const SearchPage = () => {
  const classes = useStyles()

  const [query, setQuery] = useState("")

  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [favorites, setFavorites] = useState(getAllFavoriteProducts())

  const [showLoader, setshowLoader] = useContext(GlobalStateSearchShowLoader)

  const [searchResults, setsearchResults] = useContext(GlobalStateSearchResult)

  const [categories, setcategories] = useContext(GlobalStateCategories)

  const [searchParams, setsearchParams] = useContext(GlobalStateSearchParams)

  const { addToBag, BagButton } = useBag()

  const [currentSelectedAddress, setcurrentSelectedAddress] = useContext(
    CurrentSelectedAddress
  )

  const [activeFilter, setActiveFilter] = useState([])

  function SearchByText(query) {
    setshowLoader(true)
    searchProducts(
      query,
      currentSelectedAddress.lng,
      currentSelectedAddress.lat
    ).then((results) => {
      if (results.length) {
      }
      setsearchResults(results.length > 0 ? results : [])
      setshowLoader(false)
    })
  }

  const categoryOnClick = (category) => {
    activeFilter.includes(category)
      ? removeCategory(category)
      : setCategory(category)
  }

  const setCategory = (category) => {
    setActiveFilter([...activeFilter, category])
  }

  const removeCategory = (category) => {
    const index = activeFilter.findIndex((cat) => cat === category)
    activeFilter.splice(index, 1)
    setActiveFilter([...activeFilter])
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
              navigate("/")
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <>
            <IconButton
              aria-label="menu"
              onClick={() => {
                setShowFilterDialog(true)
              }}
            >
              <TuneIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Search for foods"
              onChange={(e) => {
                setQuery(e.target.value)
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (query.length > 0) {
                    SearchByText(query)
                  }
                }
              }}
              value={query}
            />
            <IconButton
              aria-label="search"
              onClick={() => {
                if (query.length > 0) {
                  SearchByText(query)
                }
              }}
            >
              <SearchIcon />
            </IconButton>
            <BagButton hidden={true} />
          </>
        </Toolbar>
      </AppBar>
      <Toolbar />
      
      <Container maxWidth="xs" disableGutters="true">     

      
        <div className="horizontallist scrollbar-hidden">
          {categories.map((category, index) => {
            return (
              <>
                <Chip
                  key={category._id}
                  style={{
                    backgroundColor: activeFilter.includes(category)
                      ? "#ffcf10"
                      : "white",
                    margin: "0.2em",
                    marginTop: "1em",
                  }}
                  label={category.name}
                  variant="outlined"
                  onClick={(e) => {
                    categoryOnClick(category)
                    let values = {
                      price: [],
                      category: [category._id],
                    }
                    setsearchParams((prevState) => ({
                      ...prevState,
                      skip: 0,
                      limit: 10,
                      filter: values,
                      long: currentSelectedAddress.lng,
                      lat: currentSelectedAddress.lat,
                    }))
                  }}
                />
              </>
            )
          })}
        </div>
        <ProductSearchFilterDialog
          showDialog={showFilterDialog}
          onConfirm={(values) => {
            setsearchParams((prevState) => ({
              ...prevState,
              skip: 0,
              limit: 10,
              filter: values,
              long: currentSelectedAddress.lng,
              lat: currentSelectedAddress.lat,
            }))

            setShowFilterDialog(false)
          }}
          onClose={() => {
            setShowFilterDialog(false)
          }}
          categoriesList={categories}
        />

        <Box pt={1}>
          {searchResults.length > 0 ? (
            <ProductList
              addToBag={addToBag}
              products={searchResults}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ) : (
            <NoResults />
          )}
        </Box>

        <Backdrop className={classes.backdrop} open={showLoader}>
          <CircularProgress color="secondary" />
        </Backdrop>

      </Container>  
      <Bottom
      // value={homeMadeBottomNavigationIndex}
      // onChange={(event, newValue) => {
      //   sethomeMadeBottomNavigationIndex(newValue)
      // }}
      />
    </MuiThemeProvider>
  )
}

export default SearchPage
