/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00ffff',
        'cyber-pink': '#ff007f',
        'cyber-purple': '#8a2be2',
        'cyber-green': '#00ff41',
        'cyber-orange': '#ff6600',
        'dark-bg': '#0a0a0a',
        'dark-secondary': '#1a1a1a',
        'dark-tertiary': '#2a2a2a',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-cyber': 'pulse-cyber 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'matrix': 'matrix 20s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff',
            textShadow: '0 0 5px #00ffff'
          },
          '100%': { 
            boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
            textShadow: '0 0 10px #00ffff'
          }
        },
        'pulse-cyber': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' }
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(45deg, #00ffff, #ff007f, #8a2be2)',
        'matrix-bg': 'radial-gradient(ellipse at center, rgba(0,255,255,0.1) 0%, transparent 70%)',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'mono': ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
} 