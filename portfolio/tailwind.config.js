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
        lavender: '#f8f7ff',
        surface: '#ffffff',
        panel: '#f0eeff',
        border: '#e2dff5',
        accent: {
          violet: '#7c5cfc',
          coral: '#ff6b8a',
          sky: '#38bdf8',
        },
        text: {
          primary: '#1a1340',
          secondary: '#4a4270',
          muted: '#8b84b0',
        },
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #7c5cfc 0%, #ff6b8a 50%, #38bdf8 100%)',
        'gradient-subtle': 'linear-gradient(135deg, rgba(124,92,252,0.08) 0%, rgba(255,107,138,0.08) 50%, rgba(56,189,248,0.08) 100%)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
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
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glow-violet': '0 0 30px rgba(124,92,252,0.2), 0 0 60px rgba(124,92,252,0.05)',
        'glow-sm': '0 0 15px rgba(124,92,252,0.15)',
        'card': '0 4px 24px rgba(26,19,64,0.06), 0 1px 2px rgba(26,19,64,0.04)',
        'card-hover': '0 20px 40px rgba(124,92,252,0.1), 0 8px 16px rgba(124,92,252,0.06)',
      },
    },
  },
  plugins: [],
}
