import layout from '../components/layout/index.vue';

export default {
  path: '/alert',
  component: layout,
  meta: { title: '告警管理' },
  children: [
    {
      path: 'rule',
      name: 'rule',
      meta: {
        title: '告警规则',
        parentName: '告警管理',
        path: '/rule',
      },
      component: () => import('../views/alert/AlertRule.vue'),
    },
    {
      path: 'record',
      name: 'record',
      meta: {
        title: '告警记录',
        parentName: '告警管理',
        path: '/record',
      },
      component: () => import('../views/alert/AlertRecord.vue'),
    },
  ],
};
