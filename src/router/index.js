import { createRouter, createWebHistory } from 'vue-router'
import Tab1 from '../views/Tab1.vue'
import Tab2 from '../views/Tab2.vue'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    mode: "history",
    routes: [
        {
            path: '/',
            component: Home
            },
        {
            path: '/Tab1',
            component: Tab1
            },
        {
            path: '/Tab2',
            component: Tab2
            }
    ]
})

export default router