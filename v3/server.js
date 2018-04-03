const server = require('express')()
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const createRenderer = require('vue-server-renderer').createRenderer
const createApp = require('./app')
const renderer = createRenderer({
  template: require('fs').readFileSync(resolve('./index.template.html'), 'utf-8')
})

server.get('*', (req, res) => {
  const context = {
    data: {
      url: req.url
    },
    template: `<div> URL 是： {{ url }}</div>`
  }
  const app = createApp(context)
  renderer.renderToString(app, {title: '源码结构'}, (err, html) => {
    if(err) {
      console.log(err)
      res.status(500).end('internal server error!')
    }
    console.log(html)
    res.end(html)
  })
})

server.listen(8002)