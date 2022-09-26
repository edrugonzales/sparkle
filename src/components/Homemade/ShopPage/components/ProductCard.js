import React, { useContext, useState, useEffect } from "react"
import Lazyload from "react-lazyload"
import AddIcon from "@material-ui/icons/Add"
import FavoriteIcon from "@material-ui/icons/Favorite"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"
import { HomeMadeCartContext } from "../../../globalstates"
import ConfirmationDialog from "../../../Dialogs/ConfirmationDialog"
import AddToBagDialog from "../../../Dialogs/AddToBagDialog"
import ClosedShopDialog from "../../../Dialogs/ClosedShopDialog"
import InfoDialog from "../../../Dialogs/InfoDialog"


import useBag from '../../BagPage/custom_hooks/useBag'

import { navigate } from "gatsby"

import "./ProductCard.css"
import { LazyLoadImage } from "react-lazy-load-image-component"

import isShopOpen from "../../../../helpers/shop-op-checker"

import { createFavoriteHelpers, computePrice } from "../../helpers"

import firebase from "firebase/app"
// import fireBStore from "firebase/firestore";
// import 'firebase/auth';
// import 'firebase/analytics';

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

import { getUser } from "../../../../services/auth"

// const firestore = firebase.firestore();

const buttonStyle = makeStyles((theme) => ({
  regularButton: {
    margin: "5px",
    background: "#ffcf10",
    border: 0,
    borderRadius: 10,
    color: "white",
    height: 60,
    padding: "0 30px",
  },
  outlinedButton: {
    margin: "5px",
    border: "2px solid #ffcf10",
    color: "#ffcf10",
    borderRadius: 10,
    height: 60,
    padding: "0 30px",
  },
}))

const ProductCard = ({
  data,
  shopSchedule,
  favorites,
  setFavorites,
  viewMode,
  addToBag
}) => {
  //add the "count" field to data object with a value of 1
  let product = {
    ...data,
    count: 1,
  }

  // const buttonClass = buttonStyle()
  const [bagItems, updateBag] = useContext(HomeMadeCartContext)


  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    console.log(data)
    let mounted = true;

    if (mounted) {
      //compute discount here
      if (data.discount !== "0") {
        let result = 0
        if (data.discount.includes('%'))
          result = data.price * (Number(data.discount.trim().replaceAll('%', "")) / 100)
        else
          result = Number(data.discount)

        setDiscount(result)
      }
    }
    return () => {
      mounted = false
    }
  }, [])

  const [infoDialogState, setInfoDialogState] = useState({
    showDialog: false,
    dialogMessage: "Product is added to favorites.",
    isError: false,
  })
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

  const theUser = getUser()

  const favoriteHelpers = createFavoriteHelpers(favorites, setFavorites)

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



  const checkInitiatorAndAdd = async (order) => {
    const groupchatref = firebase.firestore().collection("groupchat")
    const groupchatdoc = groupchatref.where("initiated", "==", true)

    const snap = await groupchatdoc.get()
    let sasda = snap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // match if this user is initiating if yes send doc id and add orders on the array
      // get user
      // match with doc.id
      // add product via
      let gcData = doc.data()
      if (theUser.userId == gcData.initiator.userId) {
        const auth = {
          currentUser: {
            uid: theUser.userId,
            photoURL:
              "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
            username: theUser.name,
          },
        }

        const { uid, photoURL, username } = auth.currentUser
        firebase
          .firestore()
          .doc(`groupchat/${doc.id}`)
          .collection("cart")
          .add({ ...order, when: new Date() })

        firebase
          .firestore()
          .collection(`${doc.id}`)
          .add({
            text: `added ${order.name} ${order.id}x`,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            username,
            orderInitiate: "add",
          })
      }
    })
  }


  /*
  function addToBag(data) {
    console.log('add to bag in product card')
    checkInitiatorAndAdd(data)

    if (viewMode)
      return setInfoDialogState((prevState) => ({
        ...prevState,
        showDialog: true,
        dialogMessage: "Shop is not available on your area",
        isError: true,
      }))

    //Check for duplicate item
    if (isProductInTheBag(data, bagItems)) {
      setDialogState((prevState) => ({
        ...prevState,
        showDialog: true,
        dialogMessage: "Item is already in the bag",
        isError: true,
      }))

      return
    } else {
      //check if item is on the same shop

      if (bagItems.length > 0) {
        if (bagItems[0].shop._id === data.shop._id) {
          updateBag((prevState) => [...prevState, product])
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
        updateBag((prevState) => [...prevState, product])
        setDialogState((prevState) => ({
          ...prevState,
          showDialog: true,
          dialogMessage: "Product added to bag",
          isError: false,
        }))
      }
    }
  } */

  return (
    <Lazyload className="ProductCard">
      <div className="">
        <div>
          <Link
            to={viewMode ? null : "/product"}
            state={{ product: data, shopSchedule: shopSchedule }}
          >
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
                src={data.imagePrimary + "?auto=compress&w=300"}
                alt={data.name}
                width={"100%"}
              />
            </div>
          </Link>
          <div
            aria-hidden="true"
            className="AddButton"
            onClick={() => {
              if (!isShopOpen(shopSchedule)) {
                setCloseShopDialogState((prevState) => ({
                  ...prevState,
                  showDialog: true,
                  dialogMessage:
                    "You can still create the order but they will only be able to accept it once they are open",
                }))
                return
              }
              addToBag(data)
              // useAddToBag(data)
            }}
          >
            <AddIcon fontSize="small" />
          </div>
          <div className="FavButton">
            <FavoriteIcon fontSize="small" style={{ fill: "gray" }} />
          </div>
        </div>

        <div className="FavButton">
          {favoriteHelpers.isProductInFavorites(data) ? (
            <FavoriteIcon
              fontSize="small"
              style={{ fill: "red" }}
              onClick={() => favoriteHelpers.removeFavorite(data)}
            />
          ) : (
            <FavoriteIcon
              fontSize="small"
              style={{ fill: "gray" }}
              onClick={() => {
                setInfoDialogState((prevState) => ({
                  ...prevState,
                  showDialog: true,
                }))
                favoriteHelpers.addFavorite(data)
              }}
            />
          )}
        </div>
      </div>
      <div className="ProductCardDetails">
        <div className="NameAndPrice">
          <div className="ProductName">{data.name}</div>
          
          
          {discount > 0 && <div className="ProductPriceDiscounted">P{computePrice(product)}</div>}

          <div className="ProductPrice">P{computePrice(product)-discount}</div>
        </div>
        <div className="Description">{data.description}</div>
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
        <ConfirmationDialog
          showDialog={confirmDialogState.showDialog}
          message={confirmDialogState.dialogMessage}
          onConfirm={() => {
            updateBag([])
            updateBag((prevState) => [...prevState, product])
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
        <ClosedShopDialog
          showDialog={closeShopDialogState.showDialog}
          message={closeShopDialogState.dialogMessage}
          onConfirm={() => {
            addToBag(data)
          }}
          onDecline={() => {
            setCloseShopDialogState((prevState) => ({
              ...prevState,
              showDialog: false,
            }))
          }}
        />
      </div>
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
      <ConfirmationDialog
        showDialog={confirmDialogState.showDialog}
        message={confirmDialogState.dialogMessage}
        onConfirm={() => {
          updateBag([])
          updateBag((prevState) => [...prevState, product])
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
      <ClosedShopDialog
        showDialog={closeShopDialogState.showDialog}
        message={closeShopDialogState.dialogMessage}
        onConfirm={() => {
          addToBag(data)
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
      <InfoDialog
        showDialog={infoDialogState.showDialog}
        message={infoDialogState.dialogMessage}
        onConfirm={() => {
          setInfoDialogState((prevState) => ({
            ...prevState,
            showDialog: false,
          }))
        }}
      />
    </Lazyload>
  )
}

export default ProductCard