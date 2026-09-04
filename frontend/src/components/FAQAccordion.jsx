import React, { useState } from 'react'
import { faqs } from '../data/dummyData'
import Title from './Title'

const FAQAccordion = () => {
  const [open, setOpen] = useState(0)

  return (
    <div className="py-16 sm:py-20">
      <div className="mb-10">
        <Title numeral="No. XIII — Before You Ask" text1="Frequently" text2="Asked" />
      </div>
      <div className="max-w-2xl">
        {faqs.map((item, i) => (
          <div key={item.q} className="border-b border-ink/10">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full flex items-center justify-between py-5 text-left"
            >
              <span className="font-medium text-sm sm:text-base pr-6">{item.q}</span>
              <span className={`text-gold text-xl transition-transform flex-shrink-0 ${open === i ? 'rotate-45' : ''}`}>+</span>
            </button>
            <div className={`grid transition-all duration-300 ${open === i ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`} style={{ overflow: 'hidden' }}>
              <div className="min-h-0">
                <p className="text-sm text-stone leading-relaxed pr-6">{item.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQAccordion
