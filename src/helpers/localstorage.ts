import { ProductType } from '../types/products'

export const updateCart = (cart: ProductType[]) => {
  localStorage.setItem('cart_details', JSON.stringify(cart))
}
