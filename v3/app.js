const Vue = require('vue')

module.exports = function createApp(context) {
  return new Vue({
    ...context
  })
}