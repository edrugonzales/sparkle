import React, { useState, useEffect } from "react"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"
import { getLikesByProductId } from "../../../../api/public/reviews"
import "../ProductPage.css"

const ProductLikeDislike = (productId) => {
  const [likes, setlikes] = useState(0)
  const [dislikes, setdislikes] = useState(0)

  useEffect(() => {
    getLikesByProductId(productId).then((response) => {
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

  return (
    <div>
      <div className="row space-between">
        <div className="IconText">
          <ThumbUpIcon fontSize="small" />
          <div className="m-1">{likes}</div>
        </div>
        <div className="IconText">
          <ThumbDownIcon fontSize="small" />
          <div className="m-1 ">{dislikes}</div>
        </div>
      </div>
    </div>
  )
}

export default ProductLikeDislike
