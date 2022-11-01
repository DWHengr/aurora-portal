import { createRouter, createWebHistory } from 'vue-router';
import AlertRule from './alert';
import Notify from './notify';

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/index',
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

router.beforeEach((to, from, next) => {
  if (!window.sessionStorage.getItem('Aurora-Token') && to.path !== '/') {
    next({
      path: '/',
    });
  } else {
    if ((window.sessionStorage.getItem('Aurora-Token') && to.path == '/') || to.matched.length == 0)
      next({
        path: '/alert/rule',
      });
    next();
  }
});

export default router;
