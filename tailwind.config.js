/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/**/*.html', './src/**/*.{ts,tsx,js,jsx,scss}'],
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#ffffff',
          paper: '#fbfaf7',
          soft: '#f8f6f1',
          gold: '#c9a24d',
          goldDark: '#9c7830',
          ink: '#333333',
          muted: '#666666',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 70px rgba(79, 61, 32, 0.13)',
        card: '0 18px 46px rgba(74, 57, 29, 0.07)',
        cardHover: '0 24px 58px rgba(74, 57, 29, 0.12)',
        header: '0 12px 34px rgba(65, 48, 18, 0.08)',
      },
    },
  },
  plugins: [],
}
