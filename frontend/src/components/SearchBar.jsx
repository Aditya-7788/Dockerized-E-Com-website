import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setVisible(location.pathname.includes('collection'))
  }, [location])

  return showSearch && visible ? (
    <div className="bg-ivory-dark border-y border-ink/10 text-center py-5">
      <div className="inline-flex items-center justify-center border border-ink/20 bg-ivory px-5 py-3 rounded-full w-[85%] sm:w-1/2 gap-3">
        <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="#8D8274" strokeWidth="1.6">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent text-sm"
          type="text"
          placeholder="Search the collection"
        />
        <button onClick={() => setShowSearch(false)} aria-label="Close search" className="text-stone hover:text-ink">
          &times;
        </button>
      </div>
    </div>
  ) : null
}

export default SearchBar
