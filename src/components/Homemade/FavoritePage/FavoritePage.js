import React, { useState } from "react"

import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/Close"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import Swal from "sweetalert"
import SparkWaving from "../../../assets/gif/mascon_head_blink.gif"
import ChristmasLights from "../../ChristmasLights"

import { getAllFavoriteProducts, createFavoriteHelpers } from "../helpers"

import { Link, navigate } from "gatsby"

import "../../Homemade/ShopPage/components/ProductCard.css"
import { AppBar, IconButton, Toolbar } from "@material-ui/core"
import { LazyLoadImage } from "react-lazy-load-image-component"

const useStyles = makeStyles({
  top: {
    paddingTop: "50%",
    fontFamily: "visby",
    paddingLeft: "1em",
    paddingRight: "1em",
  },
  icon: {
    color: "red",
    fontSize: "25px",
  },
  backSize: {
    fontSize: "1.5em",
  },
  header: {
    fontFamily: "visby",
    fontWeight: "bold",
  },
  heading: {
    paddingTop: "0.2em",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
})

const FavoritePage = () => {
  const classes = useStyles()

  const [favorites, setFavorites] = useState(getAllFavoriteProducts())
  const favoriteHelpers = createFavoriteHelpers(favorites, setFavorites)

  let isFavorite = true

  return (
    <>
      {/* <AppBar>
        <Toolbar>
          <IconButton
            onClick={() => {
              navigate("/")
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6" className={classes.header}>
            My Favorites
          </Typography>
          <div>
            <ChristmasLights />
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar /> */}
      <Box pt={1}>
        {favorites.length > 0 ? (
          <div className={classes.root}>
            {favorites.map((favorite) => (
              <div className="ProductCard" key={favorite._id}>
                <div>
                  <Link to="/product" state={{ product: favorite }}>
                    <div
                      className="ProductImage ShimmerAnimation"
                      style={{
                        height: "150px",
                        width: "100%",
                      }}
                    >
                      <LazyLoadImage
                        className="ProductImage"
                        effect={"blur"}
                        src={favorite.imagePrimary + "?auto=compress&w=300"}
                        alt={favorite.name}
                        width={"100%"}
                      />
                    </div>
                    {/* <img
                      className="ProductImage"
                      src={favorite.imagePrimary}
                      alt={favorite.name}
                    /> */}
                  </Link>
                  <div className="FavButton">
                    <CloseIcon
                      fontSize="small"
                      style={{ fill: "red" }}
                      onClick={() =>
                        isFavorite
                          ? Swal({
                              title:
                                "Are you sure you want to remove it from favorites",
                              icon: SparkWaving,
                              buttons: true,
                            }).then((willDelete) => {
                              if (willDelete) {
                                favoriteHelpers.removeFavorite(favorite)
                              }
                            })
                          : null
                      }
                    />
                  </div>
                </div>
                <div className="ProductCardDetails">
                  <div className="NameAndPrice">
                    <div className="ProductName">{favorite.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h4 className={classes.top}>
            Add your favorite products here by tapping the{" "}
            <span className={classes.icon}>♥</span> symbol on the product.
          </h4>
        )}
      </Box>
    </>
  )
}

export default FavoritePage
