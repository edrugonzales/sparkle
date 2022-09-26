import React, { useState, useEffect, useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});


const ProductSizes = ({ sizes = [], onChange = () => { } }) => {

	const selectSize = (e) => {
		onChange(e.target.value)
	}

	return <> {
		sizes.length > 0 && <><Typography style={{ fontWeight: 'bold', marginTop: '0.5em' }}>Size</Typography>
			<RadioGroup
				aria-labelledby="demo-radio-buttons-group-label"
				name="radio-buttons-group"
				style={{
					width: '100%'
				}}
				onChange={selectSize}
			>
				{sizes?.map(({ name, price }) => <div style={{
					display: 'flex',
					justifyContent: 'space-between'
				}}><FormControlLabel style={{
				}} value={name} control={<Radio />} label={<div style={{
				}} ><div >{name}</div></div>} /> <div style={{
					padding: '1em'
				}}>{price}</div></div>)}
				<Divider />
			</RadioGroup> </>
	}</>
}

const ProductAddons = ({ addons = [], onChange = () => { } }) => {

	const selectAddon = (e) => {
		onChange(e.target.checked, e.target.value)
	}

	return <>  {
		addons.length > 0 && <> <Typography style={{ fontWeight: 'bold', marginTop: '0.5em' }}>Addons</Typography>
			{addons?.map(({ name, price }) => <div style={{
				display: 'flex',
				justifyContent: 'space-between'
			}}><FormControlLabel control={<Checkbox value={`${name}-${price}`} onChange={selectAddon} />} label={<div style={{
				width: '200%',
				display: 'flex',
				justifyContent: 'space-between'
			}} ><div>{name}</div> </div>} /> <div style={{ padding: '1em' }}>{price}</div></div>)} </>
	} </>
}

export default React.forwardRef(function AlertDialogSlide({ open, product, onClose, onSubmit }, ref) {

	const [selectedSize, setSelectedSize] = useState(null)
	const [selectedAddons, setSelectedAddons] = useState([])



	useEffect(() => {
		console.log(selectedSize, selectedAddons)
	}, [selectedSize, selectedAddons])

	const submitSelection = () => {
		onSubmit({
			size: selectedSize,
			addons: selectedAddons
		})
	}

	const onSelectSize = (size) => {
		console.log(`size selected ${size}`)
		setSelectedSize(product.sizes.find(({ name }) => name === size))
	}

	const onSelectAddons = (status, addon) => {

		if (status) {
			console.log(`addon selected ${addon}`)
			setSelectedAddons((prev) =>
				[
					...prev,
					product.addons.find(({ name }) => name === addon.split('-')[0])]
			)
		} else {
			console.log('removing')
			let index = selectedAddons.findIndex(({ name, price }) => name === addon.split('-')[0] && price === Number(addon.split('-')[1]))

			//remove to the array
			setSelectedAddons((prev) => [
				...prev.slice(0, index), ...prev.slice(index + 1, prev.length)
			])
		}
	}
	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={onClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
				fullWidth
			>
				<DialogTitle id="alert-dialog-slide-title">Pick your size and add-ons!</DialogTitle>
				<DialogContent style={{
					padding: '0.5em'
				}}>
					<FormControl style={{ width: '100%' }}>
						<ProductSizes sizes={product?.sizes} onChange={onSelectSize} />
						<ProductAddons addons={product?.addons} onChange={onSelectAddons} />
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={submitSelection}
						disabled={selectedSize === null && selectedAddons.length === 0 ? true : false}
						style={{
							margin: 0,
							background: selectedSize === null && selectedAddons.length === 0 ? 'white' : '#ffcf10',
							border: 0,
							borderRadius: '0.5em',
							height: 50,
							color: selectedSize === null  && selectedAddons.length === 0 ? 'grey' : 'black',
							padding: '0 30px',
							'&:hover': {
								color: '#fff',
							},
							width: '100%',
							fontWeight: 'bold',
							fontSize: "1em"
						}}>Add to Bag</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
})