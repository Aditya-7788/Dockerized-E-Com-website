import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { getAverageRating } from '../data/dummyData'

const ProductItem = ({ id, image, name, price, bestseller }) => {
  const { currency, isWishlisted, toggleWishlist } = useContext(ShopContext)
  const { avg } = getAverageRating(id)
  const secondImage = image?.[1] || image?.[0]

  return (
    <div className="group relative">
      <Link onClick={() => scrollTo(0, 0)} className="block" to={`/product/${id}`}>
        <div className="relative overflow-hidden bg-ivory-dark aspect-[3/4]">
          <img
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
            src={image?.[0]}
            alt={name}
          />
          <img
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            src={secondImage}
            alt=""
          />

          {bestseller && (
            <span className="absolute top-3 left-3 bg-wine text-ivory text-[10px] tracking-widest2 uppercase px-2.5 py-1">
              Bestseller
            </span>
          )}

          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(id) }}
            aria-label="Toggle wishlist"
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-ivory/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill={isWishlisted(id) ? '#6E2A35' : 'none'}
              stroke={isWishlisted(id) ? '#6E2A35' : '#17130F'}
              strokeWidth="1.6"
            >
              <path d="M12 21s-7.5-4.8-10-9.3C.4 8.2 2 4.5 5.6 4c2.1-.3 4.1.8 5 2.6.9-1.8 2.9-2.9 5-2.6 3.6.5 5.2 4.2 3.6 7.7C19.5 16.2 12 21 12 21z" />
            </svg>
          </button>

          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-ink/90 text-ivory text-center text-[11px] tracking-widest2 uppercase py-2.5">
            View Product
          </div>
        </div>

        <div className="pt-3 pb-1 flex items-start justify-between gap-2">
          <p className="text-sm text-ink/85 leading-snug">{name}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-display text-base text-ink">{currency}{price}</p>
          <span className="flex items-center gap-1 text-[11px] text-stone">
            <svg viewBox="0 0 20 20" className="w-3 h-3" fill="#B08D4F"><path d="M10 1l2.7 6 6.6.6-5 4.4 1.5 6.5L10 15l-5.8 3.5L5.7 12 .7 7.6l6.6-.6z" /></svg>
            {avg}
          </span>
        </div>
      </Link>
    </div>
  )
}

export default ProductItem
