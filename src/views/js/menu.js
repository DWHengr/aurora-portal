import { NIcon } from 'naive-ui';
import { h } from 'vue';
import {
  DocumentError20Filled,
  AlertOn20Filled,
  Settings20Filled,
  ClockAlarm20Filled,
  People20Filled,
} from '@vicons/fluent';

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export const menus = [
  {
    label: '告警管理',
    key: '1',
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
  {
    label: '通知设置',
    key: '2',
    icon: renderIcon(ClockAlarm20Filled),
    children: [
      {
        label: '通知用户',
        key: 'user',
        icon: renderIcon(People20Filled),
      },
    ],
  },
];
