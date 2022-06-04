const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: {},
    screens: {
      xs: { min: "320px", max: "425px" },
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
