/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  plugins: [
    require('daisyui'),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', 'var(--font-dancing-script)'  ],
        mono: ['var(--font-noorehuda)'],
      },
    },
  },
  daisyui: {
    themes: [ "cupcake"],
  },
};
