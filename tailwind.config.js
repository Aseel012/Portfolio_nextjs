/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: v('--bg'),
        frame: v('--frame'),
        line: 'var(--line)',
        ink: v('--ink'),
        body: v('--body'),
        dim: v('--dim'),
        hand: v('--hand'),
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      keyframes: {
        rise: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'none' } },
        fade: { from: { opacity: 0 }, to: { opacity: 1 } },
        pop: { from: { opacity: 0, transform: 'translateY(-6px) scale(0.985)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: {
        rise: 'rise .55s cubic-bezier(.22,1,.36,1) both',
        fade: 'fade .25s ease both',
        pop: 'pop .28s cubic-bezier(.22,1,.36,1) both',
      },
    },
  },
  plugins: [],
}
