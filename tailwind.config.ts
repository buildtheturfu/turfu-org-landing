import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        turfu: {
          dark: '#0a0a0a',
          darker: '#050505',
          accent: '#8b5cf6',
          accent2: '#06b6d4',
          muted: '#a1a1aa',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          elevated: 'var(--surface-elevated)',
          muted: 'var(--surface-muted)',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        border: {
          DEFAULT: 'var(--border)',
          muted: 'var(--border-muted)',
        },
        overlay: {
          DEFAULT: 'var(--overlay)',
          hover: 'var(--overlay-hover)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-turfu': 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
        'gradient-turfu-hover': 'linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
