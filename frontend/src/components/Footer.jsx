import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const SocialIcon = ({ path }) => (
  <a href="#" onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors group">
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gold-light group-hover:fill-ink transition-colors">
      <path d={path} />
    </svg>
  </a>
)

const Footer = () => {
  return (
    <div className="bg-ink text-ivory/70 -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-20 sm:mt-32">
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1.2fr] gap-12 py-16">
        <div>
          <Link to="/" className="font-display text-3xl text-ivory">ADITYA</Link>
          <p className="mt-5 text-sm leading-relaxed max-w-sm">
            ADITYA is a small-batch clothing atelier crafting considered wardrobes from honest materials —
            designed in Kalyan, worn everywhere.
          </p>
          <div className="flex gap-3 mt-6">
            <SocialIcon path="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.4 2.9h-2.4v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z" />
            <SocialIcon path="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.3-3.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
            <SocialIcon path="M22 5.9c-.7.3-1.5.6-2.4.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.8A11.7 11.7 0 0 1 3.2 4.6a4.2 4.2 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.7 3.3 4.1-.6.1-1.2.2-1.8.1.5 1.7 2.1 2.9 4 2.9A8.3 8.3 0 0 1 2 18.6a11.7 11.7 0 0 0 6.3 1.8c7.6 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.3z" />
          </div>
        </div>

        <div>
          <p className="eyebrow mb-5 text-ivory/80">Company</p>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link to="/" className="hover:text-gold-light transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-gold-light transition-colors">About Us</Link></li>
            <li><Link to="/collection" className="hover:text-gold-light transition-colors">Collections</Link></li>
            <li><Link to="/contact" className="hover:text-gold-light transition-colors">Careers</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5 text-ivory/80">Support</p>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link to="/contact" className="hover:text-gold-light transition-colors">Contact Us</Link></li>
            <li><Link to="/orders" className="hover:text-gold-light transition-colors">Track Order</Link></li>
            <li className="hover:text-gold-light transition-colors cursor-pointer">Delivery Info</li>
            <li className="hover:text-gold-light transition-colors cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5 text-ivory/80">Get in Touch</p>
          <ul className="flex flex-col gap-3 text-sm">
            <li>Shop No. 102, City Centre, Near Shivaji Chowk, Kalyan West, Maharashtra 421301</li>
            <li>+91 98765 43210</li>
            <li>contact@ADITYA.com</li>
          </ul>
          <div className="flex gap-3 mt-5 opacity-70">
            <img src={assets.razorpay_logo} className="h-5" alt="Razorpay" />
            <img src={assets.stripe_logo} className="h-5" alt="Stripe" />
          </div>
        </div>
      </div>

      <div className="border-t border-gold/15">
        <p className="py-6 text-xs text-center text-ivory/40 tracking-wide">
          &copy; {new Date().getFullYear()} ADITYA Atelier. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
