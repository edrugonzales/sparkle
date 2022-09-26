import React from "react"
import Logo from "../../assets/svg/logos/powered-by-pldt.png"

const PoweredByPldt = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: '2em', 
        marginBottom: '2em',
        opacity: 0.5
      }}
    >
      <p id="sparkleVortexTitle">
      Sparkle Vortex
      <span id="sparkleVortexSubtitle"> powered by </span>
      </p>
      <img
        style={{
          width: "81px",
          height: "31.4px"
        }}
        src={Logo}
        alt="Spark Waving burstless"
      />
    </div>
  )
}

export default PoweredByPldt
