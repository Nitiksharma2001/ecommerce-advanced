import { useEffect, useState } from 'react'

export interface CategoryType {
  slug: string
  name: string
  url: string
}
export default function useCategories() {
  const [isLoading, setIsloading] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [isError, setIsError] = useState(false)
  const [categories, setCategories] = useState<CategoryType[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsloading(true)
        setIsError(false)
        setMessage('')
        const data = (
          await (
            await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/products/categories`
            )
          ).json()
        ) as CategoryType[]

        setCategories(data)
      } catch (err) {
        setIsloading(false)
        setIsError(true)
        setMessage((err as Error).message)
      } finally {
        setIsloading(false)
        setIsError(false)
        setMessage('categories fetched successfully')
      }
    }
    fetchProducts()
  }, [])

  return {
    categories,
    isLoading,
    isError,
    message,
  }
}
