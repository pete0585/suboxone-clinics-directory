import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1B3D7A',
          'navy-dark': '#0F2550',
          'navy-light': '#EBF0F9',
          teal: '#0EA57E',
          'teal-dark': '#0A7D5F',
          'teal-light': '#E6F7F2',
          amber: '#E8732A',
          'amber-light': '#FEF3EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
