import React from 'react'
import StaggeredCard from './StaggeredCard'

import './StaggeredCard.css'

const styles = {
  Small: {
    gridRowEnd: 'span 15',
  },
  Medium: {
    gridRowEnd: 'span 20',
  },
  Large: {
    gridRowEnd: 'span 30',
  },
}

const Card = ({ size }) => {
  return (
    <div
      style={{ ...styles[size] }}
      className={`cardImageCointainer${size} loading`}
    ></div>
  )
}

const Preloader = () => {
  let states = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  return (
    <div className="masonry_list">
      {states.map((state, index) => {
        return <Card key={index} size={index % 2 === 0 ? 'Large' : 'Small'} />
      })}
    </div>
  )
}

export default Preloader
