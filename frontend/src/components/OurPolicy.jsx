import React from 'react'

const POLICIES = [
  {
    title: 'Easy Exchange',
    text: 'A hassle-free exchange policy on every piece, no questions asked.',
    icon: (
      <path d="M4 7h13l-3-3M20 17H7l3 3" />
    ),
  },
  {
    title: '7-Day Returns',
    text: 'Free returns within 7 days if it is not quite right for you.',
    icon: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
      </>
    ),
  },
  {
    title: 'Dedicated Support',
    text: 'A concierge team on call around the clock for anything you need.',
    icon: (
      <>
        <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
        <path d="M20 15a2 2 0 0 1-2 2h-1v-5h3zM4 15a2 2 0 0 0 2 2h1v-5H4z" />
      </>
    ),
  },
]

const OurPolicy = () => {
  return (
    <div className="py-16 sm:py-20 border-t border-b border-ink/10 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center">
      {POLICIES.map((p) => (
        <div key={p.title} className="flex flex-col items-center px-4">
          <div className="w-16 h-16 rounded-full border border-gold flex items-center justify-center mb-5">
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#B08D4F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              {p.icon}
            </svg>
          </div>
          <p className="font-display text-lg mb-2">{p.title}</p>
          <p className="text-sm text-stone max-w-[220px]">{p.text}</p>
        </div>
      ))}
    </div>
  )
}

export default OurPolicy
