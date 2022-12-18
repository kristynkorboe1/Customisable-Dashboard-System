import { createRouter, createWebHistory } from 'vue-router'
import Tabs from '../components/Tabs.vue'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    mode: "history",
    routes: [
        {
            path: '/addTab',
            component: Home
            },
        {
            path: '/Tabs',
            component: Tabs
            },
    ]
})

export default router