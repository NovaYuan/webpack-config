/**
 * Created by yuanqiujuan on 2018/7/17.
 */
const path = require('path');
const baseConfig = require('./base');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const buildConfig = merge(baseConfig, {
    mode: 'production',
    devtool: '',
    output: {
        path: path.resolve(__dirname, '../dist/static'),
        filename: 'js/[name].min.js',
        publicPath: './static/'
    },
    plugins: [
        new CleanWebpackPlugin('../dist', {
            allowExternal: true
        }),
        new webpack.DefinePlugin({
            ENV_PRODUCTION: JSON.stringify(true),
            ENV_APP_VERSION: (() => {
                const data = fs.readFileSync(path.resolve(__dirname, '../src/manifest.webapp'), 'utf-8');
                return JSON.stringify(JSON.parse(data).version)
            })()
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: '../index.html',
            hash: true,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunksSortMode: 'dependency'
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: path.resolve(__dirname, '../dist/static')
        }, {
            from: path.resolve(__dirname, '../src/manifest.webapp'),
            to: path.resolve(__dirname, '../dist/manifest.webapp')
        }, {
            from: path.resolve(__dirname, '../src/app.appcache'),
            to: path.resolve(__dirname, '../dist/app.appcache')
        }])
    ]
});

module.exports = buildConfig;
