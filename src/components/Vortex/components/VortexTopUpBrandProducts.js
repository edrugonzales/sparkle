import React, {useState, useEffect} from "react"
import VortexTopupCard from "./VortexTopupCard"
import { Typography, Box } from "@mui/material"

const VortexTopUpBrandProducts = ({ brandProducts, selectedBrand, setSelectedProduct = () => {}, setSelectedBrand = () =>{}, stepForward  = () => {}}) => {
  let [products, set]=  useState([])

  useEffect(() => {
    set(brandProducts)
  }, [brandProducts])
    
  return (
    <Box>
      <Typography margin={2} fontFamily={"Visby"} fontSize={20} color={"gray"}>
        Select Load
      </Typography>
      <div style = {{position: 'fixed', bottom: '-100px'}}>{products.length - products.length}</div>
      {products
        .sort(
          (brand, anotherbrand) =>
            brand.pricing.price - anotherbrand.pricing.price
        )
        .map((v) => {
          console.log(v)
          return (
            <VortexTopupCard
              name={v.name}
              imageUrl={v.catalogImageURL}
              desc={v.description}
              price={v.pricing.price}
              unit={v.pricing.unit}
              key = {v.name}
              onClick={() => {
		            setSelectedProduct(v)
		            setSelectedBrand(selectedBrand)
		            stepForward(stepForward)
	      }}
            />
          )
        })}
    </Box>
  )
}

export default VortexTopUpBrandProducts
