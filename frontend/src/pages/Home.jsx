import React from 'react'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import CategoryShowcase from '../components/CategoryShowcase'
import LatestCollection from '../components/LatestCollection'
import Editorial from '../components/Editorial'
import BestSeller from '../components/BestSeller'
import Testimonials from '../components/Testimonials'
import OurPolicy from '../components/OurPolicy'
import InstagramFeed from '../components/InstagramFeed'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <div className="-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]">
        <Hero />
        <Marquee />
      </div>
      <CategoryShowcase />
      <LatestCollection />
      <Editorial />
      <BestSeller />
      <Testimonials />
      <OurPolicy />
      <InstagramFeed />
      <NewsletterBox />
    </div>
  )
}

export default Home
