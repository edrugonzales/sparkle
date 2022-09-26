export default function computeProductPrice(product) {
	console.log('computing product')
	let productPrice = product?.discount ? product?.discount?.includes('%') ? product.price * product.count - (product.count * (product.price * (Number(product.discount.trim().replaceAll('%', ''))) / 100)) : product.price * product.count - (product.count * product.discount) : product.price * product.count
	let productAddonsPrice = 0
	console.log(product?.discount ? 'may discount' : 'walang idscount')

	if (product?.addons) {
		product.addons.forEach(addon => {
			productAddonsPrice += addon.price
		})
	}
	return productPrice + (productAddonsPrice * product.count)
}