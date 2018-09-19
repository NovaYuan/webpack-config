/**
 * Created by yuanqiujuan on 2018/7/17.
 */
const path = require('path');
const baseConfig = require('./base');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = merge(baseConfig, {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].min.js',
        publicPath: process.env.NODE_ENV === 'production' ? './' : ''
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            hash: true
        })
    ],
    mode: 'development',
    devServer: {
        compress: true,
        host: '0.0.0.0',
        hot: true,
        port: 9000,
        open: false
    },
    devtool: 'eval-source-map'
});

module.exports = devConfig;
