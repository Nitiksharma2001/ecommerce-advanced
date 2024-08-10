import React, { useEffect } from 'react'
import { LoginType } from '../types/users'
import { ProductType } from '../types/products'
import { updateCart } from '../helpers/localstorage'

export interface UserContextType {
  user: LoginType | undefined
  updateUser: (userDetails: LoginType | undefined) => void
  cart: ProductType[]
  addToCart: (product: ProductType) => void
  deleteFromCart: (product: ProductType) => void
}

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined
)
const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<LoginType | undefined>(undefined)
  const [cart, setCart] = React.useState<ProductType[]>([])

  const updateUser = (userDetails: LoginType | undefined) => {
    setUser(userDetails)
    if(userDetails){
      localStorage.setItem('user_details', JSON.stringify(userDetails))
    }
    else{
      localStorage.removeItem('user_details')
    }
  }

  const addToCart = (product: ProductType) => {
    if (cart.find((item) => item.id === product.id)) return
    updateCart([...cart, product])
    setCart([...cart, product])
  }
  const deleteFromCart = (product: ProductType) => {
    const updatedCart = cart.filter((item) => item.id !== product.id)
    setCart(updatedCart)
    updateCart(updatedCart)
  }

  useEffect(() => {
    const localUser = localStorage.getItem('user_details')
    const cartDetails = localStorage.getItem('cart_details')
    if (!localUser) {
      if (window.location.pathname !== '/signin') {
        window.history.pushState(null, '', '/signin')
        window.location.reload()
      }
    } else {
      setUser(JSON.parse(localUser))
    }

    if (cartDetails) {
      setCart(JSON.parse(cartDetails))
    }
  }, [])

  return (
    <UserContext.Provider
      value={{ user, updateUser, cart, addToCart, deleteFromCart }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
