import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller)
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  return (
    <div className="py-16 sm:py-20">
      <div className="mb-10">
        <Title numeral="No. IV — House Favourites" text1="Best" text2="Sellers" />
        <p className="mt-4 text-sm sm:text-base text-stone max-w-md">
          The pieces our clients reach for, season after season.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
        {bestSeller.map((item, index) => (
          <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} bestseller={item.bestseller} />
        ))}
      </div>
    </div>
  )
}

export default BestSeller
