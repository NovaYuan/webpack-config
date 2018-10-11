/**
 * Created by yuanqiujuan on 2018/7/17.
 */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const projectPath = path.resolve(__dirname, '../src');

module.exports = {
    entry: {
        main: ['babel-polyfill', path.resolve(__dirname, '../src/entry/index.js')]
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: true
                }
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    query: {
                        extractCSS: true
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        'presets': [
                            'env',
                            'stage-2'
                        ],
                        'plugins': ['transform-runtime']
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: path.resolve(__dirname, '../.postcssrc.js')
                                }
                            }
                        }
                    ]
                }))
            },
            {// loader sass and css
                test: /\.scss$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: path.resolve(__dirname, '../postcss.config.js')
                                }
                            }
                        },
                        'sass-loader'
                    ]
                }))
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[ext]?[hash:7]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[ext]?[hash:7]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]?[hash:7]'
                }
            },
            {
                test: /\.(json|txt)$/,
                loader: 'file-loader',
                options: {
                    name: 'lang/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name].min.css',
            allChunks: true
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    compress: {
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true
            })
        ],
        splitChunks: {
            chunks: 'initial',
            minSize: 30000, // 形成一个新代码块最小的体积
            minChunks: 1, // 最小应该被引用的次数
            maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
            maxInitialRequests: 3, // 一个入口最大的并行请求数
            automaticNameDelimiter: '-',
            name: true
        }
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss'],
        alias: {
            'vue': 'vue/dist/vue.runtime.esm.js',
            '@': projectPath, // 项目根目录
            '@components': path.resolve(projectPath, 'components'), // 项目组件库
            '@services': path.resolve(projectPath, 'services'), // 项目接口api库
            '@views': path.resolve(projectPath, 'views'), // 项目页面
            '@router': path.resolve(projectPath, 'router'), // 项目页面
            '@mixins': path.resolve(projectPath, 'mixins'), // 项目混合器
            '@util': path.resolve(projectPath, 'util'), // 项目工具包
            '@assets': path.resolve(projectPath, 'assets'), // 项目资源文件
            '@lang': path.resolve(projectPath, 'lang'), // 语言文件
            '@constant': path.resolve(projectPath, 'constant'), // 项目常量
            '@config': path.resolve(projectPath, 'config') // 配置文件
        }
    }
};
