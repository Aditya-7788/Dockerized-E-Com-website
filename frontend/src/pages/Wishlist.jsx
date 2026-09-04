import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { Link } from 'react-router-dom'

const Wishlist = () => {
  const { products, wishlist } = useContext(ShopContext)
  const wishedProducts = products.filter((p) => wishlist.includes(p._id))

  return (
    <div className="pt-10 pb-24 min-h-[50vh]">
      <div className="mb-10">
        <Title numeral={`No. IX — ${wishedProducts.length} Saved`} text1="Your" text2="Wishlist" />
      </div>

      {wishedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-ink/15">
          <svg viewBox="0 0 24 24" className="w-10 h-10 mb-4" fill="none" stroke="#B08D4F" strokeWidth="1.4">
            <path d="M12 21s-7.5-4.8-10-9.3C.4 8.2 2 4.5 5.6 4c2.1-.3 4.1.8 5 2.6.9-1.8 2.9-2.9 5-2.6 3.6.5 5.2 4.2 3.6 7.7C19.5 16.2 12 21 12 21z" />
          </svg>
          <p className="font-display text-xl mb-2">Nothing saved yet</p>
          <p className="text-sm text-stone mb-6 max-w-xs">
            Tap the heart icon on any piece to keep it here for later.
          </p>
          <Link to="/collection" className="btn-primary">Browse the Collection</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
          {wishedProducts.map((item) => (
            <ProductItem key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} bestseller={item.bestseller} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
