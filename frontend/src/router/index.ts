import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import VerificationU12 from '@/views/VerificationU12.vue';
import VerificationO12 from '@/views/VerificationO12.vue';
import Verified from '@/views/Verified.vue';
import Admin from '@/views/Admin.vue';
import { clearRedirect } from '../../tools';
import AttendingList from '@/views/AttendingList.vue';
import Guest from '@/views/Guest.vue';
import NotVaccinated from '@/views/NotVaccinated.vue';
import Authenticate from '@/views/Authenticate.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
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
    component: NotVaccinated,
  },
  {
    path: '/verified',
    name: 'verified',
    component: Verified,
  },
  {
    path: '/guest',
    name: 'guest',
    component: Guest,
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
  }, {
    path: '/auth',
    name: 'auth',
    component: Authenticate,
  }, {
    path: '/attendance',
    name: 'attendance',
    component: AttendingList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach(() => {
  clearRedirect();
});

export default router;
