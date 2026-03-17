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
        ink: {
          DEFAULT: 'var(--ink)',
          secondary: 'var(--ink-secondary)',
          tertiary: 'var(--ink-tertiary)',
        },
        paper: {
          DEFAULT: 'var(--paper)',
          warm: 'var(--paper-warm)',
          depth: 'var(--paper-depth)',
        },
        border: { DEFAULT: 'var(--border)' },
        layer: {
          0: { DEFAULT: 'var(--layer-0)', light: 'var(--layer-0-light)' },
          1: { DEFAULT: 'var(--layer-1)', light: 'var(--layer-1-light)' },
          2: { DEFAULT: 'var(--layer-2)', light: 'var(--layer-2-light)' },
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          light: 'var(--accent-light)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-1': ['3rem', { lineHeight: '1.1' }],
        'display-2': ['2rem', { lineHeight: '1.2' }],
        'heading-3': ['1.5rem', { lineHeight: '1.3' }],
        'heading-4': ['1.25rem', { lineHeight: '1.4' }],
        body: ['1.0625rem', { lineHeight: '1.7' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }],
        caption: ['0.8125rem', { lineHeight: '1.5' }],
        code: ['0.875rem', { lineHeight: '1.6' }],
      },
      maxWidth: {
        prose: '720px',
        layout: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
