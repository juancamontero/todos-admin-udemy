'use client'
// https://tailwindcomponents.com/component/e-commerce-product-card

import Image from 'next/image'
import { IoAddCircleOutline, IoTrashOutline } from 'react-icons/io5'
import { Star } from './Star'
import { addProductToCart, removeProductFromCart } from '@/shopping-cart'
import { useRouter } from 'next/navigation'

interface Props {
  id: string
  name: string
  price: number
  rating: number
  image: string
}

export const ProductCard = ({ id, name, price, rating, image }: Props) => {
  const router = useRouter()

  const addToCart = () => {
    addProductToCart(id)
    router.refresh()
  }

  const removeFromCart = () => {
    removeProductFromCart(id)
    router.refresh()
  }
  return (
    <div className='shadow rounded-lg max-w-sm bg-gray-800 border-gray-100'>
      {/* Product Image */}
      <div className='p-2'>
        <Image
          width={500}
          height={500}
          className='rounded'
          src={image}
          alt={name}
        />
      </div>

      {/* Title */}
      <div className='px-5 pb-5'>
        <a href='#'>
          <h3 className='font-semibold text-xl tracking-tight text-white'>
            {name}
          </h3>
        </a>
        <div className='flex items-center mt-2.5 mb-5'>
          {Array(rating)
            .fill(0)
            .map((_, index) => (
              <Star key={index} />
            ))}

          {/* Rating Number */}
          <span className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>
            {rating}
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className='flex items-center justify-between'>
          <span className='text-3xl font-bold text-white'>$ {price}</span>

          <div className='flex'>
            <button
              onClick={addToCart}
              className='text-white mr-2 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
            >
              <IoAddCircleOutline size={25} />
            </button>
            <button
              onClick={removeFromCart}
              className='text-white bg-red-700 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 hover:bg-red-700 focus:ring-red-800'
            >
              <IoTrashOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
