import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RecentlyViewed = ({ currentId }) => {
  const { products, recentlyViewed } = useContext(ShopContext)
  const items = recentlyViewed
    .filter((id) => id !== currentId)
    .map((id) => products.find((p) => p._id === id))
    .filter(Boolean)
    .slice(0, 5)

  if (items.length === 0) return null

  return (
    <div className="py-16 sm:py-20 border-t border-ink/10 mt-10">
      <div className="mb-8">
        <Title numeral="No. VIII — Your Trail" text1="Recently" text2="Viewed" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-10">
        {items.map((item) => (
          <ProductItem key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} bestseller={item.bestseller} />
        ))}
      </div>
    </div>
  )
}

export default RecentlyViewed
