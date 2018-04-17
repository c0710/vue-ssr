const webpack = require('webpack')
const config = require('./webpack.base.config')
const compiler = webpack(config.getConfig())
const server = require('./server')

compiler.watch({}, function (err, stats) {
    if (err === null &&　stats.compilation.errors.length === 0) {
        console.log('compiler success')
        server()
    } else {
        console.log('编译出现错误...')
        console.log(stats.compilation.errors[0].message)
    }
})