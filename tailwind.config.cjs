module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js' // 👈 Añade esta línea
  ],
  plugins: [
    require('flowbite/plugin') // 👈 Plugin de Flowbite
  ]
};