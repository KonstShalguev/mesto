const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

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
                test: /\.css$/i,
                use:  [
                    (isDev ? 'style-loader' : MiniCssExtractPlugin.loader), 
                    {
                        loader: 'css-loader',
                        options: {
                        importLoaders: 2
                        }
                    }, 
                    'postcss-loader'
                ]
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
                test: /\.(png|jpe?g|gif|ico|svg)$/,
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
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
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