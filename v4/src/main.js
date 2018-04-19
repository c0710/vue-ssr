import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    render: h => h(App)
}).$mount(App)
