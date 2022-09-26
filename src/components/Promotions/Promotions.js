import React, { useState, useEffect } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { getBanners } from "../../api/public/storyblok"
import Carousel from "nuka-carousel"
import PromotionDialog from "../../components/Dialogs/PromotionDialog"
import PromotionLoader from "./components/PromotionLoader"
import "../../assets/css/HorizontalCardList.css"

const Promotions = () => {
  const PromotionComponentStates = Object.freeze({
    loading: 1,
    loaded: 2,
    error: 3,
  })

  const [componentState, setcomponentState] = useState(
    PromotionComponentStates.loading
  )

  const [banners, setbanners] = useState([])

  useEffect(() => {
    getBanners().then((response) => {
      setbanners(response.story.content.slide)
      setcomponentState(PromotionComponentStates.loaded)
    })
    return () => {}
  }, [])

  const [promotionDialogState, setpromotionDialogState] = useState({
    showDialog: false,
    promotion: {},
  })

  function ComponentState(state) {
    switch (state) {
      case PromotionComponentStates.loading:
        return <PromotionLoader />
      case PromotionComponentStates.loaded:
        return (
          // <Carousel
          //   autoplay={true}
          //   withoutControls={true}
          //   wrapAround={true}
          //   cellSpacing={20}
          //   cellAlign={"center"}
          //   slidesToShow={3}
          //   transitionMode={"scroll3d"}
          // >
          //   {banners.map((banner) => {
          //     return (
          //       <div key={banner._uid}>
          //         <LazyLoadImage
          //           style={{
          //             width: "100%",
          //             // height: "200px",
          //             borderRadius: "15px",
          //             objectFit: "contain",
          //           }}
          //           placeholder={<span>loading</span>}
          //           effect="blur"
          //           src={banner.image.filename}
          //           alt={banner.title}
          //           onClick={() => {
          //             if (banner.redirect) {
          //               window.location.href = banner.link
          //             } else {
          //               setpromotionDialogState((prevState) => ({
          //                 ...prevState,
          //                 showDialog: true,
          //                 promotion: banner,
          //               }))
          //             }
          //           }}
          //         />
          //       </div>
          //     )
          //   })}
          // </Carousel>
          <div className="horizontallist scrollbar-hidden">
            {banners.map((banner) => {
              return (
                <div key={banner._uid}>
                  <LazyLoadImage
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "5px",
                      margin: "10px",
                      objectFit: "cover",
                    }}
                    placeholder={<span>loading</span>}
                    effect="blur"
                    src={banner.image.filename}
                    alt={banner.title}
                    onClick={() => {
                      if (banner.redirect) {
                        window.location.href = banner.link
                      } else {
                        setpromotionDialogState((prevState) => ({
                          ...prevState,
                          showDialog: true,
                          promotion: banner,
                        }))
                      }
                    }}
                  />
                </div>
              )
            })}
          </div>
        )
      default:
        return <div>Error</div>
    }
  }

  return (
    <>
      {/* div className="PromotionBanners" */}

      <div
      // style={{
      //   transform: "scale(3)",
      //   marginTop: "60px",
      // }}
      >
        {ComponentState(componentState)}
      </div>
      <PromotionDialog
        showDialog={promotionDialogState.showDialog}
        promotion={promotionDialogState.promotion}
        onClose={() => {
          setpromotionDialogState((prevState) => ({
            ...prevState,
            showDialog: false,
          }))
        }}
      />
    </>
  )
}

export default Promotions
