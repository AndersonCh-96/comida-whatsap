module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
    "./components/**/*.{astro,js,jsx,ts,tsx}",
     "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js", 
  ],
  plugins: [
    require("flowbite/plugin"),
  ],
};
