import { createRouter, createWebHistory } from 'vue-router';
import AlertRule from './alertRule';
import Notify from './notify';

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Index.vue'),
    meta: [{ name: 'index', path: '/index' }],
    redirect: '/alert/rule',
    children: [AlertRule, Notify],
  },
];

const router = new createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
