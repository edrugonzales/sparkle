import Carousel from "nuka-carousel"
import React from "react"
import "../../../assets/css/shimmer.css"

const PromotionLoader = () => {
  let banners = [1, 2, 3]
  return (
    <div>
      <Carousel
        autoplay={true}
        withoutControls={true}
        wrapAround={true}
        cellSpacing={20}
      >
        {banners.map((banner) => {
          return (
            <div
              key={banner._uid}
              className="ShimmerAnimation"
              style={{
                height: "150px",
                width: "100%",
                borderRadius: "15px",
              }}
            ></div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default PromotionLoader
