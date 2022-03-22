import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('./../views/Login.vue'),
        },
        {
            path: '/chatroom',
            name: 'Chatroom',
            component: () => import('./../views/Chatroom.vue'),
        },
    ],
})

export default router