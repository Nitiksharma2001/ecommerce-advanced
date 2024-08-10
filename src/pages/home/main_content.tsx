import ProductCard from '../../components/ui/card/product_card'
import Toast from '../../components/ui/card/toast/toast'
import useProducts from '../../hooks/useProducts'

export default function MainContent() {
  const { products, isLoading, isError, message } = useProducts()
  return (
    <>
      <div className='flex flex-wrap justify-center gap-8 py-4'>
        {products &&
          products.map((product) => (
            <div className='card bg-base-100 w-80 shadow-xl cursor-pointer hover:scale-105 duration-75' key={product.id}>
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
