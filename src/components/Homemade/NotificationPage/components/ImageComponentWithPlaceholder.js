import React, { useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import "../../../../assets/css/shimmer.css"

const ImageComponentWithPlaceholder = ({
  src,
  alt = "notif-image",
  width = "100px",
  height = "100px",
  style,
}) => {
  const [loading, setLoading] = useState(true)
  return (
    <div
      className={loading ? "ShimmerAnimation" : ""}
      height={height}
      width={width}
      style={{
        borderRadius: "1em",
      }}
    >
      <LazyLoadImage
        src={src}
        alt={alt}
        height={height}
        width={width}
        effect="blur"
        style={style}
        afterLoad={() => {
          setLoading(false)
        }}
      />
    </div>
  )
}

export default ImageComponentWithPlaceholder
