const path = require('path')

const projectRoot = path.resolve(__dirname, '../')
console.log('projectRoot=', projectRoot)
module.exports = {
    target: 'node',
    entry: path.join(projectRoot, 'src/server-index.js'),
    output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(projectRoot, 'build'),
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
    }
}