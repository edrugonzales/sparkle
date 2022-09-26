import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Dialog, Typography, IconButton } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Slider from '@material-ui/core/Slider'

const buttonStyle = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0, 0, 0),
    background: '#ffcf10',
    border: 0,
    borderRadius: 3,
    color: 'black',
    height: 35,
    padding: '0 30px',
  },
}))

const categoryButtonStyle = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
    borderRadius: '1em',
    boxShadow: '1px 2px 2px 1px grey',
    fontFamily: 'visby',
    textTransform: 'lowercase',
    fontWeight: 'bold',
  },
}))

function valuetext(priceRange) {
  return `${priceRange[0] - priceRange[1]}`
}

const ProductSearchFilterDialog = ({
  showDialog,
  onConfirm,
  onClose,
  categoriesList,
}) => {
  const buttonClass = buttonStyle()

  const categoryButton = categoryButtonStyle()

  const [selectedCategories, setselectedCategories] = useState([])

  const [priceRange, setPriceRange] = useState([5, 1000])

  const handleChange = (event, newValue) => {
    setPriceRange(newValue)
  }

  function isCategorySelected(category) {
    let result = false
    for (let index = 0; index < selectedCategories.length; index++) {
      if (category._id === selectedCategories[index]._id) {
        result = true
      }
    }

    return result
  }

  function addToSelectedCategoriesHandler(category) {
    if (isCategorySelected(category)) {
      let newList = selectedCategories.filter(
        (item) => item._id !== category._id
      )
      setselectedCategories(newList)
      return
    }

    // for (let index = 0; index < selectedCategories.length; index++) {
    //   if (category._id === selectedCategories[index]._id) {
    //     let newList = selectedCategories.filter(
    //       (item) => item._id !== category._id
    //     )

    //     setselectedCategories(newList)

    //     return
    //   }
    // }

    setselectedCategories((prevState) => [...prevState, category])
  }

  return (
    <div>
      <Dialog open={showDialog} onClose={showDialog} fullWidth onBackdropClick={() => {
                onClose()
              }}>
        <div
          style={{
            display: 'contents',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
            }}
          >
            <IconButton
              onClick={() => {
                onClose()
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          </div>
          <div
            style={{
              margin: '30px',
            }}
          >
            {categoriesList.map((category) => {
              return (
                <>
                  <Button
                    style={{
                      backgroundColor: isCategorySelected(category)
                        ? '#ffcf10'
                        : 'white',
                    }}
                    key={category._id}
                    className={categoryButton.button}
                    onClick={() => {
                      addToSelectedCategoriesHandler(category)
                    }}
                  >
                    {category.name}
                  </Button>
                </>
              )
            })}
          </div>
          <div
            style={{
              margin: '50px',
            }}
          >
            <Typography id="non-linear-slider" gutterBottom>
              {'Price ranging from ' + priceRange[0] + ' to ' + priceRange[1]}
            </Typography>
            <Slider
              value={priceRange}
              onChange={handleChange}
              min={5}
              max={1000}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              color="secondary"
            />
          </div>
          <div
            style={{
              margin: '10px',
            }}
          >
            <Button
              fullWidth
              className={buttonClass.button}
              onClick={() => {
                let category = []
                let price = priceRange

                for (
                  let index = 0;
                  index < selectedCategories.length;
                  index++
                ) {
                  category = [...category, selectedCategories[index]._id]
                }

                onConfirm({ price, category })
              }}
              color="primary"
            >
              SEARCH
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default ProductSearchFilterDialog
