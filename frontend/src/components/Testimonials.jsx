import React from 'react'
import { testimonials } from '../data/dummyData'

const Stars = ({ count }) => (
  <div className="flex gap-0.5 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 20 20" className="w-3.5 h-3.5" fill={i < count ? '#B08D4F' : '#3a352d'}>
        <path d="M10 1l2.7 6 6.6.6-5 4.4 1.5 6.5L10 15l-5.8 3.5L5.7 12 .7 7.6l6.6-.6z" />
      </svg>
    ))}
  </div>
)

const Testimonials = () => {
  return (
    <div className="bg-ink text-ivory -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-16 sm:py-20">
      <div className="text-center mb-12">
        <span className="eyebrow">In Their Words</span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mt-2">
          Clients of the <span className="italic text-gold-light">House</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {testimonials.slice(0, 3).map((t) => (
          <div key={t.id} className="border border-gold/20 p-7">
            <Stars count={t.rating} />
            <p className="font-display italic text-lg leading-relaxed mb-6 text-ivory/90">&ldquo;{t.quote}&rdquo;</p>
            <p className="text-sm text-gold-light">{t.name}</p>
            <p className="text-xs text-ivory/50">{t.location}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
