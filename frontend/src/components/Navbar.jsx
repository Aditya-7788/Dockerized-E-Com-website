import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import AnnouncementBar from './AnnouncementBar'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/collection', label: 'Collection' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const IconButton = ({ children, onClick, badge, label }) => (
  <button onClick={onClick} aria-label={label} className="relative flex items-center justify-center w-8 h-8 group">
    {children}
    {badge > 0 && (
      <span className="absolute -top-1 -right-1 bg-wine text-ivory text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
        {badge}
      </span>
    )}
  </button>
)

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, wishlist } = useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className="sticky top-0 z-50 -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]">
      <AnnouncementBar />
      <div className="bg-ivory/95 backdrop-blur border-b border-ink/10">
        <div className="flex items-center justify-between py-4 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">

          <Link to="/" className="flex items-baseline gap-1">
            <span className="font-display text-2xl sm:text-3xl tracking-wide text-ink">ADITYA</span>
            <span className="hidden sm:inline text-[10px] tracking-widest2 uppercase text-gold self-end mb-1">Atelier</span>
          </Link>

          <ul className="hidden md:flex gap-9 text-[13px] tracking-widest2 uppercase text-ink/80 font-medium">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `relative pb-1 transition-colors hover:text-wine ${isActive ? 'text-ink' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <hr className={`nav-underline border-none h-[1.5px] bg-gold absolute left-0 -bottom-0.5 w-full ${isActive ? 'block' : 'hidden'}`} />
                  </>
                )}
              </NavLink>
            ))}
          </ul>

          <div className="flex items-center gap-4 sm:gap-5">
            <IconButton label="Search" onClick={() => { setShowSearch(true); navigate('/collection') }}>
              <svg viewBox="0 0 24 24" className="w-[19px] h-[19px]" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </IconButton>

            <IconButton label="Wishlist" badge={wishlist?.length} onClick={() => navigate('/wishlist')}>
              <svg viewBox="0 0 24 24" className="w-[19px] h-[19px]" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21s-7.5-4.8-10-9.3C.4 8.2 2 4.5 5.6 4c2.1-.3 4.1.8 5 2.6.9-1.8 2.9-2.9 5-2.6 3.6.5 5.2 4.2 3.6 7.7C19.5 16.2 12 21 12 21z" />
              </svg>
            </IconButton>

            <div className="group relative">
              <IconButton label="Account" onClick={() => (token ? null : navigate('/login'))}>
                <svg viewBox="0 0 24 24" className="w-[19px] h-[19px]" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
                </svg>
              </IconButton>
              {token && (
                <div className="group-hover:block hidden absolute right-0 pt-4 z-50">
                  <div className="flex flex-col gap-3 w-44 py-4 px-5 bg-ink text-ivory/80 shadow-luxury text-sm">
                    <p className="cursor-pointer hover:text-gold-light transition-colors">My Profile</p>
                    <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-gold-light transition-colors">Orders</p>
                    <p onClick={() => navigate('/wishlist')} className="cursor-pointer hover:text-gold-light transition-colors">Wishlist</p>
                    <p onClick={logout} className="cursor-pointer hover:text-gold-light transition-colors">Logout</p>
                  </div>
                </div>
              )}
            </div>

            <Link to="/cart">
              <IconButton label="Bag" badge={getCartCount()}>
                <svg viewBox="0 0 24 24" className="w-[19px] h-[19px]" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M6 8h12l-1 12H7L6 8z" />
                  <path d="M9 8V6a3 3 0 016 0v2" />
                </svg>
              </IconButton>
            </Link>

            <button onClick={() => setVisible(true)} className="md:hidden w-6 h-6 flex flex-col justify-center gap-[5px]" aria-label="Menu">
              <span className="block h-[1.5px] bg-ink" />
              <span className="block h-[1.5px] bg-ink" />
              <span className="block h-[1.5px] bg-ink w-2/3" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${visible ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          onClick={() => setVisible(false)}
          className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className={`absolute top-0 right-0 bottom-0 bg-ivory w-[78%] max-w-xs shadow-luxury transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col text-ink">
            <div onClick={() => setVisible(false)} className="flex items-center gap-3 p-5 cursor-pointer border-b border-ink/10 text-sm tracking-widest2 uppercase">
              <span>&larr;</span> Close
            </div>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                onClick={() => setVisible(false)}
                className="mobile-link py-4 pl-6 border-b border-ink/10 text-sm tracking-widest2 uppercase"
                to={link.to}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
