const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const argv = require('yargs').argv;
const webpack = require('webpack');

const htmlMinifyOptions = {
    removeComments: true,
    removeAttributeQuotes: true,
    collapseWhitespace: true
};

module.exports = {
    entry: {
        'index': './src/index.js'
    },
    output: {
        filename: '[chunkhash].bundle.js',
        chunkFilename: "[chunkhash].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    priority: -20,
                    chunks: "all"
                }
            }
        }
   },
    externals: {
        jquery: 'jQuery'
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [{
            test: /(\.css|\.scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            title: 'XT | Tech Radar',
            minify: argv.env === 'prod' ? htmlMinifyOptions : false
        }),
        new ExtractTextPlugin('[chunkhash].bundle.css')
    ],
    mode: argv.env === 'prod' ? 'production' : 'development'
};