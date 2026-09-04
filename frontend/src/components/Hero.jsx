import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()

  return (
    <div className="relative flex flex-col sm:flex-row bg-ink text-ivory overflow-hidden">
      {/* Left panel */}
      <div className="w-full sm:w-1/2 flex items-center py-16 sm:py-0 px-2 sm:px-6 relative z-10">
        <div className="max-w-md animate-fadeUp">
          <div className="flex items-center gap-3 mb-6">
            <span className="eyebrow text-gold">No. VII — Autumn Atelier</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
            Quiet luxury,
            <br />
            <span className="italic text-gold-light">cut to last.</span>
          </h1>
          <p className="text-ivory/70 text-sm sm:text-base leading-relaxed mb-9 max-w-sm">
            Considered fabrics, hand-finished tailoring, and a wardrobe built to outlast the season it was made for.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/collection')} className="btn-ivory">
              Shop the Edit
            </button>
            <button onClick={() => navigate('/about')} className="text-xs tracking-widest2 uppercase text-ivory/70 hover:text-gold-light transition-colors border-b border-ivory/30 pb-1">
              Our Story
            </button>
          </div>
        </div>
      </div>

      {/* Right image */}
      <div className="w-full sm:w-1/2 relative">
        <img className="w-full h-full object-cover min-h-[320px] sm:min-h-[520px]" src={assets.hero_img} alt="ADITYA autumn atelier collection" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-ink/40 sm:to-ink/10" />
      </div>

      {/* Vertical ledger rule, desktop only */}
      <div className="hidden sm:flex absolute left-1/2 top-8 bottom-8 -translate-x-1/2 flex-col items-center z-20">
        <div className="w-px flex-1 bg-gold/40" />
        <span className="font-display italic text-gold text-xs my-3 rotate-180" style={{ writingMode: 'vertical-rl' }}>Est. Kalyan</span>
        <div className="w-px flex-1 bg-gold/40" />
      </div>
    </div>
  )
}

export default Hero
