/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        dark: '#030014',
        surface: '#0a0a1a',
        panel: '#0f0f23',
        border: '#1a1a3e',
        accent: {
          cyan: '#06b6d4',
          blue: '#3b82f6',
          violet: '#8b5cf6',
        },
        text: {
          primary: '#f0f0f8',
          secondary: '#a0a0c0',
          muted: '#5a5a80',
        },
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(6,182,212,0.15), 0 0 60px rgba(6,182,212,0.05)',
        'glow-sm': '0 0 15px rgba(6,182,212,0.12)',
        'card': '0 4px 24px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.2)',
        'card-hover': '0 20px 40px rgba(6,182,212,0.08), 0 8px 16px rgba(59,130,246,0.05)',
      },
    },
  },
  plugins: [],
}
