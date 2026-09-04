import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])

  return (
    <div className="py-16 sm:py-20">
      <div className="mb-10">
        <Title numeral="No. II — Recently Arrived" text1="Latest" text2="Arrivals" />
        <p className="mt-4 text-sm sm:text-base text-stone max-w-md">
          Fresh into the atelier this week — considered pieces made to be worn on repeat.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
        {latestProducts.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} bestseller={item.bestseller} />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
