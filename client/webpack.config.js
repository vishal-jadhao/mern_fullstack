const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const TransferWebpackPlugin = require("transfer-webpack-plugin");
const ExtractTextPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "eval",
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    contentBase: "build/", // Relative directory for base of server
    publicPath: "/", // Live-reload
    inline: true,
    port: process.env.PORT || 4000, // Port Number
    host: "localhost", // Change to '0.0.0.0' for external facing server
    historyApiFallback: true,
    proxy: {
      "/api/*": "http://localhost:5000"
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_moduels/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: "style-loader"
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: "css-loader"
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [require("autoprefixer")];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=10000"
      },
      {
        test: /\.(otf|ttf|eot|svg)(\?[\s\S]+)?$/,
        use: "file-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?name=images/[name].[ext]",
          "image-webpack-loader?bypassOnDebug"
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("app.scss"),
    new TransferWebpackPlugin([{ from: "src" }]),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ]
};
