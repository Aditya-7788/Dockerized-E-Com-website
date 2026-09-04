import { gallery } from '../assets/assets'

// ---------- Client testimonials ----------
export const testimonials = [
  {
    id: 't1',
    name: 'Ananya Rao',
    location: 'Mumbai',
    rating: 5,
    quote: "Har piece feels like it's tailored just for me — the linen shirt I ordered fits better than anything from a fitting room.",
  },
  {
    id: 't2',
    name: 'Kabir Malhotra',
    location: 'Delhi',
    rating: 5,
    quote: 'Packaging se leke fabric quality tak, sab kuch premium lagta hai. Ye ab meri go-to wardrobe brand ban gayi hai.',
  },
  {
    id: 't3',
    name: 'Meera Iyer',
    location: 'Bengaluru',
    rating: 4,
    quote: 'The winter edit sold me instantly. Understated, well-cut, and the kind of quality you can actually feel.',
  },
  {
    id: 't4',
    name: 'Rohan Deshpande',
    location: 'Pune',
    rating: 5,
    quote: 'Customer support resolved my exchange in a day. Rare to see this level of care from an online label.',
  },
]

// ---------- Journal / editorial posts ----------
export const editorialPosts = [
  {
    id: 'e1',
    tag: 'The Atelier',
    title: 'The Quiet Art of a Well-Cut Shirt',
    excerpt: 'Inside our atelier, where every collar and cuff is finished by hand before it ever reaches a hanger.',
    image: gallery[0],
    readTime: '4 min read',
  },
  {
    id: 'e2',
    tag: 'Materials',
    title: 'Reading the Fabric: Linen vs. Cotton',
    excerpt: 'A short guide to choosing between our two signature weaves for the season ahead.',
    image: gallery[1],
    readTime: '3 min read',
  },
  {
    id: 'e3',
    tag: 'Season Notes',
    title: 'Building a Ten-Piece Autumn Wardrobe',
    excerpt: 'How to move through the season with fewer, better pieces — a Thakare edit.',
    image: gallery[2],
    readTime: '5 min read',
  },
]

// ---------- FAQs ----------
export const faqs = [
  {
    q: 'How long does delivery take?',
    a: 'Most orders are dispatched within 24-48 hours and arrive within 3-6 business days across India. Metro cities usually see delivery in 2-4 days.',
  },
  {
    q: 'What is your return & exchange policy?',
    a: 'We offer a hassle-free 7-day return and exchange window from the date of delivery, provided the piece is unworn and in its original packaging.',
  },
  {
    q: 'Do you offer international shipping?',
    a: 'Currently we ship across India only. International shipping is on our roadmap — sign up to our newsletter to be notified first.',
  },
  {
    q: 'How do I find my correct size?',
    a: 'Every product page includes a size guide with body measurements in inches and centimetres. When in between sizes, we recommend sizing up for a relaxed fit.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept all major credit/debit cards, UPI, net banking, and cash on delivery on eligible pin codes.',
  },
]

// ---------- Category showcase (roman numerals = ledger-style collection markers) ----------
export const categoryShowcase = [
  { numeral: 'I', label: 'Women', tagline: 'Tailored fluidity', image: gallery[3] },
  { numeral: 'II', label: 'Men', tagline: 'Considered essentials', image: gallery[4] },
  { numeral: 'III', label: 'Kids', tagline: 'Soft, durable, playful', image: gallery[5] },
]

// ---------- Instagram-style social strip ----------
export const socialStrip = [
  { id: 's1', image: gallery[6] },
  { id: 's2', image: gallery[7] },
  { id: 's3', image: gallery[8] },
  { id: 's4', image: gallery[9] },
  { id: 's5', image: gallery[10] },
  { id: 's6', image: gallery[11] },
]

// ---------- Review generator (deterministic per product id, since products come from the API) ----------
const reviewPool = [
  { name: 'Priya S.', text: 'Fabric quality exceeded expectations, fits true to size.' },
  { name: 'Aditya K.', text: 'Stitching aur finish top notch hai, bilkul premium boutique jaisa.' },
  { name: 'Sana W.', text: 'Colour is richer in person than the photos suggest. Loved it.' },
  { name: 'Vikram T.', text: 'Ordered a size up as suggested by the size guide — perfect fit.' },
  { name: 'Neha R.', text: 'Delivery was quick and the packaging felt genuinely luxury.' },
  { name: 'Farhan A.', text: 'This is my third piece from Thakare, consistently good quality.' },
  { name: 'Ishita M.', text: 'Slightly pricier but worth every rupee for the fabric alone.' },
  { name: 'Devansh P.', text: 'Great for layering, the cut is flattering without being tight.' },
]

const hashId = (id = '') => {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  return hash
}

export const getReviewsForProduct = (productId) => {
  const seed = hashId(String(productId))
  const count = 3 + (seed % 3) // 3-5 reviews
  const reviews = []
  for (let i = 0; i < count; i++) {
    const pick = reviewPool[(seed + i * 7) % reviewPool.length]
    reviews.push({
      id: `${productId}-r${i}`,
      name: pick.name,
      text: pick.text,
      rating: 4 + ((seed + i) % 2), // 4 or 5
      daysAgo: 3 + ((seed + i * 3) % 40),
    })
  }
  return reviews
}

export const getAverageRating = (productId) => {
  const reviews = getReviewsForProduct(productId)
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  return { avg: Math.round(avg * 10) / 10, count: reviews.length }
}

// ---------- Size guide (inches) ----------
export const sizeGuide = [
  { size: 'S', chest: '36-38', waist: '30-32', length: '27' },
  { size: 'M', chest: '39-41', waist: '33-35', length: '28' },
  { size: 'L', chest: '42-44', waist: '36-38', length: '29' },
  { size: 'XL', chest: '45-47', waist: '39-41', length: '30' },
]
