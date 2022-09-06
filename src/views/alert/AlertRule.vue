<template>
  <div>
    <n-card :bordered="false">
      <div class="mb-4">
        <n-icon :component="AlertOn20Filled" class="text-purple-800 align-middle" size="38" />
        <h1 class="inline-block ml-2 align-middle" style="font-size: 18px">告警规则</h1>
      </div>
      <p> 可以根据告警对象创建告警规则</p>
    </n-card>
    <n-card class="mt-[15px]">
      <!-- 操作栏 -->
      <div>
        <n-input-group class="w-[calc(100%-5.25rem)]">
          <n-dropdown
            trigger="click"
            @select="seekOptionClick"
            placement="bottom-start"
            :options="seekOption"
          >
            <n-select
              ref="seekSelect"
              v-model:value="multipleSelectValue"
              :default-value="dVlaue"
              filterable
              multiple
              tag
              placeholder="输出查找内容 名称:规则1"
              :show-arrow="false"
              :show="false"
              :clearable="true"
            />
          </n-dropdown>
          <NButton type="primary" class="w-20"> 查找 </NButton>
        </n-input-group>
        <div class="inline-block">
          <NButton type="primary" class="w-20 left-1"> 新增 </NButton>
        </div>
      </div>
      <!-- 数据表格 -->
      <div class="mt-[10px]">
        <n-data-table :columns="columns" :data="data" :pagination="pagination" />
      </div>
    </n-card>
  </div>
</template>

<script>
  import { h, defineComponent, ref } from 'vue';
  import { NTag, NButton } from 'naive-ui';
  import { AlertOn20Filled } from '@vicons/fluent';

  const createSeekOptions = () => {
    return [
      {
        label: '名称',
        key: 'name',
      },
    ];
  };

  const createColumns = () => {
    return [
      {
        title: '名称',
        key: 'name',
      },
      {
        title: '告警等级',
        key: 'severity',
      },
      {
        title: '告警状态',
        key: 'rulesStatus',
      },
      {
        title: '告警等级',
        key: 'severity',
      },
      {
        title: '回调接口',
        key: 'webhook',
      },
      {
        title: '操作',
        key: 'actions',
        render(row) {
          return h(
            NButton,
            {
              type: 'error',
              size: 'small',
            },
            { default: () => '删除' }
          );
        },
      },
    ];
  };

  const createData = () => [
    {
      key: 0,
      name: '规则1',
      rulesStatus: '启用',
      severity: '提示',
      webhook: 'http://xxxx.com',
    },
    {
      key: 1,
      name: '规则1',
      rulesStatus: '启用',
      severity: '提示',
      webhook: 'http://xxxx.com',
    },
    {
      key: 2,
      name: '规则1',
      rulesStatus: '启用',
      severity: '提示',
      webhook: 'http://xxxx.com',
    },
  ];

  const multipleSelectValue = ref(null);
  const seekSelect = ref(null);
  const dVlaue = ref('');

  const seekOptionClick = (key) => {
    // eslint-disable-next-line no-console
    console.log(seekSelect.value.fallbackOption);
    dVlaue.value = key;
  };

  const seekChage = () => {
    // eslint-disable-next-line no-console
    console.log(seekSelect.value);
  };

  export default defineComponent({
    name: 'AlertRule',
    setup() {
      return {
        data: createData(),
        columns: createColumns(),
        seekOption: createSeekOptions(),
        pagination: {
          pageSize: 10,
        },
        multipleSelectValue,
        seekSelect,
        dVlaue,
        seekChage,
        seekOptionClick,
        AlertOn20Filled,
      };
    },
  });
</script>
