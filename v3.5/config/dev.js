const webpack = require('webpack')
const wpCfg = require('./webpack.base.config.js')
const compiler = webpack(wpCfg.getConfig())
const server = require('./server')
console.log(wpCfg.getConfig().resolve)
compiler.watch({}, (err, stats) => {
    if (err === null && stats.compilation.errors.length === 0) {
        console.log('编译成功')
        server()
    } else {
        console.log('编译出现错误...')
        console.log(stats.compilation.errors[0].message)
    }
})
