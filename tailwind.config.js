/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "main-dark": "#242424",
        "secondry-dark": "#2E2E2E",
        "white-muted": "#A0A3A5",
        primary: "#1864AB",
      },
    },
  },
  plugins: [],
};
