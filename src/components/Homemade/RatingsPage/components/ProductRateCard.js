import React from 'react'
import { Paper } from '@material-ui/core'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { IconButton } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import { navigate } from 'gatsby'

const ProductRateCard = ({ product, order }) => {
  return (
    <Paper
      style={{
        borderRadius: '10px',
      }}
    >
      <LazyLoadImage
        style={{
          borderRadius: '10px 10px 0 0',
        }}
        height={'300px'}
        width={'100%'}
        placeholder={<span>loading</span>}
        effect="blur"
        src={product._id.imagePrimary}
        alt={product.name}
      />
      <div
        style={{
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 'bold',
            }}
          >
            {product.name}
          </div>
          <div>{order.shop.name}</div>
        </div>
        <div style={{ display: 'flex' }}>
          <IconButton
            onClick={(e) => {
              navigate('/submitratingspage', {
                state: {
                  product: product,
                  isLike: true,
                  order: order,
                },
              })
            }}
          >
            <ThumbUpIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              navigate('/submitratingspage', {
                state: {
                  product: product,
                  isLike: false,
                  order: order,
                },
              })
            }}
          >
            <ThumbDownIcon />
          </IconButton>
        </div>
      </div>
    </Paper>
  )
}

export default ProductRateCard
