import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/UserView.vue'
import Login from '../views/LoginView.vue'
import ManagerView from '../views/ManagerView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path:'/user/:u_id',
        name: 'user',
        component: HomeView,
    },
    {
        path:'/login',
        name: 'login',
        component: Login
    },
    {
        path: '/vacationsrequests',
        name: 'vacationsrequests',
        component: ManagerView,
        meta: { requiresAuth: true }
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/login'  
    }
  ]
})