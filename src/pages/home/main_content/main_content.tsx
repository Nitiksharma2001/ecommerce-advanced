import { useContext, useEffect, useState } from 'react'
import ProductCard from '../../../components/ui/card/product_card'
import Toast from '../../../components/ui/toast/toast'
import { UserContext, UserContextType } from '../../../hooks/context'
import useProducts from '../../../hooks/useProducts'
import Category from './categories'
import { useSearchParams } from 'react-router-dom'

export default function MainContent() {
  const { products, isLoading, isError, message } = useProducts()
  const { addToCart } = useContext(UserContext) as UserContextType
  const [selectedCategory, setSelectedCategory] = useState('')

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const categoryString = searchParams.get('category') || ''
    setSelectedCategory(categoryString)
  }, [])

  useEffect(() => {
    updateSearchParams()
  }, [selectedCategory])

  const updateSelectedCategory = (category: string) => {
    if(selectedCategory === category){
      return setSelectedCategory('')
    }
    setSelectedCategory(category)
  }

  const updateSearchParams = () => {
    const joinList = []
    if (selectedCategory) {
      joinList.push('category=' + selectedCategory)
    }
    setSearchParams('?' + joinList.join('&'))
  }

  return (
    <>
      <div className='px-4 py-2 w-full gap-2 flex grow overflow-x-scroll no-scrollbar'>
        <Category
          updateSelectedCategory={updateSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </div>
      <div className='flex flex-wrap justify-center gap-8 py-4'>
        {products &&
          products.filter(product => selectedCategory === '' || product.category === selectedCategory).map((product) => (
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
