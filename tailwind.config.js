/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontSize: {
        '7xl': '5rem',
      },
      lineHeight: {
        'extra-loose': '5rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
  safelist: [
    'bg-indigo-600',
    'bg-rose-600',
    'hover:bg-indigo-700',
    'hover:bg-rose-700',
    'text-rose-600',
    'bg-black/50',
    'from-indigo-50',
    'to-blue-50',
    'from-indigo-600',
    'to-blue-600',
  ],
};