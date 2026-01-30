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
          accent: 'rgb(var(--turfu-accent) / <alpha-value>)',
          accent2: 'rgb(var(--turfu-accent2) / <alpha-value>)',
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
    },
  },
  plugins: [],
};

export default config;
