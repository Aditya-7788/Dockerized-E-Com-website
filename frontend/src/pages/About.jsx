import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const STATS = [
  { value: '2019', label: 'Founded in Kalyan' },
  { value: '52+', label: 'Pieces in rotation' },
  { value: '7-Day', label: 'Easy exchange' },
  { value: '100%', label: 'Original fabrics' },
]

const VALUES = [
  { title: 'Quality Assurance', text: 'Every piece is vetted against a stringent internal quality standard before it ever reaches a hanger.' },
  { title: 'Considered Convenience', text: 'A calm, uncluttered shopping experience — from browsing to delivery and beyond.' },
  { title: 'Genuine Care', text: 'A dedicated team that treats every order, exchange, and question as its own.' },
]

const About = () => {
  return (
    <div className="pb-10">
      <div className="pt-10 mb-10">
        <Title numeral="No. XI — Our Story" text1="About" text2="ADITYA" />
      </div>

      <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
        <img className="w-full md:max-w-[440px] shadow-luxury" src={assets.about_img} alt="ADITYA atelier" />
        <div className="flex flex-col gap-6 md:w-1/2 text-stone leading-relaxed">
          <p className="font-display italic text-2xl text-ink">
            "We started ADITYA with one belief — clothes should be made to last, not to be replaced."
          </p>
          <p>
            ADITYA began as a small tailoring bench in Kalyan and grew into a considered clothing atelier,
            sourcing honest fabrics and cutting each piece with a fit that holds up to daily life.
          </p>
          <p>
            Every collection is kept deliberately small — fewer pieces, made better, and worn for years
            rather than a single season.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 border-y border-ink/10 py-12 mb-24 text-center">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="font-display text-3xl sm:text-4xl text-wine mb-2">{s.value}</p>
            <p className="text-xs sm:text-sm text-stone tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <Title numeral="No. XII — Why It Matters" text1="Why" text2="Choose Us" center />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {VALUES.map((v) => (
          <div key={v.title} className="border border-ink/10 px-8 py-10 flex flex-col gap-4">
            <span className="w-10 h-10 rounded-full border border-gold flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
            </span>
            <b className="font-display text-lg">{v.title}</b>
            <p className="text-stone text-sm leading-relaxed">{v.text}</p>
          </div>
        ))}
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About
