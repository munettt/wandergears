// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const tailwindcss = require("tailwindcss")

module.exports = {
  siteName: 'Wanderlust Gears',
  titleTemplate: "Wanderlust Gears - %s",
  templates: {
    Tag: '/tags/:id',
  },
  plugins: [
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: process.env.GOOGLE_ANALYTICS
      }
    }
  ],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          tailwindcss
        ],
      },
    },
  }
}
