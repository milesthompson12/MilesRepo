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
        'cu-gold': '#CFB227',
        'cu-black': '#000000',
        'cu-dark': '#1a1a1a',
        'cu-gray': '#2a2a2a',
      },
    },
  },
  plugins: [],
}
export default config
