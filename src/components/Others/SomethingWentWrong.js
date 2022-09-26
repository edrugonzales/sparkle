import React from "react"
import { Paper, Typography } from "@material-ui/core"
import SomethingWentWrongImage from "../../assets/images/something_went_wrong.png"
import { LazyLoadImage } from "react-lazy-load-image-component"
import useWindowDimensions from "../../custom-hooks/useWindowDimensions"

export const SomethingWentWrong = () => {
  const { height, width } = useWindowDimensions()

  return (
    <Paper
      style={{
        justifyContent: "center",
        textAlign: "center",
        padding: "10px",
        margin: "10px",
      }}
    >
      <LazyLoadImage
        placeholder={<span>loading</span>}
        effect="blur"
        src={SomethingWentWrongImage}
        alt="Something went wrong"
        width={width - 50}
      />
      <Typography
        style={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        SOMETHING WENT WRONG...
      </Typography>
    </Paper>
  )
}
