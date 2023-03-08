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
    // themes: ["fantasy", "luxury", "synthwave"],
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "luxury",
  },
};
