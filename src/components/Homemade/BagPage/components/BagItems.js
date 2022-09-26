import React from "react"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { Button, ListItem, Paper } from "@material-ui/core"

import "./BagItem.css"
import { LazyLoadImage } from "react-lazy-load-image-component"
import Lazyload from "react-lazyload"

import computeProductPrice from '../../../../helpers/computeProductPrice'

const BagItems = ({ product, index, onClose, onPlus, onMin }) => {
  return (
    <ListItem>
      <Paper
        key={product._id}
        style={{
          width: "100%",
          margin: "0.2em",
          padding: "10px",
          display: "flex",
          transition: "0.3s",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "visby",
        }}
      >
        <div style={{ width: "20%", marginRight: "0.7em", minWidth: "5em" }}>
          <Lazyload
            className="ShimmerAnimation"
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "10px",
            }}
          >
            <LazyLoadImage
              src={product.imagePrimary}
              alt={product.name}
              effect={"blur"}
              style={{
                height: "50px",
                borderRadius: "10px",
              }}
            />
          </Lazyload>
        </div>
        <div style={{ width: "50%", minWidth: "8em", display: 'flex', marginRight: '1em' }} className="name-price">
          <div style = {{fontWeight: 'normal'}}>
            <div>{product.name}</div>
            <div>{product.size}</div>
            {product.addons.map(addon => {
              return <div>{addon.name}</div>
            })}
          </div>
          <div className="add-sub">
            <div
              className="add-sub--minus"
              onClick={() => {
                // for (let index = 0; index < bagItems.length; index++) {
                //   if (bagItems[index]._id === product._id) {
                //     consolproduct.log("Array found")
                //   }
                // }
                onMin()
              }}
            >
              -
            </div>
            <div className="add-sub--countnumber">{product.count}</div>
            <div
              className="add-sub--plus"
              onClick={() => {
                // for (let index = 0; index < bagItems.length; index++) {
                //   if (bagItems[index]._id === product._id) {
                //     consolproduct.log("Array found")
                //   }
                // }
                onPlus()
              }}
            >
              +
            </div>
          </div>
        </div>

        <div style={{ flexGrow: "1" }} className="gross-amount">
          P {computeProductPrice(product)} 
        </div>
        <div style={{ flexGrow: "1" }}>
          <IconButton
            onClick={() => {
              onClose()
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </Paper>
    </ListItem>
  )
}

export default BagItems
