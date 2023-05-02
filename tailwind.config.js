/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  cssFiles: [],
  theme: {
    extend: {
      zIndex: {
        1000: "1000",
      },
      boxShadow: {
        "info-box": "0px 0px 10px 4px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        primary: ["var(--main-font)", ...fontFamily.sans],
        secondary: ["var(--secondary-font)", ...fontFamily.serif],
        lead: ["var(--lead-font)", ...fontFamily.serif],
      },
      colors: {
        "green-550": "#2bb65e",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/forms")],
};
