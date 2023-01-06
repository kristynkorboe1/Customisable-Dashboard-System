import { createRouter, createWebHistory } from 'vue-router'
import TabsTest from '../components/TabsTest.vue'
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
            component: TabsTest
            },
    ]
})

export default router