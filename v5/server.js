const fs = require('fs')
const path = require('path')
const express = require('express')
const {createBundleRenderer} = require('vue-server-renderer')
const LRU = require('lru-cache')

const resolve = file => path.resolve(__dirname, file)
const app = express()
const template = fs.readFileSync(resolve('./src/index.template.html'), 'utf-8')

function createRenderer(bundle, options) {
    return createBundleRenderer(
        bundle,
        Object.assign(options, {
            template,
            cache: LRU({
                max: 1000,
                maxAge: 1000*60*15
            }),
            basedir: resolve('./dist'),
            runInNewContext: false
        })
    )
}

let renderer
// const bundle = require('./dist/vue-ssr-client-manifest')