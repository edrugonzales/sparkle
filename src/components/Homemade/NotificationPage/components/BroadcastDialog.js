import React, { useEffect } from 'react'
import { Dialog, DialogTitle } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const BroadcastDialog = ({ notifToView, onClose }) => {
	return <Dialog open={notifToView?._id ? true : false} fullWidth onBackdropClick={onClose}>
		<IconButton aria-label="close" onClick={onClose} style={{
			position: 'absolute',
			right: 1, 
			top: 0
		}}>
			<CloseIcon />
		</IconButton>
		<p>
			{notifToView?.body}
		</p>
		<LazyLoadImage
			src={notifToView?.images ? notifToView.images[0].url : ''}
			alt="notif-image"
			height={"100%"}
			width={"100%"}
			effect="blur"
			style={{
				borderRadius: "10px",
				objectFit: "cover",
			}}
		/>
	</Dialog>
}

export default BroadcastDialog