/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    screens: {
      'mobile': '375px',
      'desktop': '1440px'
    },
    fontFamily: {
      'default': 'Rubik'
    },
    extend: {
      backgroundImage: {
        'mobile-header': "url('../public/images/pattern-bg-mobile.png')",
        'desktop-header': "url('../public/images/pattern-bg-desktop.png')"
      },
      colors: {
        'dark-gray': 'hsl(0, 0%, 59%)',
        'very-dark-gray': 'hsl(0, 0%, 17%)'
      }
    },
  },
  plugins: [],
}

