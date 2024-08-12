import useCategories from '../../../hooks/useCategories'

export default function Category({
  updateSelectedCategories,
  selectedCategories,
}: {
  selectedCategories: string[]
  updateSelectedCategories: (category: string) => void
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
            selectedCategories.includes(category.slug) &&
            'bg-gray-400 hover:bg-gray-500'
          }`}
          onClick={() => updateSelectedCategories(category.slug)}
          key={category.name}
        >
          {category.name}
        </button>
      ))}
    </>
  )
}
