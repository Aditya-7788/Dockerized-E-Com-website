/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#17130F',
          soft: '#1F1A14',
        },
        ivory: {
          DEFAULT: '#F7F2E7',
          dark: '#EFE6D3',
        },
        wine: {
          DEFAULT: '#6E2A35',
          dark: '#551F27',
          light: '#8C3A47',
        },
        gold: {
          DEFAULT: '#B08D4F',
          light: '#D8C08C',
          dark: '#8C6E38',
        },
        stone: {
          DEFAULT: '#8D8274',
          light: '#B4AB9C',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        luxury: '0 30px 70px -30px rgba(23, 19, 15, 0.35)',
        card: '0 10px 30px -12px rgba(23, 19, 15, 0.18)',
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        fadeUp: 'fadeUp 0.7s ease forwards',
        fadeIn: 'fadeIn 0.5s ease forwards',
      },
    },
  },
  plugins: [],
}
