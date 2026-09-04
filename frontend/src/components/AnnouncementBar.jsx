import React, { useEffect, useState } from 'react'

const MESSAGES = [
  'Complimentary shipping on orders above ₹2,999',
  'The Autumn Atelier Edit is now live — No. VII',
  '7-day easy returns & exchange on every order',
]

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length)
    }, 3800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-ink text-ivory text-center py-2 px-4 text-[11px] sm:text-xs tracking-widest2 uppercase font-medium">
      <span key={index} className="animate-fadeIn inline-block">
        {MESSAGES[index]}
      </span>
    </div>
  )
}

export default AnnouncementBar
