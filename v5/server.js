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
const bundle  = require('./dist/vue-ssr-server-bundle.json')
const clientManifest  = require('./dist/vue-ssr-client-manifest.json')
renderer = createRenderer(bundle, {
    clientManifest
})

app.use(express.static('dist'))
app.use(express.static('public'))

function render(req, res) {
    console.log(renderer)
    const context = {
        title: 'Vue Ssr 2.3',
        url: 'xxx'
    }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            console.log('err!')
            console.log(err)
            throw err
        }
        res.send(html)
    })
}

app.get('/', render)

const port = process.env.PORT || 8086
app.listen(port, '0.0.0.0', () => {
    console.log(`server started at localhost:${port}`)
})