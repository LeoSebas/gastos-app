/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'userphoto' : 'center no-repeat url("/user-photo.png")',
        'maindescription':'center no-repeat url("/bg-main-description.svg")'
      }
    },
  },
  plugins: [],
}
