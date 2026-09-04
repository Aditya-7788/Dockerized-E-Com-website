import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import RelatedProducts from '../components/RelatedProducts'
import RecentlyViewed from '../components/RecentlyViewed'
import { getReviewsForProduct, getAverageRating, sizeGuide } from '../data/dummyData'

const Stars = ({ value, size = 'w-3.5 h-3.5' }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 20 20" className={size} fill={i < Math.round(value) ? '#B08D4F' : '#E4DCC8'}>
        <path d="M10 1l2.7 6 6.6.6-5 4.4 1.5 6.5L10 15l-5.8 3.5L5.7 12 .7 7.6l6.6-.6z" />
      </svg>
    ))}
  </div>
)

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart, isWishlisted, toggleWishlist, addRecentlyViewed } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [tab, setTab] = useState('description')
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  useEffect(() => {
    const found = products.find((item) => item._id === productId)
    if (found) {
      setProductData(found)
      setImage(found.image[0])
      addRecentlyViewed(found._id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, products])

  if (!productData) return <div className="opacity-0" />

  const reviews = getReviewsForProduct(productData._id)
  const { avg, count } = getAverageRating(productData._id)

  return (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
      <p className="text-xs text-stone mb-6">
        <Link to="/" className="hover:text-ink">Home</Link> <span className="mx-1">/</span>
        <Link to="/collection" className="hover:text-ink">Collection</Link> <span className="mx-1">/</span>
        <span className="text-ink">{productData.name}</span>
      </p>

      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18%] w-full gap-3">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-0 flex-shrink-0 cursor-pointer border ${image === item ? 'border-gold' : 'border-transparent'}`}
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[82%] bg-ivory-dark">
            <img className="w-full h-auto" src={image} alt={productData.name} />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <span className="eyebrow">{productData.category} &middot; {productData.subCategory}</span>
          <h1 className="font-display text-3xl mt-3">{productData.name}</h1>
          <div className="flex items-center gap-2 mt-3">
            <Stars value={avg} />
            <p className="text-sm text-stone">{avg} ({count} reviews)</p>
          </div>
          <p className="mt-5 font-display text-2xl text-wine">{currency}{productData.price}</p>
          <p className="mt-5 text-stone text-sm leading-relaxed md:w-4/5">{productData.description}</p>

          <div className="flex flex-col gap-4 my-8">
            <div className="flex items-center justify-between md:w-4/5">
              <p className="text-sm font-medium">Select Size</p>
              <button onClick={() => setShowSizeGuide(true)} className="text-xs text-gold-dark underline underline-offset-2">
                Size Guide
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2.5 px-5 text-sm transition-colors ${item === size ? 'bg-ink text-ivory border-ink' : 'border-ink/25 hover:border-ink'}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => addToCart(productData._id, size)} className="btn-primary flex-1 sm:flex-none">
              Add to Bag
            </button>
            <button
              onClick={() => toggleWishlist(productData._id)}
              aria-label="Toggle wishlist"
              className="w-12 h-12 border border-ink/20 flex items-center justify-center hover:border-wine transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill={isWishlisted(productData._id) ? '#6E2A35' : 'none'} stroke={isWishlisted(productData._id) ? '#6E2A35' : '#17130F'} strokeWidth="1.6">
                <path d="M12 21s-7.5-4.8-10-9.3C.4 8.2 2 4.5 5.6 4c2.1-.3 4.1.8 5 2.6.9-1.8 2.9-2.9 5-2.6 3.6.5 5.2 4.2 3.6 7.7C19.5 16.2 12 21 12 21z" />
              </svg>
            </button>
          </div>

          <hr className="mt-8 sm:w-4/5 border-ink/10" />
          <div className="text-sm text-stone mt-5 flex flex-col gap-2">
            <p>100% original product, sourced directly from the atelier.</p>
            <p>Cash on delivery available on eligible pin codes.</p>
            <p>Easy 7-day return and exchange policy.</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-20">
        <div className="flex gap-8 border-b border-ink/10">
          {['description', `reviews (${count})`].map((label, i) => {
            const key = i === 0 ? 'description' : 'reviews'
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`pb-4 text-xs tracking-widest2 uppercase transition-colors ${tab === key ? 'text-ink border-b-2 border-gold' : 'text-stone'}`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {tab === 'description' ? (
          <div className="flex flex-col gap-4 py-8 text-sm text-stone max-w-3xl leading-relaxed">
            <p>{productData.description}</p>
            <p>Cut from carefully sourced fabric and finished by hand, this piece is designed to be worn well beyond a single season — a quiet investment for a considered wardrobe.</p>
          </div>
        ) : (
          <div className="py-8 max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <p className="font-display text-4xl">{avg}</p>
              <div>
                <Stars value={avg} size="w-4 h-4" />
                <p className="text-xs text-stone mt-1">Based on {count} reviews</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {reviews.map((r) => (
                <div key={r.id} className="border-b border-ink/10 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{r.name}</p>
                    <span className="text-xs text-stone">{r.daysAgo}d ago</span>
                  </div>
                  <Stars value={r.rating} />
                  <p className="text-sm text-stone mt-2 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      <RecentlyViewed currentId={productData._id} />

      {/* Size guide modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-ink/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowSizeGuide(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-ivory max-w-md w-full p-8 shadow-luxury">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl">Size Guide (inches)</h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-stone hover:text-ink text-xl leading-none">&times;</button>
            </div>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-ink/10 text-stone text-xs uppercase tracking-wide">
                  <th className="py-2">Size</th>
                  <th className="py-2">Chest</th>
                  <th className="py-2">Waist</th>
                  <th className="py-2">Length</th>
                </tr>
              </thead>
              <tbody>
                {sizeGuide.map((row) => (
                  <tr key={row.size} className="border-b border-ink/5">
                    <td className="py-3 font-medium">{row.size}</td>
                    <td className="py-3">{row.chest}</td>
                    <td className="py-3">{row.waist}</td>
                    <td className="py-3">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-stone mt-4">Measurements are approximate. When in doubt, size up for a relaxed fit.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Product
