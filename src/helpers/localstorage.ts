import type { ProductType } from '../types/products'

export function updateCart(cart: ProductType[]) {
  localStorage.setItem('cart_details', JSON.stringify(cart))
}
