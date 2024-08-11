import { ImCross } from 'react-icons/im'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useContext } from 'react'
import type { UserContextType } from '../../hooks/context'
import { UserContext } from '../../hooks/context'

export default function RightSidebar() {
  const { cart, deleteFromCart } = useContext(UserContext) as UserContextType
  return (
    <>
      <ul className="text-base-content w-5/6 p-4 flex items-center gap-4 overflow-x-scroll">
        {cart.map(product => (
          <li
            className="hover:bg-base-300 flex items-center justify-center shadow-lg rounded-md cursor-pointer relative"
            key={product.id}
            draggable
          >
            <LazyLoadImage
              src={product.thumbnail}
              height={150}
              width={150}
              effect="blur"
            />
            <ImCross
              className="absolute right-0 top-0 m-2 text-red-500"
              onClick={() => deleteFromCart(product)}
            />
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center justify-center gap-2 px-8">
        <div className="font-bold flex justify-center">
          <span className="hidden xl:block text-green-500 text-2xl">
            Total:
          </span>
          <span className="text-2xl pl-2">
            $
            {cart
              .reduce(
                (agg, product) =>
                  agg + product.price * (1 - product.discountPercentage / 100),
                0,
              )
              .toFixed(2)}
          </span>
        </div>
        <button className="btn btn-accent text-xl h-auto">
          Proceed To Checkout
        </button>
      </div>
    </>
  )
}
