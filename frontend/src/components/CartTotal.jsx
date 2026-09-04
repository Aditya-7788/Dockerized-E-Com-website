import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)
  const amount = getCartAmount()

  return (
    <div className="w-full border border-ink/10 p-7">
      <Title text1="Order" text2="Summary" />
      <div className="flex flex-col gap-3 mt-6 text-sm">
        <div className="flex justify-between text-stone">
          <p>Subtotal</p>
          <p>{currency} {amount}.00</p>
        </div>
        <div className="flex justify-between text-stone">
          <p>Shipping</p>
          <p>{amount === 0 ? '—' : `${currency} ${delivery_fee}.00`}</p>
        </div>
        <hr className="border-ink/10 my-1" />
        <div className="flex justify-between font-display text-lg">
          <p>Total</p>
          <p>{currency} {amount === 0 ? 0 : amount + delivery_fee}.00</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
