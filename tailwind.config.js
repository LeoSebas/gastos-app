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
        'footer':'center no-repeat url("/bg-footer.svg")'
      },
      fontFamily : {
        'fedora' : "Fredoka One, cursive"
      },
      colors : {
        "primary" : "cyan-200"
      }
    },
  },
  plugins: [],
}
