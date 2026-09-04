import React from 'react'

const WORDS = [
  'SILK', 'CASHMERE', 'LINEN', 'MERINO WOOL', 'EGYPTIAN COTTON', 'SUEDE', 'ORGANIC DENIM', 'MULBERRY SILK',
]

const Marquee = ({ dark = true }) => {
  const items = [...WORDS, ...WORDS]

  return (
    <div className={`overflow-hidden border-y ${dark ? 'bg-ink border-gold/30' : 'bg-ivory border-ink/10'} py-4`}>
      <div className="marquee-track">
        {items.map((word, i) => (
          <span
            key={i}
            className={`flex items-center font-display italic text-sm sm:text-base tracking-wide px-6 whitespace-nowrap ${dark ? 'text-gold-light' : 'text-ink/70'}`}
          >
            {word}
            <span className={`mx-6 ${dark ? 'text-gold/50' : 'text-ink/20'}`}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
