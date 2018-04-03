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
    template: `<div>访问的 URL 是： {{ url }} (from v2)</div>`
  })

  /*通过传入一个"渲染上下文对象"，作为 renderToString 函数的第二个参数，来提供插值数据：*/
  const context = {
    title: 'hello',
    meta: `
    <meta charset="UTF-8">
  `
  }


  renderer.renderToString(app, context, (err, html) => {
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