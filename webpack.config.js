const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry: './src/js/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/, 
                use: { loader: "babel-loader" },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use:  [MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                        importLoaders: 2
                        }
                    }, 
                    'postcss-loader']
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: { 
                    loader: "file-loader", 
                    options: {
                        name: "./vendor/[name].[ext]"
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    { 
                        loader: "file-loader", 
                        options: {
                            name: "./images/[name].[ext]",
                            esModule: false
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: 'index.html'
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
      ]
}