import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import FAQAccordion from '../components/FAQAccordion'

const Contact = () => {
  return (
    <div className="pb-10">
      <div className="pt-10 mb-10">
        <Title numeral="No. XIV — Reach Us" text1="Contact" text2="Us" />
      </div>

      <div className="flex flex-col md:flex-row gap-14 mb-16">
        <img className="w-full md:max-w-[460px] shadow-luxury" src={assets.contact_img} alt="ADITYA store" />
        <div className="flex flex-col justify-center gap-6">
          <div>
            <p className="eyebrow mb-3">Our Store</p>
            <p className="text-stone text-sm leading-relaxed">
              ADITYA Atelier<br />
              Shop No. 102, City Centre<br />
              Near Shivaji Chowk, Kalyan West<br />
              Kalyan, Maharashtra — 421301
            </p>
          </div>
          <div>
            <p className="text-stone text-sm">Tel: +91 98765 43210</p>
            <p className="text-stone text-sm">Email: contact@ADITYA.com</p>
          </div>
          <div>
            <p className="eyebrow mb-3">Careers at ADITYA</p>
            <p className="text-stone text-sm mb-4">Learn more about our teams and open roles.</p>
            <button className="btn-outline">Explore Openings</button>
          </div>
        </div>
      </div>

      <FAQAccordion />
      <NewsletterBox />
    </div>
  )
}

export default Contact
