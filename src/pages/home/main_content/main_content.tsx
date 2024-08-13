import ProductCard from '../../../components/ui/card/product_card'
import Toast from '../../../components/ui/toast/toast'
import Category from './categories'
import { useContext, useEffect, useState } from 'react'
import { UserContext, UserContextType } from '../../../hooks/context'
import { useSearchParams } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ProductType } from '../../../types/products'

interface ProductResponseType {
  skip: number
  products: ProductType[]
  limit: number
  total: number
}

export default function MainContent() {
  const { addToCart } = useContext(UserContext) as UserContextType
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')

  const getProducts = ({ pageParam }: { pageParam: number }): Promise<ProductResponseType> => {
    const getUrl = `${import.meta.env.VITE_BACKEND_URL}/products${
      selectedCategory ? `/category/${selectedCategory}` : ''
    }?skip=${(pageParam - 1) * 10}&limit=10`

    return fetch(getUrl).then((res) => res.json())
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } = useInfiniteQuery({
    queryKey: ['products', selectedCategory],
    queryFn: getProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.products.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
  })
  const updateSelectedCategory = (category: string) => {
    if (selectedCategory === category) {
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

  useEffect(() => {
    updateSearchParams()

    const onScrollBottom = () => {
      if (isFetchingNextPage) return
      if (!hasNextPage) return
      if (window.scrollY + window.innerHeight + 10 >= document.documentElement.scrollHeight) {
        fetchNextPage()
      }
    }
    window.addEventListener('scroll', onScrollBottom)

    return () => {
      window.removeEventListener('scroll', onScrollBottom)
    }
  }, [hasNextPage, isFetchingNextPage])

  return (
    <>
      <div className='px-4 py-2 w-full gap-2 flex grow overflow-x-scroll no-scrollbar'>
        <Category updateSelectedCategory={updateSelectedCategory} selectedCategory={selectedCategory} />
      </div>
      <div className='flex flex-wrap justify-center gap-8 py-4'>
        {data?.pages.map((page) =>
          page.products.map((product) => (
            <div
              className='card bg-base-100 w-80 shadow-xl cursor-pointer hover:scale-105 duration-75'
              draggable
              onDragStart={(e) => e.dataTransfer.setData('product_card', JSON.stringify(product))}
              key={product.id}
              onDoubleClick={() => addToCart(product)}
            >
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
      <div className='flex items-center justify-center'>
        {isFetchingNextPage && <span className='loading loading-dots loading-lg'></span>}
      </div>
      {!isFetchingNextPage && <Toast message={'Successfully Loaded'} isError={isError} />}
    </>
  )
}
