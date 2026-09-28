/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        court: {
          dark: '#070b14',
          navy: '#0b132b',
          surface: '#12192c',
          card: '#162036',
          border: '#243252',
          mahogany: '#1c120c',
          wood: '#2c1b14',
          gold: '#d4af37',
          goldLight: '#f5d77f',
          goldDark: '#b8860b',
          crimson: '#8b0000',
          emerald: '#059669',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      backgroundImage: {
        'court-pattern': "radial-gradient(ellipse at top, rgba(212, 175, 55, 0.15), transparent 70%), radial-gradient(ellipse at bottom, rgba(11, 19, 43, 0.8), #070b14)",
        'gold-gradient': "linear-gradient(135deg, #f5d77f 0%, #d4af37 50%, #b8860b 100%)",
        'mahogany-gradient': "linear-gradient(180deg, #2c1b14 0%, #1a100c 100%)",
        'glass-card': "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.3)',
        'court-depth': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gavel-strike': 'gavelStrike 0.35s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        gavelStrike: {
          '0%': { transform: 'rotate(-45deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '70%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
