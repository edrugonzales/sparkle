import React, { useState, useEffect } from "react"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faShare } from "@fortawesome/free-solid-svg-icons"
import "../ShopPage.css"

import { getLikesByShopId } from "../../../../api/public/reviews"

// import ShareUrl from "../shareUrl"

const ShopLikeDislike = ({ shopId, name }) => {
  const [likes, setlikes] = useState(0)
  const [dislikes, setdislikes] = useState(0)

  useEffect(() => {
    getLikesByShopId(shopId).then((response) => {
      if (response.status === 200) {
        response.json().then((result) => {
          setlikes(result[0].Likes >= 0 ? result[0].Likes : 0)
          setdislikes(result[0].Dislikes >= 0 ? result[0].Dislikes : 0)
        })
      }
    })
    // return () => {
    //     cleanup
    // }
  }, [])

  // const onShare = () => {
  //   let id = `${
  //     name
  //       .toLowerCase()
  //       .replace(/[^\w\s]/gi, "")
  //       .trim()
  //       .split(" ")[0]
  //   }--${shopId}`
  //   let url = `${window.location.origin}/shop/${id}`
  //
  //   ShareUrl(name, url)
  // }

  return (
    <div>
      <div className="LikeDislike">
        <div className="Like">
          <div className="margin">
            <ThumbUpIcon fontSize="small" />
          </div>
          <div>{likes}</div>
        </div>
        <div className="Dislike">
          <div className="margin">
            <ThumbDownIcon fontSize="small" />
          </div>
          <div>{dislikes}</div>
        </div>
        {/* <div className="Share">
          <div className="margin" onClick={onShare}>
            <FontAwesomeIcon icon={faShare} className="ShopShare" />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default ShopLikeDislike
