import { useQuery } from '@tanstack/react-query'

export interface CategoryType {
  slug: string
  name: string
  url: string
}

export default function Category({
  updateSelectedCategory,
  selectedCategory,
}: {
  selectedCategory: string
  updateSelectedCategory: (category: string) => void
}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: (): Promise<CategoryType[]> =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/products/categories`).then((res) => res.json()),
  })

  if (isLoading) {
    return <span className='loading loading-ball loading-lg mx-auto'></span>
  }

  if (isError) {
    return <>{error?.message}</>
  }

  return (
    <>
      {data?.map((category) => (
        <button
          className={`btn text-nowrap ${selectedCategory.includes(category.slug) && 'bg-gray-400 hover:bg-gray-500'}`}
          onClick={() => updateSelectedCategory(category.slug)}
          key={category.name}
        >
          {category.name}
        </button>
      ))}
    </>
  )
}
