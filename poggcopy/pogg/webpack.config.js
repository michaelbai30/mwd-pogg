const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
plugins: [new HtmlWebPackPlugin({template: "./src/public/index.html"})]
};
