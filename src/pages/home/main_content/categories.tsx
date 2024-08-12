import useCategories from '../../../hooks/useCategories'

export default function Category({
  updateSelectedCategory,
  selectedCategory,
}: {
  selectedCategory: string
  updateSelectedCategory: (category: string) => void
}) {
  const { categories, isLoading } = useCategories()
  if (isLoading) {
    return <span className='loading loading-ball loading-lg mx-auto'></span>
  }
  return (
    <>
      {categories.map((category) => (
        <button
          className={`btn text-nowrap ${
            selectedCategory.includes(category.slug) &&
            'bg-gray-400 hover:bg-gray-500'
          }`}
          onClick={() => updateSelectedCategory(category.slug)}
          key={category.name}
        >
          {category.name}
        </button>
      ))}
    </>
  )
}
