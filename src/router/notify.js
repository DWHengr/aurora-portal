import layout from '@/components/layout/index.vue';

export default {
  path: '/notify',
  component: layout,
  meta: { title: '通知设置' },
  children: [
    {
      path: 'user',
      name: 'user',
      meta: {
        title: '通知用户',
        parentName: '通知设置',
        path: '/user',
      },
      component: () => import('@/views/notify/alert_user/AlertUser.vue'),
    },
  ],
};
