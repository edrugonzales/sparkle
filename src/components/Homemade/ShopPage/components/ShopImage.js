import React from 'react'
import Lazyload from 'react-lazyload'

const ShopImage = ({src, alt, className}) => {
	return  <Lazyload className = {className} placeholder = {<div>test image loader</div>}><img className = {className} src = {src} alt = {alt}/></Lazyload> 
}

export default ShopImage