import React, { useContext } from "react"
import { HomeMadeCartContext } from "../../globalstates"

const TestAdd = () => {
  const [cart, addToCart] = useContext(HomeMadeCartContext)
  return (
    <>
      <div
        className="AddButton"
        onClick={() => {
          addToCart((prevState) => [...prevState, "TEST"])
        }}
      >
        ADD
      </div>
      <div>
        {cart.map((e) => (
          <div>{e}</div>
        ))}
      </div>
    </>
  )
}

export default TestAdd
