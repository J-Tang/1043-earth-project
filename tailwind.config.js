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
        // Material Design 3 颜色系统
        background: 'rgb(var(--background))',
        'on-background': 'rgb(var(--on-background))',
        surface: 'rgb(var(--surface))',
        'on-surface': 'rgb(var(--on-surface))',
        'surface-variant': 'rgb(var(--surface-variant))',
        'on-surface-variant': 'rgb(var(--on-surface-variant))',
        primary: 'rgb(var(--primary))',
        'primary-variant': 'rgb(var(--primary-variant))',
        'on-primary': 'rgb(var(--on-primary))',
        secondary: 'rgb(var(--secondary))',
        'on-secondary': 'rgb(var(--on-secondary))',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}