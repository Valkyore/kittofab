/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // bleu moderne
        accent: "#f97316",  // orange vif
      },
    },
  },
  plugins: [],
};