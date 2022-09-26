export function generateSizeKeyShard(size) {
	return size ? `-${size}` : ''
}


export function generateAddonsKeyShard(addons) {
	let result = ''
	addons.forEach(addon => {
		result = `${result}-${addon.name}${addon.price}`
	})

	return result
}

export function generateKey(id, size, addons){
	return `${id}${generateSizeKeyShard(size)}${generateAddonsKeyShard(addons)}`
}