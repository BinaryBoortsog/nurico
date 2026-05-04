import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F6F5F2',
        foreground: '#1A1A1A',
        primary: {
          DEFAULT: '#DA2935',
          light: '#FDECED',
          dark: '#B01F2A',
          soft: '#F5A0A5',
          mid: '#E85C66',
        },
        secondary: '#1A1A1A',
        muted: {
          DEFAULT: '#757575',
          foreground: '#757575',
        },
        border: '#E8E6E1',
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A',
        },
        input: '#FFFFFF',
        navy: '#1A1A1A',
        'navy-deep': '#111111',
        teal: '#2A7A5A',
        'teal-light': '#E8F5EF',
        coral: '#DA2935',
        'coral-light': '#FDECED',
        amber: '#B07020',
        'amber-light': '#FFF3E0',
      },
    },
  },
  plugins: [],
}

export default config
