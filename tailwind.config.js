/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-indigo-600',
    'bg-rose-600',
    'hover:bg-indigo-700',
    'hover:bg-rose-700',
  ],
};