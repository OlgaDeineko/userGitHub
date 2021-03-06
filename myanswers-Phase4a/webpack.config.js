var path    = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {},
  module: {
    loaders: [
       { test: /.*(\/|\\)+.*i18n(\/|\\)tinyMCE(\/|\\).*(\.js)$/, loader: "file-loader?name=./i18n/tinyMCE/[name].[ext]" },
       { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
       { test: /\.html$/, loader: 'raw' },
       { test: /\.((woff|woff2)(\?v=.*)?)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff&name=./fonts/[hash].[ext]" },
       { test: /\.((ttf)(\?v=.*)?)$/,    loader: "file-loader?name=./fonts/[hash].[ext]" },
       { test: /\.((eot)(\?v=.*)?)$/,  loader: "file-loader?name=./fonts/[hash].[ext]" },
       { test: /\.((svg|gif)(\?v=.*)?)$/,    loader: "file-loader?name=./images/[hash].[ext]"  },
       { test: /.*(\/|\\)+.*i18n(\/|\\).*(\.json)$/,    loader: "json-loader"  },
       { test: /\.(scss|sass)$/, loader: 'style!css!sass' },
       { test: /.*(\/|\\)+.*\.css$/, loader: 'style!css' }
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    }),

    new webpack.ProvidePlugin({
       jQuery: 'jquery',
       $: 'jquery',
       jquery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};
