export default function computeProductAddons(addons = []){
	let sum = 0 
	
	if(addons.length > 0) {
		for(let a  = 0; a < addons.length ;a++){
			let addon = addons[a]
			sum  = sum + addon.price
		}
	}


	return sum
}	