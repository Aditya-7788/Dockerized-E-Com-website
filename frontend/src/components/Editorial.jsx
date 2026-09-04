import React from 'react'
import { editorialPosts } from '../data/dummyData'

const Editorial = () => {
  return (
    <div className="py-16 sm:py-20">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <span className="eyebrow">The Journal</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mt-2">
            Notes from the <span className="italic text-wine">Atelier</span>
          </h2>
        </div>
        <span className="text-xs tracking-widest2 uppercase text-stone hidden sm:inline">03 Stories</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {editorialPosts.map((post) => (
          <article key={post.id} className="group cursor-pointer">
            <div className="overflow-hidden aspect-[4/3] mb-4">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <span className="eyebrow">{post.tag}</span>
            <h3 className="font-display text-lg sm:text-xl mt-2 mb-2 group-hover:text-wine transition-colors">{post.title}</h3>
            <p className="text-sm text-stone leading-relaxed line-clamp-2 mb-2">{post.excerpt}</p>
            <span className="text-[11px] uppercase tracking-widest2 text-gold-dark">{post.readTime}</span>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Editorial
