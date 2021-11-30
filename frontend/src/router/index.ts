import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/verification',
    name: 'verification',
    component: import('@/views/Verification.vue')
  },
  {
    path: '/not-vaccinated',
    name: 'not-vaccinated',
    component: import('@/views/Verification.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
