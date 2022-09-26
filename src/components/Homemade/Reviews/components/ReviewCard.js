import React from "react"
import { Avatar, Paper } from "@material-ui/core"
import { LazyLoadImage } from "react-lazy-load-image-component"

const ReviewCard = ({ review }) => {
  let createdDate = new Date(review.createdAt).toDateString()

  return (
    <div
      style={{
        margin: "5px",
      }}
    >
      <Paper
        style={{
          padding: "10px",
        }}
      >
        <div>
          <div>
            {review.user.photo ? (
              <LazyLoadImage
                style={{
                  borderRadius: "50%",
                }}
                placeholder={<span>loading</span>}
                effect="blur"
                height="50px"
                width="50px"
                src={review.user.photo}
                alt={review.user.name}
              />
            ) : (
              <Avatar
                style={{
                  backgroundColor: "#0286FE",
                }}
              >
                {review.user.name.substring(0, 2).toUpperCase()}
              </Avatar>
            )}
          </div>
          <div
            style={{
              fontSize: "0.9em",
            }}
          >
            {review.user.name} {review.isLike ? "likes" : "dislikes"}{" "}
            {review.product.name}
          </div>
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "grey",
            fontFamily: "visby",
          }}
        >
          {createdDate}
        </div>
        <div style={{ fontFamily: "visby", fontSize: "0.8em" }}>
          {review.message}
        </div>
      </Paper>
    </div>
  )
}

export default ReviewCard
