import React, { useState } from "react"

import { Link } from "gatsby"

import FavoriteIcon from "@material-ui/icons/Favorite"
import { makeStyles } from "@material-ui/core/styles"

import { createFavoriteHelpers } from "../../helpers"

import "../../ShopPage/components/ProductCard.css"
import "../../ShopPage/components/Menu.css"
import PullToRefresh from "react-simple-pull-to-refresh"
import { LazyLoadImage } from "react-lazy-load-image-component"
import useBag from "../../BagPage/custom_hooks/useBag"
import AddIcon from "@material-ui/icons/Add"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    margin: "0 0 100px 0",
  },
})

const ProductList = ({
  products,
  addToBag,
  favorites,
  setFavorites,
  onRefresh,
}) => {
  const classes = useStyles()

  const favoriteHelpers = createFavoriteHelpers(favorites, setFavorites)

  return (
    <>
      <PullToRefresh
        onRefresh={async () => {
          onRefresh()
        }}
      >
        <div className={classes.root}>
          {products?.map((product) => {
            return (
              <div className="ProductCard" key={product._id}>
                <div>
                  <Link to="/shop" state={{ shop: product.shop }}>
                    <div
                      className="ProductImage ShimmerAnimation"
                      style={{
                        height: "150px",
                        width: "100%",
                      }}
                    >
                      <LazyLoadImage
                        className="ProductImage"
                        src={product.imagePrimary}
                        alt={product.name}
                        effect={"blur"}
                        width={"100%"}
                      />
                    </div>
                  </Link>
                  <div
                    aria-hidden="true"
                    className="AddButton"
                    onClick={() => {
                      addToBag(product)
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </div>
                  <div className="FavButton">
                    {favoriteHelpers.isProductInFavorites(product) ? (
                      <FavoriteIcon
                        fontSize="small"
                        style={{ fill: "red" }}
                        onClick={() => favoriteHelpers.removeFavorite(product)}
                      />
                    ) : (
                      <FavoriteIcon
                        fontSize="small"
                        style={{ fill: "gray" }}
                        onClick={() => favoriteHelpers.addFavorite(product)}
                      />
                    )}
                  </div>
                </div>
                <div className="ProductCardDetails">
                  <div className="NameAndPrice">
                    <div className="ProductName">{product.name}</div>
                    <div className="ProductPrice">P{product.price}</div>
                  </div>
                  <div className="Description"> by {product.shop.name}</div>
                </div>
              </div>
            )
          })}
        </div>
      </PullToRefresh>
    </>
  )
}

export default ProductList
