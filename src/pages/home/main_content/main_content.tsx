import ProductCard from '../../../components/ui/card/product_card'
import Toast from '../../../components/ui/toast/toast'
import Category from './categories'
import { useContext } from 'react'
import { UserContext, UserContextType } from '../../../hooks/context'
import useProducts from '../../../hooks/useProducts'

export default function MainContent() {
  const { addToCart } = useContext(UserContext) as UserContextType
  const { data, isLoading, isError, selectedCategory, updateSelectedCategory } = useProducts()

  return (
    <>
      <div className='px-4 py-2 w-full gap-2 flex grow overflow-x-scroll no-scrollbar'>
        <Category updateSelectedCategory={updateSelectedCategory} selectedCategory={selectedCategory} />
      </div>
      <div className='flex flex-wrap justify-center gap-8 py-4'>
        {data?.pages.map((page) =>
          page.products.map((product) => (
            <div
              draggable
              key={product.id}
              onDoubleClick={() => addToCart(product)}
              className='card bg-base-100 w-80 shadow-xl cursor-pointer hover:scale-105 duration-75'
              onDragStart={(e) => e.dataTransfer.setData('product_card', JSON.stringify(product))}
            >
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
      <div className='flex items-center justify-center'>
        {isLoading && <span className='loading loading-dots loading-lg'></span>}
      </div>
      {!isLoading && <Toast message={'Successfully Loaded'} isError={isError} />}
    </>
  )
}
