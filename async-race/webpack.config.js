const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "[name].js",
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist/"),
        },
        compress: true,
        port: 5500,
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