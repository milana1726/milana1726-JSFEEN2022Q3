const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: 'inline-source-map',
    entry: "./src/js/index.js",
    output: {
        filename: "./js/index_bundle.js",
        path: path.resolve(__dirname, "dist/")
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist/"),
          },
        compress: true,
        port: 3001,
      },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/preset-env"],
                  },
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.svg}$/i,
                use: [
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 10000,
                        esModule: false
                      },
                    },
                ]
            },
            {
                test: /\.html$/i,
                use: ["html-loader"],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.css']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
               { from: './src/assets/images', to: './images' }
            ]
        }),
    ],
    experiments: {
        topLevelAwait: true
    }
};