import React from "react"

const Inspiration = ({ inspiration }) => {
  return (
    <div
      style={{
        margin: "10px",
        textAlign: "left",
        justifyContent: "center",
        fontFamily: 'visby', 
      }}
    >
      {inspiration.length > 0
        ? inspiration
        : "Shop didn't provide an inspiration yet"}
    </div>
  )
}

export default Inspiration
