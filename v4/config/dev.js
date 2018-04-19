const webpack = require('webpack')
const wpCfg = require('./webpack.base.config.js')
const wpServerCfg = require('./webpack.server.config.js')
const server = require('./server')

// client side
function packClient() {
    return new Promise((resolve, reject) => {
        webpack((wpCfg.getConfig()), (err, stats) => {
            if (err === null && stats.compilation.errors.length === 0) {
                console.log('client side 编译成功')
                resolve(true)
            } else {
                console.log('client side 编译时出错')
                console.log(stats.compilation.errors[0].message)
                reject(false)
            }
        })
    })
}

// server side
function packServer() {
    return new Promise((resolve, reject) => {
        webpack((wpServerCfg), (err, stats) => {
            if (err === null && stats.compilation.errors.length === 0) {
                console.log('server side 编译成功')
                resolve(true)
            } else {
                console.log('server side 编译时出错')
                console.log(stats.compilation.errors[0].message)
                reject(false)
            }
        })
    })
}

Promise.all([packClient(), packServer()]).then(() => {
    console.log('All success!')
    server()
})
