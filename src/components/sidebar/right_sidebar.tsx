import { ImCross } from "react-icons/im";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { UserContext, UserContextType } from '../../hooks/context'
import { useContext } from 'react'

export default function RightSidebar() {
  const { cart, deleteFromCart} = useContext(UserContext) as UserContextType
  return (
    <>
      <ul className='text-base-content w-screen p-4 flex items-center gap-4 h-full'>
        {cart.map((product) => (
          <li
            className='hover:bg-base-300 size-40 shadow-lg rounded-md cursor-pointer relative'
            key={product.id}
            draggable
          >
            <LazyLoadImage src={product.thumbnail} effect='blur' />
            <ImCross className="absolute right-0 top-0 m-2 text-red-500" onClick={() => deleteFromCart(product)}/>
          </li>
        ))}
      </ul>
    </>
  )
}
