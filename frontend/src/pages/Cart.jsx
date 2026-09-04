import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({ _id: items, size: item, quantity: cartItems[items][item] })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  const applyPromo = (e) => {
    e.preventDefault()
    if (promo.trim().toUpperCase() === 'ATELIER10') {
      setPromoApplied(true)
    }
  }

  return (
    <div className="pt-10 pb-24">
      <div className="mb-8">
        <Title numeral={`No. X — ${cartData.length} Item${cartData.length !== 1 ? 's' : ''}`} text1="Your" text2="Bag" />
      </div>

      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-ink/15">
          <p className="font-display text-xl mb-2">Your bag is empty</p>
          <p className="text-sm text-stone mb-6 max-w-xs">Add a piece from the collection to see it here.</p>
          <Link to="/collection" className="btn-primary">Browse the Collection</Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-14">
          <div className="flex-1">
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id)
              if (!productData) return null
              return (
                <div key={index} className="py-5 border-t border-ink/10 grid grid-cols-[3fr_1fr_auto] sm:grid-cols-[4fr_1fr_auto] items-center gap-4">
                  <Link to={`/product/${item._id}`} className="flex items-start gap-5">
                    <img className="w-20 sm:w-24 bg-ivory-dark" src={productData.image[0]} alt={productData.name} />
                    <div>
                      <p className="text-sm sm:text-base font-medium">{productData.name}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <p className="text-wine font-display">{currency}{productData.price}</p>
                        <p className="px-3 py-1 border border-ink/15 text-xs">{item.size}</p>
                      </div>
                    </div>
                  </Link>
                  <input
                    onChange={(e) => (e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value)))}
                    className="border border-ink/20 max-w-[70px] px-2 py-2 text-sm"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                  <button onClick={() => updateQuantity(item._id, item.size, 0)} aria-label="Remove" className="text-stone hover:text-wine transition-colors">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0-1 13a2 2 0 01-2 2H10a2 2 0 01-2-2L7 7" />
                    </svg>
                  </button>
                </div>
              )
            })}
            <hr className="border-ink/10" />
          </div>

          <div className="w-full lg:w-[400px] flex-shrink-0">
            <CartTotal />

            <form onSubmit={applyPromo} className="flex items-center gap-0 border border-ink/15 mt-5">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo code (try ATELIER10)"
                className="flex-1 px-4 py-3 text-sm outline-none bg-transparent"
              />
              <button type="submit" className="px-5 py-3 text-xs tracking-widest2 uppercase text-gold-dark border-l border-ink/15">Apply</button>
            </form>
            {promoApplied && <p className="text-xs text-wine mt-2">ATELIER10 applied — 10% off at checkout.</p>}

            <button onClick={() => navigate('/place-order')} className="btn-primary w-full mt-6">
              Proceed to Checkout
            </button>

            <div className="flex items-center gap-6 mt-6 text-xs text-stone">
              <span>Secure Checkout</span>
              <span>&middot;</span>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
