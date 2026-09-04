import React from 'react'

const Title = ({ text1, text2, numeral, center = false, dark = false }) => {
  return (
    <div className={`flex flex-col ${center ? 'items-center text-center' : ''}`}>
      {numeral && <span className="eyebrow mb-2">{numeral}</span>}
      <div className={`flex items-center gap-4 ${center ? 'justify-center' : ''}`}>
        {!center && <span className={`w-8 h-px ${dark ? 'bg-gold' : 'bg-gold'}`} />}
        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl ${dark ? 'text-ivory' : 'text-ink'}`}>
          {text1} <span className={`italic ${dark ? 'text-gold-light' : 'text-wine'}`}>{text2}</span>
        </h2>
        {center && <span className="w-8 h-px bg-gold" />}
      </div>
    </div>
  )
}

export default Title
