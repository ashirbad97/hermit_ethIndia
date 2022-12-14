/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#666aec",
      },
      fontFamily: {
        myriad: ["Myriad Pro"],
        gotham: ["Gotham Rounded"],
      },
    },
  },
  plugins: [],
};
