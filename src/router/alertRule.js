import layout from '../components/layout/index.vue';

export default {
    path: '/alert',
    component: layout,
    children: [
        {
            path: 'rule',
            name: 'rule',
            meta: {
                name: '告警规则',
                parentName: '告警管理',
                path: '/rule'
            },
            component: () => import('../views/alert/AlertRule.vue')
        },
    ]
}