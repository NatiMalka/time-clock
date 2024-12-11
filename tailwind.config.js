/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
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
      colors: {
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
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
    'dark',
    'dark:bg-dark-800',
    'dark:text-dark-50',
  ],
};