const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./frontend/src/index.js",
  output: {
    path: path.resolve(__dirname, "./frontend/static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
        new HtmlWebPackPlugin({
            template: "./frontend/templates/frontend/index.html",
            filename: "./index.html"
        })
    ]
};
