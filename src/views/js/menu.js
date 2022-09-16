import { NIcon } from 'naive-ui';
import { h } from 'vue';
import { DocumentError20Filled, AlertOn20Filled, Settings20Filled } from '@vicons/fluent';

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export const menus = [
  {
    label: '告警管理',
    key: '',
    icon: renderIcon(Settings20Filled),
    children: [
      {
        label: '告警规则',
        key: 'rule',
        icon: renderIcon(AlertOn20Filled),
      },
      {
        label: '告警记录',
        key: 'record',
        icon: renderIcon(DocumentError20Filled),
      },
    ],
  },
];
