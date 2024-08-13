import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductType } from '../types/products'

interface ProductResponseType {
  skip: number
  products: ProductType[]
  limit: number
  total: number
}

export default function useProducts() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')

  const getProducts = ({ pageParam }: { pageParam: number }): Promise<ProductResponseType> => {
    const getUrl = `${import.meta.env.VITE_BACKEND_URL}/products${
      selectedCategory ? `/category/${selectedCategory}` : ''
    }?skip=${(pageParam - 1) * 10}&limit=10`
    return fetch(getUrl).then((res) => res.json())
  }

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
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
  
  return {
    data,
    isLoading,
    isError,
    selectedCategory,
    updateSelectedCategory,
  }
}
