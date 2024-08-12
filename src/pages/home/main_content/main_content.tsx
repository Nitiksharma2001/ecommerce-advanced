import { useContext, useState } from 'react'
import ProductCard from '../../../components/ui/card/product_card'
import Toast from '../../../components/ui/toast/toast'
import { UserContext, UserContextType } from '../../../hooks/context'
import useProducts from '../../../hooks/useProducts'
import Category from './categories'
import { ProductType } from '../../../types/products'

const getLocalCategories = () => {
  const categories = localStorage.getItem('categories')
  return categories ? (JSON.parse(categories) as string[]) : []
}

export default function MainContent() {
  const { products, isLoading, isError, message } = useProducts()
  const { addToCart } = useContext(UserContext) as UserContextType
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(getLocalCategories)

  const updateSelectedCategories = (category: string) => {
    let categories = [...selectedCategories, category]
    if (selectedCategories.includes(category)) {
      categories = selectedCategories.filter((cat) => cat !== category)
    }
    localStorage.setItem('categories', JSON.stringify(categories))
    setSelectedCategories(categories)
  }

  const updateList = (products: ProductType[]) => {
    if (selectedCategories.length === 0) return products
    return products.filter((product) =>
      selectedCategories.includes(product.category)
    )
  }
  return (
    <>
      <div className='px-4 py-2 w-full gap-2 flex grow overflow-x-scroll no-scrollbar'>
        <Category
          updateSelectedCategories={updateSelectedCategories}
          selectedCategories={selectedCategories}
        />
      </div>
      <div className='flex flex-wrap justify-center gap-8 py-4'>
        {products &&
          updateList(products).map((product) => (
            <div
              className='card bg-base-100 w-80 shadow-xl cursor-pointer hover:scale-105 duration-75'
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData('product_card', JSON.stringify(product))
              }
              key={product.id}
              onDoubleClick={() => addToCart(product)}
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>
      <div className='flex items-center justify-center'>
        {isLoading && <span className='loading loading-dots loading-lg'></span>}
      </div>
      <Toast message={message} isError={isError} />
    </>
  )
}
