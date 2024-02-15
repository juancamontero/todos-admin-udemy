import { WidgetItem } from '@/components'
import { products, type Product } from '@/products/data/products'
import { ItemCard } from '@/shopping-cart'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Productos en el carrito',
  description: 'Productos en el carrito',
}

interface ProductInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart: { [id: string]: number }) => {
  const productsInCart: ProductInCart[] = []
  for (const id of Object.keys(cart)) {
    const product = products.find((product) => product.id === id)
    if (product) {
      productsInCart.push({ product, quantity: cart[id] })
    }
  }

  return productsInCart
}

export default function CartPage() {
  const cookieStore = cookies()
  const cartCookie = cookieStore.get('cart')
  const cartValue =
    typeof cartCookie?.value === 'string' ? cartCookie.value : '{}'
  const cart = JSON.parse(cartValue) as { [id: string]: number }
  const productsInCart = getProductsInCart(cart)

  const totalToPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  )

  return (
    <div>
      <h1 className='text-5xl'>Products in cart</h1>
      <hr className='mb-2' />

      <div className='flex flex-col sm:flex-row gap-2 w-full'>
        <div className='flex flex-col gap-2 w-full sm:w-8/12'>
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>

        <div className='flex flex-col w-full sm:w-4/12'>
          <WidgetItem title='Total value'>
            <div className='mt-2 flex justify-center gap-4'>
              <h3 className='text-3xl font-bold text-gray-700'>$...{(totalToPay*1.15).toFixed(2)}</h3>
            </div>
            <span className='font-bold text-center text-gray-500'>
              Impuestos 15%: $...<strong>{(totalToPay*0.15).toFixed(2)}</strong>
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  )
}
