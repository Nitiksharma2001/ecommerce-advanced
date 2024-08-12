import { useEffect, useState } from 'react'
import type { ProductType } from '../types/products'

export default function useProducts() {
  const [isLoading, setIsloading] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [isError, setIsError] = useState(false)
  const [products, setProducts] = useState<undefined | ProductType[]>(undefined)
  const [currentPage, setCurrentPage] = useState(1)

  const onScrollBottom = () => {
    if (
      window.scrollY + window.innerHeight + 10
      >= document.documentElement.scrollHeight
    ) {
      setCurrentPage(currentPage + 1)
    }
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsloading(true)
        setIsError(false)
        setMessage('')
        const data = (await (
          await fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/products?skip=${(currentPage - 1) * 10}&limit=10`,
          )
        ).json()).products as ProductType[]

        window.addEventListener('scroll', onScrollBottom)

        if (products) {
          setProducts([...products, ...data])
        }
        else {
          setProducts(data)
        }
      }
      catch (err) {
        setIsloading(false)
        setIsError(true)
        setMessage((err as Error).message)
      }
      finally {
        setIsloading(false)
        setIsError(false)
        setMessage('products fetched successfully')
      }
    }
    fetchProducts()

    return () => {
      setIsloading(false)
      setIsError(false)
      setMessage('')
      window.removeEventListener('scroll', onScrollBottom)
    }
  }, [currentPage])

  return {
    products,
    isLoading,
    isError,
    message,
  }
}
