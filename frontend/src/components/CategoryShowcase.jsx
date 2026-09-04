import React from 'react'
import { useNavigate } from 'react-router-dom'
import { categoryShowcase } from '../data/dummyData'

const CategoryShowcase = () => {
  const navigate = useNavigate()

  const goTo = (label) => {
    navigate('/collection', { state: { category: label } })
  }

  return (
    <div className="py-16 sm:py-20">
      <div className="mb-10 text-center">
        <span className="eyebrow">The Ledger</span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mt-2">
          Shop by <span className="italic text-wine">Collection</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {categoryShowcase.map((cat) => (
          <button
            key={cat.label}
            onClick={() => goTo(cat.label)}
            className="group relative overflow-hidden aspect-[4/5] text-left"
          >
            <img src={cat.image} alt={cat.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <div className="absolute top-5 left-5 font-display italic text-gold-light text-lg">{cat.numeral}</div>
            <div className="absolute bottom-6 left-6 right-6 text-ivory">
              <h3 className="font-display text-2xl mb-1">{cat.label}</h3>
              <p className="text-xs text-ivory/70 tracking-wide">{cat.tagline}</p>
              <span className="inline-block mt-3 text-[11px] tracking-widest2 uppercase border-b border-gold text-gold-light pb-0.5">
                Explore
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryShowcase
