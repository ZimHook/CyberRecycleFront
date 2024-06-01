const path = require('path');

module.exports = {
  webpack: function(config, env) {
    config.resolve.alias = {
      '@': path.resolve('src'),
    };
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
    config.ignoreWarnings = [
      (warning) => true,
    ]
    return config;
  },
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      //add devserver config
      return config
    }
  },
}
