/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // safelist: [
  //   {
  //     pattern: /./, // the "." means "everything"
  //   },
  // ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["fantasy", "luxury"],
    darkTheme: "luxury",
  },
};
