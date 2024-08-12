import { LazyLoadImage } from 'react-lazy-load-image-component'
import type { ProductType } from '../../../types/products'
import { IoIosAddCircleOutline } from 'react-icons/io'

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <>
      <figure className='size-[300px]'>
        <LazyLoadImage effect='blur' src={product.thumbnail} />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{product.title}</h2>
        <p>
          {product.description.substring(0, 70)}
          ....
        </p>

        <div className='flex items-end'>
          <span className='text-green-500 font-bold text-xl'>
            $
            {Math.round(
              product.price * (1 - product.discountPercentage / 100) * 100
            ) / 100}
          </span>
          <span className='line-through px-2 text-red-500'>
            ${product.price}
          </span>
        </div>
        <div className='card-actions justify-end'>
          {product.tags?.map((tag, index) => (
            <div className='badge badge-outline' key={index}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
