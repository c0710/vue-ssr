import Vue from 'vue'
import App from './App.vue'
import {createRouter} from "./router";

export function createApp(ssrContext) {
    const router = createRouter()
    const app = new Vue({
        router,
        ssrContext,
        render: h => h(App)
    })
    return {app, router}
}