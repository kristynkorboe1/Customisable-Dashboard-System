import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Tab1 from '../views/Tab1.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
            // component: () => import('./views/Home.vue')
        },
        {
            path: '/tab1',
            component: Tab1
            // component: () => import('./views/Tab1.vue')
        }
    ]
})

export default router