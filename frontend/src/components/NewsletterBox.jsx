import React, { useState } from 'react'
import { toast } from 'react-toastify'

const NewsletterBox = () => {
  const [email, setEmail] = useState('')

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (!email) return
    toast.success('Welcome to the house list — check your inbox for 20% off.')
    setEmail('')
  }

  return (
    <div className="bg-ink text-ivory -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-16 sm:py-20 text-center relative overflow-hidden">
      <div className="relative z-10 max-w-lg mx-auto">
        <span className="eyebrow">The House List</span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mt-3 mb-4">
          Subscribe & receive <span className="italic text-gold-light">20% off</span>
        </h2>
        <p className="text-ivory/60 text-sm mb-8">
          First look at new arrivals, atelier notes, and members-only edits — no spam, unsubscribe anytime.
        </p>
        <form onSubmit={onSubmitHandler} className="flex items-center gap-0 border border-gold/40 max-w-md mx-auto">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent px-4 py-4 text-sm outline-none placeholder:text-ivory/40"
            type="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit" className="bg-gold text-ink text-xs tracking-widest2 uppercase font-semibold px-6 py-4 whitespace-nowrap hover:bg-gold-light transition-colors">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewsletterBox
