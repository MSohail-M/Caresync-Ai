import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#050B18',
          deep: '#030810',
          card: '#0A1628',
          border: 'rgba(255,255,255,0.08)',
        },
        brand: {
          green: '#10B981',
          'green-light': '#34D399',
          'green-dark': '#059669',
          teal: '#0D9488',
          blue: '#1B6FA4',
          glow: 'rgba(16,185,129,0.15)',
        },
        green: {
          accent: '#10B981',
          glow: 'rgba(16,185,129,0.15)',
        },
      },
      animation: {
        waveform: 'waveform 0.8s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        float: 'float 4s ease-in-out infinite',
        typing: 'typing-cursor 1s ease-in-out infinite',
      },
      backdropBlur: {
        '4xl': '72px',
      },
    },
  },
  plugins: [],
}

export default config
