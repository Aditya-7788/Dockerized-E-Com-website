import React from 'react'
import { socialStrip } from '../data/dummyData'

const InstagramFeed = () => {
  return (
    <div className="py-16 sm:py-20">
      <div className="text-center mb-10">
        <span className="eyebrow">@ADITYA.atelier</span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mt-2">
          Worn by <span className="italic text-wine">You</span>
        </h2>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
        {socialStrip.map((post) => (
          <a
            key={post.id}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group relative aspect-square overflow-hidden"
          >
            <img src={post.image} alt="Styled by a ADITYA client" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-300 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-ivory opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5-.1-.8-.2-2 0-2.9.2-.8 1.3-5.3 1.3-5.3s-.3-.6-.3-1.6c0-1.5.9-2.6 1.9-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 2 1.6 2 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3.1 0-5 2.3-5 4.7 0 .9.3 1.5.7 2 .2.2.2.3.1.6l-.3 1c-.1.3-.3.4-.6.3-1.6-.6-2.3-2.4-2.3-4.3 0-3.2 2.7-7 8-7 4.3 0 7.1 3.1 7.1 6.4 0 4.4-2.4 7.6-6 7.6-1.2 0-2.3-.7-2.7-1.4 0 0-.6 2.5-.8 3.1-.2.9-.7 1.7-1.1 2.4 1 .3 2 .5 3.1.5 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default InstagramFeed
