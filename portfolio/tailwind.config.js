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
        obsidian: '#07080d',
        surface: '#0e1017',
        panel: '#13151f',
        border: '#1e2130',
        cyan: {
          glow: '#00d4ff',
          dim: '#0099bb',
        },
        amber: {
          glow: '#ff8c42',
        },
        text: {
          primary: '#e8eaf2',
          secondary: '#8b8fa8',
          muted: '#4a4d60',
        },
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
        'hero-gradient':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,212,255,0.12) 0%, transparent 70%)',
        'glow-cyan':
          'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
      },
      backgroundSize: {
        grid: '60px 60px',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(0,212,255,0.2), 0 0 60px rgba(0,212,255,0.05)',
        'glow-sm': '0 0 15px rgba(0,212,255,0.15)',
        card: '0 4px 24px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
