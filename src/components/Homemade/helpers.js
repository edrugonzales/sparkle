function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
  
export function setToLocalStorage(key, data) {
    return localStorage.setItem(key, JSON.stringify(data))
}
  
export const favoriteProductsStorageKey = "favorites_products"

export function getAllFavoriteProducts() {
    return getFromLocalStorage(favoriteProductsStorageKey) || []
  }

export function createFavoriteHelpers(favorites, setFavorites) {

  function addFavorite(product) {
    const isProductAlreadyFavorite = isProductInFavorites(product);

    if (isProductAlreadyFavorite) return;

    const newFavoriteProducts = [...favorites, product];

    setFavorites(newFavoriteProducts);
    setToLocalStorage(favoriteProductsStorageKey, newFavoriteProducts);
  }

  function removeFavorite(product) {
    const newFavoriteProducts = favorites.filter(
      (iteratedProduct) => iteratedProduct._id !== product._id
    );

    setFavorites(newFavoriteProducts);
    setToLocalStorage(favoriteProductsStorageKey, newFavoriteProducts);
  }

  function isProductInFavorites(product) {
    return favorites.some(
      (iteratedProduct) => iteratedProduct._id === product._id
    );
  }

  return {
    addFavorite,
    removeFavorite,
    isProductInFavorites,
  };
}


export function computePrice(product){
  let sizes = product.sizes.sort((a ,b) => a.price - b.price )
  if(sizes.length > 0)
    return sizes[0].price


  return product.price
}