import layout from '@/components/layout/index.vue';

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
      component: () => import('@/views/alert/alert_rule/AlertRule.vue'),
    },
    {
      path: 'metric',
      name: 'metric',
      meta: {
        title: '告警指标',
        parentName: '告警管理',
        path: '/metric',
      },
      component: () => import('@/views/alert/alert_metric/AlertMetric.vue'),
    },
    {
      path: 'rule/create',
      name: 'rulecreate',
      meta: {
        title: '告警规则创建',
        isNoShow: true,
        path: '/rule/create',
      },
      component: () => import('@/views/alert/alert_rule/AlertRuleCreate.vue'),
    },
    {
      path: 'rule/details',
      name: 'ruledetails',
      meta: {
        title: '告警规则详情',
        isNoShow: true,
        path: '/rule/details',
      },
      component: () => import('@/views/alert/alert_rule/AlertRuleDetails.vue'),
    },
    {
      path: 'record',
      name: 'record',
      meta: {
        title: '告警记录',
        parentName: '告警管理',
        path: '/record',
      },
      component: () => import('@/views/alert/alert_record/AlertRecord.vue'),
    },
    {
      path: 'silence',
      name: 'silence',
      meta: {
        title: '告警静默',
        parentName: '告警管理',
        path: '/silence',
      },
      component: () => import('@/views/alert/alert_silence/AlertSilence.vue'),
    },
  ],
};
