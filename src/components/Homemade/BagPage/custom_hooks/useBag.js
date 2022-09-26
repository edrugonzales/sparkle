import React, { useState, useContext, useRef } from "react"
import { Badge, IconButton } from "@mui/material"

import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined"
import { navigate } from "gatsby"
import ConfirmationDialog from "../../../Dialogs/ConfirmationDialog"
import AddToBagDialog from "../../../Dialogs/AddToBagDialog"
import ClosedShopDialog from "../../../Dialogs/ClosedShopDialog"
import { HomeMadeCartContext } from "../../../globalstates"
import ProductOptionsDialog from "../../../Dialogs/ProductOptionsDialog"


import { generateKey } from "../../../../helpers/keyGenerators"

export default function useBag() {
  const [bagItems, updateBag] = useContext(HomeMadeCartContext)

  const [product, setProduct] = useState(null)


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


  const [productOptionsDialogState, setProductOptionsDialogState] = useState({
    showDialog: false,
    dialogMessage: "",
    isError: false,
  })




  const isProductInTheBag = (productData, productArray) => {
    let result = false

    for (let index = 0; index < productArray.length; index++) {
      if (productData.key === productArray[index].key) {
        result = true
      }
    }

    return result
  }

  const getProductBagIndex = (productData, productArray) => {
    for (let index = 0; index < productArray.length; index++) {
      if (productData._id === productArray[index]._id) {
        return index
      }
    }
  }

  const totalAllItemCount = (productArray) => {
    let total = 0
    for (let index = 0; index < productArray.length; index++) {
      total = total + productArray[index].count
    }

    return total
  }

  const addToBag = (data) => {
    let { sizes, addons } = data
    setProduct(data)
    if (sizes.length > 0 || addons.length > 0) {
      setProductOptionsDialogState({
        ...productOptionsDialogState,
        showDialog: true
      })
    }
    else {
      confirmProductToBag(data)
    }
  }

  const confirmProductToBag = (data) => {
    let key = generateKey(data._id, data?.size, data?.addons)

    let productObj = {
      key: key,
      ...data,
      count: 1,
    }

    if (isProductInTheBag(productObj, bagItems)) {
      console.log('product in the bag')
      setDialogState((prevState) => ({
        ...prevState,
        showDialog: true,
        dialogMessage: "Product added to bag",
        isError: false,
      }))

      // return
      let productIndex = getProductBagIndex(productObj, bagItems)

      let newArr = [...bagItems]

      if (newArr[productIndex].count >= newArr[productIndex].quantity) {
        return
      }
      newArr[productIndex].count += 1
      updateBag(newArr)
    } else {
      console.log('not in the bag')
      //check if item is on the same shop
      //console.log(bagItems.length)
      if (bagItems.length > 0) {
        if (bagItems[0].shop._id === productObj?.shop?._id) {
          updateBag((prevState) => [...prevState, productObj])
          //Check groupchats on where i am an initiator

          setDialogState((prevState) => ({
            ...prevState,
            showDialog: true,
            dialogMessage: "Product added to bag",
            isError: false,
          }))
        } else {
          setConfirmDialogState((prevState) => ({
            ...prevState,
            showDialog: true,
            dialogMessage:
              "This is a different shop, existing items will be removed do you wish to continue?",
            isError: false,
          }))

          return
        }
      } else {
        updateBag((prevState) => [...prevState, productObj])
        setDialogState((prevState) => ({
          ...prevState,
          showDialog: true,
          dialogMessage: "Product added to bag",
          isError: false,
        }))
      }
    }
  }

  //COMPONENT
  const BagButton = ({ hidden = false }) => {
    return (
      <div>
        {!hidden && (
          <IconButton
            style={{
              backgroundColor: "#448cf6 !important",
              display: "hidden",
            }}
            edge="start"
            aria-label="menu"
            className="shop-nav-bag"
            onClick={() => {
              navigate("/bagpage")
            }}
          >
            <Badge badgeContent={totalAllItemCount(bagItems)} color="error">
              <LocalMallOutlinedIcon style={{ fill: "#0286FE" }} />
            </Badge>
          </IconButton>
        )}
        <ConfirmationDialog
          showDialog={confirmDialogState.showDialog}
          message={confirmDialogState.dialogMessage}
          onConfirm={() => {
            let key = generateKey(product._id, product?.size, product?.addons)

            let productObj = {
              key: key,
              ...product,
              count: 1,
            }
            updateBag([productObj])
            setConfirmDialogState((prevState) => ({
              ...prevState,
              showDialog: false,
            }))
            setDialogState((prevState) => ({
              ...prevState,
              showDialog: true,
              dialogMessage: "Product added to bag",
              isError: false,
            }))
          }}
          onDecline={() => {
            setConfirmDialogState((prevState) => ({
              ...prevState,
              showDialog: false,
            }))
          }}
        />
        <AddToBagDialog
          showDialog={dialogState.showDialog}
          message={dialogState.dialogMessage}
          onGotoBag={() => {
            setDialogState((prevState) => ({
              ...prevState,
              showDialog: false,
            }))
            navigate("/bagpage")
          }}
          onAddMoreProducts={() => {
            setDialogState((prevState) => ({
              ...prevState,
              showDialog: false,
            }))
          }}
        />
        <ProductOptionsDialog product={product} open={productOptionsDialogState.showDialog} onClose={() => {
          setProductOptionsDialogState((prev) => ({
            ...prev,
            showDialog: false
          }))
        }}
          onSubmit={(productOptions) => {
            setProductOptionsDialogState(prev => { return { ...prev, showDialog: false } })
            console.log('productOptions')
            console.log(product)
            
            let data = {
              ...product,
              price: productOptions.size?.price ? productOptions.size.price : product.price,
              size: productOptions.size?.name ? productOptions.size.name : 'Regular',
              addons: productOptions.addons
            }

            
            confirmProductToBag(data)
          }}
        />
        <ClosedShopDialog
          showDialog={closeShopDialogState.showDialog}
          message={closeShopDialogState.dialogMessage}
          onConfirm={() => {
            console.log(product)
            addToBag(product)
            setCloseShopDialogState((prevState) => ({
              ...prevState,
              showDialog: false,
            }))
          }}
          onDecline={() => {
            setCloseShopDialogState((prevState) => ({
              ...prevState,
              showDialog: false,
            }))
          }}
        />
      </div>
    )
  }

  return { addToBag, bagItems, BagButton }
}
