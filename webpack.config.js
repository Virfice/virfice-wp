const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = (env, argv) => {
  const baseConfig = {
    mode: argv.mode === "production" ? "production" : "development",
    devtool: false,
    entry: {
      "js/virfice": "./assets-sources/scripts/index.js",
      "css/virfice-style": "./assets-sources/scss/style.scss",
      "js/Public/woo-email-preview-button-handler":
        "./assets-sources/scripts/Public/woo-email-preview-button-handler.js",
      "css/Public/woo-email-preview-button-handler-style":
        "./assets-sources/scripts/Public/woo-email-preview-button-handler.scss",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            // options: { presets: ['@babel/env', '@babel/preset-react'] },
            options: {
              presets: ["@babel/react", "@babel/preset-env"],
              plugins: [
                "@babel/proposal-class-properties",
                "@babel/plugin-transform-runtime",
                "lodash",
              ],
            },
          },
        },
        { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
        {
          test: /\.(css|sass|scss)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpg|gif|webp|svg)$/,
          loader: [
            {
              loader: "url-loader",
              options: {
                limit: 8192, // Images smaller than this limit will be inlined as base64
                name: "images/[name].[hash:8].[ext]", // Output path and filename pattern
              },
            },
          ],
        },
      ],
    },
    resolve: { extensions: [".tsx", ".ts", ".jsx", ".js"] },
    output: {
      path: path.resolve(__dirname, "assets"),
      filename: "[name].min.js",
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: "production",
        API_KEY: null,
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].min.css",
      }),
      // new HtmlWebpackInlineSourcePlugin()
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new UglifyJsPlugin({
          include: /\.min\.js$/,
        }),
      ],
    },
  };

  return baseConfig;
};
