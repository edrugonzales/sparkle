import React, { useEffect, useState, useContext } from "react"
import ProductCard from "./ProductCard"
import { getProductsByShopId } from "../../../../api/public/products"
import "./Menu.css"
import SparkleMenuGif from "../../../../assets/images/sparkles-gif.gif"
import { ShowBubbleContext } from "../../../globalstates"

import { getAllFavoriteProducts } from "../../helpers"

const Preloader = () => {
  return <img src={SparkleMenuGif} className="menu-preloader" />
}

const Menu = (props) => {
  const [products, setProducts] = useState([])
  const [favorites, setFavorites] = useState(getAllFavoriteProducts())
  const [showBubbleState, setShowBubbleState] = useContext(ShowBubbleContext)

  useEffect(() => {
    getProductsByShopId(props.shopId).then((response) => {
      setProducts(response)
      setShowBubbleState(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.shopId])

  return (
    <div className="MenuGrid">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            viewMode={props.viewMode}
            addToBag={props.addToBag}
            data={product}
            shopSchedule={props.shopSchedule}
            favorites={favorites}
            setFavorites={setFavorites}
            key={product._id}
          />
        ))
      ) : (
        <Preloader />
      )}
    </div>
  )
}

export default Menu
