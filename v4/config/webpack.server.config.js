const path = require('path')
const projectRoot = path.resolve(__dirname, '..')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')
var nodeExternals = require('webpack-node-externals')

module.exports = {
    target: 'node',
    entry: path.join(projectRoot, 'src/server-index.js'),
    output: {
        libraryTarget: 'commonjs2',
        path: path.join(projectRoot, 'build'),
        filename: 'bundle.server.js'
    },
    module: {
        // 因为使用webpack2，这里必须是rules，如果使用use，
        // 会报个错：vue this._init is not a function
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: projectRoot,
                exclude: /node_modules/
            }
        ]
    },
    /**
     * 如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置externals。
     * */
    externals: [
        nodeExternals({
            modulesDir: path.resolve('../node_modules')
        })
    ],
    plugins: [
        new VueSSRPlugin({
            filename: './build/vue-ssr-bundle.json'
        })
    ]
}