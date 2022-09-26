import React, { useState } from "react"
import Lazyload from "react-lazyload"

const StaggeredCardImage = ({ className, src, alt, width, height }) => {
  const [loaded, setLoaded] = useState(false)
  let classname = loaded ? `${className}` : `${className} loading`
  return (
    <Lazyload className = {className}>
      <img
        className={classname}
        width={width}
        height={height}
        src={src+"?auto=compress&w=300"}
        alt={alt}
        onLoad={() => {
          setLoaded(true)
        }}
      />
    </Lazyload>
  )
}

export default StaggeredCardImage
