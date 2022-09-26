import React from "react"
import "./index.scss"
import SparkOnPlane from "../../assets/images/spark_plane.png"
import { Link } from "gatsby"

const SparkOnAir = () => {
  return (
    <Link to="/air">
      <div className="spark-on-air">
        <img src={SparkOnPlane} className="spark-on-air--image" />
        <div className="spark-on-air--card">Spark on Air</div>
      </div>
    </Link>
  )
}

export default SparkOnAir
