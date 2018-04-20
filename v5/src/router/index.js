import Vue from 'vue'
import Router from 'vue-router'
import comp1 from '../views/comp1'
import comp2 from '../views/comp2'

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/comp1',
                component: comp1
            },
            {
                path: '/comp2',
                component: comp2
            },
            {
                path: '/',
                redirect: '/comp1'
            }
        ]
    })
}