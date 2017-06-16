const path = require('path')
const path_src = path.resolve(__dirname, './src')
const path_dist = path.resolve(__dirname, './build')
const path_style = path.resolve(path_src, './styles')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:30000/',
      'webpack/hot/dev-server',
      './src/entry.ts'
    ]
  },
  output: {
    path: path_dist,
    filename: `[name].[hash].js`
  },
  resolve: {
    alias: {
      '~': path_src
    },
    extensions: ['.ts', '.js']
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true, includePaths: [path_style] } }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: '10000',
          name: './assets/[name].[ext]'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            sass: `style-loader!css-loader!sass-loader?includePaths[]=${path_style}`
          },
          esModule: true
        }
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    // }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        if (!module.context) return false
        if (module.context.indexOf('webpack') !== -1) return false

        return module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body'
    })
  ]
}
