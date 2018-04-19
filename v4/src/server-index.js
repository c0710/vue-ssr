import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios  from 'vue-axios'
import App from './App.vue'
import store from './store/index'
import {LIST} from "./store/mutation-types";

Vue.use(VueAxios, axios)
Vue.use(Vuex)

console.log(App)

const app = new Vue({
    ...App,
    store
})

export default function (context) {
    return new Promise((resolve, reject) => {
        Vue.axios.get('http://localhost:7000/data').then(response => {
            // 获取数据
            const list = response.data.data.liveWodList
            // 把数据存到Vuex里面
            store.commit(LIST.ADD_DATA, list)
            context.state = store.state
            resolve(app)
        })
    })
}