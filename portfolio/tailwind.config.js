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
        dark: '#050814',
        surface: '#0a0f25',
        panel: '#111836',
        border: '#1e295a',
        accent: {
          cyan: '#06b6d4',
          blue: '#3b82f6',
          violet: '#8b5cf6',
        },
        text: {
          primary: '#f8fafc',
          secondary: '#cbd5e1',
          muted: '#64748b',
        },
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
        'gradient-subtle': 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(59,130,246,0.08) 50%, rgba(139,92,246,0.08) 100%)',
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
        'glow-cyan': '0 0 30px rgba(6,182,212,0.2), 0 0 60px rgba(6,182,212,0.05)',
        'glow-sm': '0 0 15px rgba(6,182,212,0.15)',
        'card': '0 4px 24px rgba(5,8,20,0.4), 0 1px 2px rgba(5,8,20,0.2)',
        'card-hover': '0 20px 40px rgba(6,182,212,0.1), 0 8px 16px rgba(59,130,246,0.06)',
      },
    },
  },
  plugins: [],
}
