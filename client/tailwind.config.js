/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#effaf5',
          100: '#d7f3e5',
          200: '#b1e6cd',
          300: '#7fd2af',
          400: '#4ab88e',
          500: '#259c73',
          600: '#157d5c',
          700: '#0f6349',
          800: '#0d4f3b',
          900: '#0a3f30',
          950: '#052419',
        },
        gold: {
          50: '#fcf8ea',
          100: '#f8efc9',
          200: '#f1de97',
          300: '#e8c85f',
          400: '#dfb236',
          500: '#c9971f',
          600: '#a97616',
          700: '#8a5a15',
        },
        ink: '#0b2a20',
      },
      fontFamily: {
        sans: ['"Hind Siliguri"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,63,48,0.04), 0 8px 24px rgba(10,63,48,0.06)',
        lift: '0 2px 4px rgba(10,63,48,0.06), 0 16px 36px rgba(10,63,48,0.12)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0,-14px,0) rotate(6deg)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        drift: 'drift 14s ease-in-out infinite',
        'drift-slow': 'drift 22s ease-in-out infinite',
        rise: 'rise .6s ease-out both',
      },
    },
  },
  plugins: [],
};
