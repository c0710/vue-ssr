const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const rootPath = path.resolve(__dirname, '../')

const vueLoader = {
    less: [
        {
            loader: path.join(rootPath, 'node_modules/extract-text-webpack-plugin/loader.js'),
            options: {
                omit: 1,
                remove: true
            }
        },
        {
            loader: 'vue-style-loader'
        },
        {
            loader: 'css-loader',
            options: {
                minimize: true,
                sourceMap: true
            }
        },
        {
            loader: 'less-loader',
            options: {
                sourceMap: true
            }
        }
    ]
}

function getConfig() {
    const config = {
        // 定义入口
        entry: path.resolve(rootPath, 'src/main.js'),
        // 定义出口
        output: {
            path: path.resolve(rootPath, 'build/client'),
            publicPath: '../',
            filename: 'script/[name].js'
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: "initial",
                        minChunks: 2,
                        maxInitialRequests: 5, // The default limit is too small to showcase the effect
                        minSize: 0 // This is example is too small to create commons chunks
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: "initial",
                        name: "vendor",
                        priority: 10,
                        enforce: true
                    }
                }
            }
        },
        devtool: '#eval-source-map', // 开始source-map. 具体的不同配置信息见webpack文档
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoader
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(swf)$/,
                loader: `url-loader?limit=10000&name=/script/[name].[ext]`
            }, {
                test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf)$/,
                loader: `url-loader?limit=10000&name=/images/[name].[ext]`
            }, {
                test: /\.less/,
                use: [{
                    loader: 'less-loader'
                }]
            }, {
                test: /\.css/,
                loader: 'style-loader!css-loader'
            }]
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.common.js',
                '@': path.join(rootPath)
            },
            extensions: ['.js', '.less', '.vue', '*', '.json']
        },
        plugins: [
            new ExtractTextPlugin('css/[name].css')
        ]
    }
    return config
}

module.exports = {
    getConfig
}