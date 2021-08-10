/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PREFIX = "/webpack-gh-pages/";

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    historyApiFallback: true,
  },
  output: {
    publicPath: PREFIX,
  },
  entry: "./src/index.ts",
  mode: "development",
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "404.html",
    }),
  ],
};
