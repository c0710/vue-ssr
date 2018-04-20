import {createApp} from "./app";

const {app, router} = createApp()

// 客户端代码是在路由解析完成的时候讲 app 挂载到 #app 标签下
router.onReady(() => {
    app.$mount('#app')
})