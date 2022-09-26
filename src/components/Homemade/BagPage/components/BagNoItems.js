import React from 'react'
import 'animate.css'
import emptybag from '../../../../assets/images/empty_cart.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const BagNoItems = () => {
  return (
    <div
      style={{
        margin: '2em',
        textAlign: 'center',
        fontFamily: 'Visby',
      }}
    >
      <LazyLoadImage
        src={emptybag}
        alt="Empty bag"
        effect="blur"
        width="200px"
      />
      <h3 className="animate__animated animate__bounce">
        YOUR BAG LOOKS EMPTY.
      </h3>
      <p>Go back and explore home-made products near you</p>
    </div>
  )
}

export default BagNoItems
