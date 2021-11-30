import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import VerificationAge from '@/views/VerificationAge.vue';
import VerificationU12 from '@/views/VerificationU12.vue';
import VerificationO12 from '@/views/VerificationO12.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/verification',
    name: 'verification',
    component: VerificationAge,
  },
  {
    path: '/verification-u12',
    name: 'verification-u12',
    component: VerificationU12,
  },
  {
    path: '/verification-o12',
    name: 'verification-o12',
    component: VerificationO12,
  },
  {
    path: '/not-vaccinated',
    name: 'not-vaccinated',
    component: import('@/views/VerificationO12.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
