import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const CATEGORIES = ['Men', 'Women', 'Kids']
const SUBCATEGORIES = ['Topwear', 'Bottomwear', 'Winterwear']

const FilterGroup = ({ title, options, active, onToggle }) => (
  <div className="py-6 border-b border-ink/10">
    <p className="eyebrow mb-4">{title}</p>
    <div className="flex flex-col gap-3 text-sm text-ink/75">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
          <span className={`w-4 h-4 border flex items-center justify-center transition-colors ${active.includes(opt) ? 'bg-ink border-ink' : 'border-ink/30 group-hover:border-ink'}`}>
            {active.includes(opt) && <span className="w-1.5 h-1.5 bg-gold-light" />}
          </span>
          <input type="checkbox" value={opt} checked={active.includes(opt)} onChange={onToggle} className="hidden" />
          {opt}
        </label>
      ))}
    </div>
  </div>
)

const Collection = () => {
  const location = useLocation()
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState(location.state?.category ? [location.state.category] : [])
  const [subCategory, setSubCategory] = useState([])
  const [maxPrice, setMaxPrice] = useState(10000)
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    setCategory((prev) =>
      prev.includes(e.target.value) ? prev.filter((i) => i !== e.target.value) : [...prev, e.target.value]
    )
  }

  const toggleSubCategory = (e) => {
    setSubCategory((prev) =>
      prev.includes(e.target.value) ? prev.filter((i) => i !== e.target.value) : [...prev, e.target.value]
    )
  }

  const clearAll = () => {
    setCategory([])
    setSubCategory([])
    setMaxPrice(10000)
  }

  const applyFilter = () => {
    let productsCopy = products.slice()

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory))
    }
    productsCopy = productsCopy.filter((item) => item.price <= maxPrice)

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice()
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price))
        break
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price))
        break
      default:
        applyFilter()
        break
    }
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch, products, maxPrice])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  const activeChips = [...category, ...subCategory]

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 pt-10">
      {/* Filter sidebar */}
      <div className="min-w-[240px]">
        <button onClick={() => setShowFilter(!showFilter)} className="w-full flex items-center justify-between py-3 sm:hidden border-b border-ink/10">
          <span className="eyebrow">Filters</span>
          <span className={`transition-transform ${showFilter ? 'rotate-180' : ''}`}>&darr;</span>
        </button>

        <div className={`${showFilter ? 'block' : 'hidden'} sm:block`}>
          <FilterGroup title="Category" options={CATEGORIES} active={category} onToggle={toggleCategory} />
          <FilterGroup title="Type" options={SUBCATEGORIES} active={subCategory} onToggle={toggleSubCategory} />

          <div className="py-6 border-b border-ink/10 sm:border-b-0">
            <p className="eyebrow mb-4">Max Price</p>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-gold"
            />
            <p className="text-sm text-stone mt-2">Up to ₹{maxPrice}</p>
          </div>

          {activeChips.length > 0 && (
            <button onClick={clearAll} className="text-xs tracking-widest2 uppercase text-wine mt-4 hover:underline">
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Product grid */}
      <div className="flex-1">
        <div className="flex justify-between items-end mb-6 flex-wrap gap-4">
          <Title numeral="No. V — Full Catalogue" text1="All" text2="Collections" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-ink/20 bg-transparent text-xs tracking-widest2 uppercase px-4 py-3"
          >
            <option value="relavent">Sort: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {activeChips.map((chip) => (
              <span key={chip} className="text-[11px] tracking-wide uppercase bg-ivory-dark border border-ink/10 px-3 py-1.5">
                {chip}
              </span>
            ))}
          </div>
        )}

        {filterProducts.length === 0 ? (
          <div className="py-24 text-center text-stone">
            <p className="font-display text-xl mb-2">No pieces match these filters</p>
            <p className="text-sm">Try widening your search or clearing a filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} bestseller={item.bestseller} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection
