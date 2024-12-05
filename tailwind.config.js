/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'card-flip': {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
      },
      animation: {
        'card-flip': 'card-flip 0.6s ease-in-out',
      },
      perspective: {
        '500': '500px',
      },
    },
  },
  plugins: [],
};