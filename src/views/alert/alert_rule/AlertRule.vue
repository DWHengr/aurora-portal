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
          <AFilterSeekInput
            class="w-full"
            v-model:value="multipleSelectValue"
            :seek-option="seekOption"
          />
          <NButton type="primary" class="w-20"> 查找 </NButton>
        </n-input-group>
        <div class="inline-block">
          <NButton type="primary" class="w-20 left-1" @click="onRuleCreate"> 新增 </NButton>
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
  import { NButton } from 'naive-ui';
  import { AlertOn20Filled } from '@vicons/fluent';
  import AFilterSeekInput from '@/components/AFilterSeekInput.vue';
  import { useRouter } from 'vue-router';

  const createSeekOptions = () => {
    return [
      {
        label: '名称',
        key: 'name',
      },
      {
        label: '告警等级',
        key: 'severity',
        map: [
          {
            label: '提示',
            key: 'hint',
          },
          {
            label: '次要',
            key: 'minor',
          },
          {
            label: '重要',
            key: 'importance',
          },
          {
            label: '紧急',
            key: 'urgency',
          },
        ],
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
  export default defineComponent({
    name: 'AlertRule',
    components: { AFilterSeekInput },
    setup() {
      const multipleSelectValue = ref([]);
      const seekSelect = ref(null);
      const dVlaue = ref('');
      const router = useRouter();

      const seekOptionClick = (key) => {
        seekSelect.value.$refs.triggerRef.$refs.patternInputRef._value = '1';
        // eslint-disable-next-line no-console
        console.log(seekSelect);
        dVlaue.value = key;
      };

      const seekChage = (e) => {
        // eslint-disable-next-line no-console
        console.log(seekSelect.value.$emit);
        seekSelect.value.focus();
      };

      const onRuleCreate = () => {
        router.push({ name: 'rulecreate' });
      };

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
        onRuleCreate,
        AlertOn20Filled,
      };
    },
  });
</script>
