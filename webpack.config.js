const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );

module.exports = {
  ...defaultConfig,
  entry: {
    app:['./src/js/front-end/app.js', './src/style/front-end/app.scss'],
  },
  
  optimization: {
    splitChunks: {
      cacheGroups: {
        ...defaultConfig.optimization.splitChunks.cacheGroups,
      }
    }
  }
}