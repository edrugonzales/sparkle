import React from "react"

const BottomGradient = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(0deg, rgba(6,136,239,0.4374124649859944) 0%, rgba(9,186,248,0) 100%)",
        zIndex: 98,
        width: "100%",
        height: "20%",
        position: "fixed",
        bottom: 0,
        pointerEvents: "none",
      }}
    ></div>
  )
}

export default BottomGradient
