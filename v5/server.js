const fs = require('fs')
const path = require('path')
const express = require('express')
const {createBundleRenderer} = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, file)
const app = express()
const template = fs.readFileSync(resolve('./src/index.template.html'), 'utf-8')

function createRenderer(bundle, options) {
    return createBundleRenderer(
        bundle,
        Object.assign(options, {
            template,
            basedir: resolve('./dist'),
            runInNewContext: false
        })
    )
}

let renderer
// const bundle = require('./dist/vue-ssr-client-manifest')