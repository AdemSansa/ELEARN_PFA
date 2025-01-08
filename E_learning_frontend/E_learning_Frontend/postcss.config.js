// postcss.config.js
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    purgecss({
      content: [
        './src/**/*.html',  // Purge HTML files
        './src/**/*.ts'     // Purge Angular component templates and styles
      ]
    })
  ]
}
