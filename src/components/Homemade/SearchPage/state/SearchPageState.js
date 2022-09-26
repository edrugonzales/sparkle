import React, { useState, useEffect, useContext } from "react"
import {
  searchProducts,
  getAllCategories,
  getProductsByCategoryAndPrice,
} from "../../../../api/public/search"

import { CurrentSelectedAddress } from "../../../globalstates"

export const GlobalStateSearchShowLoader = React.createContext(false)

export const GlobalStateSearchResult = React.createContext([])

export const GlobalStateSearchParams = React.createContext({
  filter: {
    category: [],
    price: [],
  },
  limit: 10,
  skip: 0,
  long: 120.9868052,
  lat: 14.6038269,
})

export const GlobalStateCategories = React.createContext([])

const SearchPageState = ({ children }) => {
  const [currentSelectedAddress, setcurrentSelectedAddress] = useContext(
    CurrentSelectedAddress
  )

  const [showLoader, setshowLoader] = useState(false)
  const [searchResults, setsearchResults] = useState([])
  const [categories, setcategories] = useState([])
  const [searchParams, setsearchParams] = useState({
    filter: {
      category: [],
      price: [],
    },
    limit: 10,
    skip: 0,
  })

  function filterSearch() {
    setshowLoader(true)
    getProductsByCategoryAndPrice(
      currentSelectedAddress.lng,
      currentSelectedAddress.lat,
      searchParams.skip,
      searchParams.limit,
      {
        category: searchParams.filter.category,
        price: searchParams.filter.price,
      }
    ).then((result) => {
      if (result.data != null) {
        setsearchResults(result.data.length > 0 ? result.data : [])
      } else {
        setsearchResults([])
      }

      setcurrentSelectedAddress((prevState) => ({
        ...prevState,
        refreshLists: false,
      }))

      setshowLoader(false)
    })
  }

  useEffect(() => {
    if (currentSelectedAddress.refreshLists) {
      filterSearch()
    }

    // return () => {
    //   cleanup
    // }
  }, [currentSelectedAddress])

  useEffect(() => {
    filterSearch()
  }, [searchParams])

  useEffect(() => {
    filterSearch()
    getAllCategories().then((cats) => {
      setcategories(cats)
    })
    //   return () => {
    //       cleanup
    //   }
  }, [])

  return (
    <GlobalStateSearchResult.Provider value={[searchResults, setsearchResults]}>
      <GlobalStateCategories.Provider value={[categories, setcategories]}>
        <GlobalStateSearchParams.Provider
          value={[searchParams, setsearchParams]}
        >
          <GlobalStateSearchShowLoader.Provider
            value={[showLoader, setshowLoader]}
          >
            {children}
          </GlobalStateSearchShowLoader.Provider>
        </GlobalStateSearchParams.Provider>
      </GlobalStateCategories.Provider>
    </GlobalStateSearchResult.Provider>
  )
}

export default SearchPageState
