module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        masala: '#8f4f3d',
        gulab: '#f6b6c9',
        haldi: '#f7d36b',
        pista: '#b8d8c0',
        jamun: '#6f5a8f',
        chai: '#fff8ee',
        rangoli: '#ef7d57',
        ink: '#302824',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 24px 70px rgba(107, 79, 62, 0.14)',
        card: '0 14px 40px rgba(92, 64, 51, 0.12)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
