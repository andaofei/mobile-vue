// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
          css: {
            localIdentName: '[name]-[hash]',
            camelCase: 'only'
          }
        }
      }
  }