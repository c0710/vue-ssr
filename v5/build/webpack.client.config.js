const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

const config = merge(base, {
    entry: {
        app: '../src/client.entry.js'
    },

})