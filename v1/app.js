const Vue = require('vue')
const server = require('express')()
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const createRenderer = require('vue-server-renderer').createRenderer
const renderer = createRenderer({
  template: require('fs').readFileSync(resolve('./index.template.html'), 'utf-8')
})

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      console.log(err)
      res.status(500).end('Internal Server Error!')
      return
    }
    console.log(html)
    res.end(html)
  })
})

server.listen(8001)