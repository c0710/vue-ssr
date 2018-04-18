import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router/index'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    render: h => h(App)
}).$mount(App)
