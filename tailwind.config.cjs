/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./{components,pages,context,utils}/**/*.{js,jsx,ts,tsx}",
    "./*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-up-footer': 'slideUpFooter 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'bubble-in': 'bubbleIn 0.3s ease-out forwards',
        'kitten-float': 'kittenFloat 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        slideUpFooter: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
            '0%': { transform: 'translateY(50%)', opacity: '0.5' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bubbleIn: {
            '0%': { transform: 'scale(0.8)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
        },
        kittenFloat: {
            '0%, 100%': { transform: 'translateY(-2px)' },
            '50%': { transform: 'translateY(2px)' },
        },
        fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
        }
      },
    },
  },
  plugins: [],
}

