/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  important: true,
  content: ["./src/**/*.{html,js,css}"],
  theme: {
    extend: {},

    colors: {
      ...colors,
      'default': '#212121',
      'default-inverse': '#FAF9F6',
      'white': '#FEFEFE',
      'secondary': '#7D838B',
      'secondary-inverse': '#D8DBE0',
      'primary': '#FFCA00',
      'brand': '#86BB40',
      'brand-dark': '#3A6638',
    },

    fontFamily: {
      body: ['Montserrat', 'sans-serif'],
      header: ['Stem', 'sans-serif'],
    },

    fontSize: {
      sm:    ['.9rem', {
        lineHeight: '1.44rem',
      }],
      base: ['1rem', {
        lineHeight: '1.6rem',
      }],
      xl: ['1.1rem', {
        lineHeight: '1.76rem',
      }],
      '2xl': ['1.5rem', {
        lineHeight: '2.1rem',
        fontWeight: '500'
      }],
      '3xl': ['2rem', {
        lineHeight: '2.4rem',
        fontWeight: '500'
      }],
      '4xl': ['2.5rem', {
        lineHeight: '3rem',
        fontWeight: 'bold'
      }],
      '5xl': ['3rem', {
        lineHeight: '3.9rem',
        fontWeight: 'bold'
      }]
    },

    plugins: [],
  }
}

