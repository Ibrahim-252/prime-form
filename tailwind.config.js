/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:   '#1a1a1a',
        accent:    '#ff6b35',
        secondary: '#004e89',
        surface:   '#111111',
        muted:     '#888888',
        light:     '#f5f2ee',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
