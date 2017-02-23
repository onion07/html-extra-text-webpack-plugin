var path = require('path');
var webpack = require('webpack');


//前端[S]
var HtmlWebpackPlugin = require('html-webpack-plugin'); 
//前端[E]
var ExtractTextPlugin = require('extract-text-webpack-plugin');


 //服务端[S] webpack 自带插件
// var ManifestPlugin = require('webpack-manifest-plugin');
//前端[S]
// var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin'); 


module.exports = {
  entry:  {
    app: path.join(__dirname, 'src/index.js')
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: './',
    filename: '[name].[chunkhash].js'
  },
  // devtool: "eval-source-map",
  module: {
    loaders: [
        { //添加到所有的loader之前
          test: require.resolve('jquery'),exclude: /node_modules/,loader: 'expose?jQuery!expose?$'
        },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
        { test: /\.html$/, exclude: /node_modules/,loader: "html?attrs=img:src img:data-src" },
        { test: /\.(png|jpe?g|eot|svg|ttf|gif|woff2?)$/,exclude: /node_modules/,loader: "url?limit=8192&name=assets/img/[hash][name].[ext]"},
        { test: /\.css$/, exclude: /node_modules/,loader: 'style!css' },
        { test: /\.less$/, exclude: /node_modules/,loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')}
    ]
  },
  plugins: [
    // // 服务端使用【输出一个json】
    // new ManifestPlugin({
    //   fileName: 'my-manifest.json'
    // }),
    //
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("style/[name]_[hash].css",{
      allChunks: true
    }),
    new HtmlWebpackPlugin({
        template: './index.html',
        filename: '_index.html'
    })

  //前端【E】 
  //[前端]方法二 ： html文件引用js： <%= htmlWebpackPlugin.files.fest %>
  // new HtmlWebpackPlugin({
  //     template: './index.html'
  // }),
  // new InlineManifestWebpackPlugin({
  //     name: 'fest'
  // })
  //前端【E】 


  ]
}