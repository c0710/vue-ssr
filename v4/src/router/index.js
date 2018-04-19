import Vue from 'vue'
import Router from 'vue-router'
import List from '@/src/components/List.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'List',
            component: List
        }
    ]
})