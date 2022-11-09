<template>
  <div>
    <ACard :bordered="false">
      <div class="mb-4">
        <n-icon :component="AlertOn20Filled" class="text-purple-800 align-middle" size="38" />
        <h1 class="inline-block ml-2 align-middle" style="font-size: 18px">告警规则</h1>
      </div>
      <p> 可以根据告警对象创建告警规则</p>
    </ACard>
    <ACard class="mt-[15px]" :gradual="false">
      <!-- 操作栏 -->
      <div v-show="checkedRowKeys.length <= 0">
        <n-input-group class="w-[calc(100%-5.25rem)]">
          <AFilterSeekInput
            class="w-full"
            @on-value-change="page"
            v-model:value="multipleSelectValue"
            :seek-option="seekOption"
          />
          <NButton type="primary" class="w-20" @click="page"> 查找 </NButton>
        </n-input-group>
        <div class="inline-block">
          <NButton type="primary" class="w-20 left-1" @click="onRuleCreate"> 新增 </NButton>
        </div>
      </div>
      <div v-show="checkedRowKeys.length > 0">
        <div class="inline-block">
          <NButton type="error" class="w-20" @click="onRuleDeleteTip"> 删除 </NButton>
        </div>
      </div>
      <!-- 数据表格 -->
      <div class="mt-[10px]">
        <n-data-table
          remote
          :row-key="(row) => row.id"
          v-model:checked-row-keys="checkedRowKeys"
          :on-update:checked-row-keys="
            (keys, rows) => {
              checkedRowKeys = keys;
              checkedRows = rows;
            }
          "
          :columns="columns"
          :data="data"
          :pagination="pagination"
          :on-update:page="page"
        />
      </div>
    </ACard>
  </div>
</template>

<script>
  import { h, defineComponent, ref, onMounted, reactive } from 'vue';
  import { NButton, NIcon, NTag, NEllipsis } from 'naive-ui';
  import { AlertOn20Filled, Add12Filled, Delete24Regular, Edit16Filled } from '@vicons/fluent';
  import AFilterSeekInput from '@/components/AFilterSeekInput.vue';
  import ACard from '@/components/ACard.vue';
  import { useRouter } from 'vue-router';
  import ruleapi from '@/api/rule.js';
  import { useDialog, useLoadingBar } from 'naive-ui';

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

  const rules = {
    name: {
      required: true,
      message: '请输入静默名称',
      trigger: ['input', 'blur'],
    },
    type: {
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择静默类型',
    },
  };

  export default defineComponent({
    name: 'AlertRule',
    components: { AFilterSeekInput, ACard },
    setup() {
      const dialog = useDialog();
      const multipleSelectValue = ref([]);
      const seekSelect = ref(null);
      const router = useRouter();
      const checkedRowKeys = ref([]);
      const checkedRows = ref([]);
      const data = ref([]);
      const formRef = ref(null);
      const pagination = reactive({
        pageSize: 10,
      });
      const loadingBar = useLoadingBar();
      const columns = [
        {
          type: 'selection',
        },
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
            return [
              h(
                NButton,
                {
                  type: 'primary',
                  size: 'small',
                  style: { margin: '2px' },
                  onClick: () => {
                    onEditRule(row);
                  },
                },
                () => [
                  h(NIcon, { component: Edit16Filled, size: 18, style: { marginRight: '2px' } }),
                  '编辑',
                ]
              ),
              h(
                NButton,
                {
                  type: 'error',
                  size: 'small',
                  style: { margin: '2px' },
                  onClick: () => onRuleDeleteTip(row),
                },
                () => [
                  h(NIcon, { component: Delete24Regular, size: 18, style: { marginRight: '2px' } }),
                  '删除',
                ]
              ),
            ];
          },
        },
      ];

      onMounted(() => {
        page();
      });

      const onEditRule = (row) => {
        router.push({ name: 'rulecreate', query: { editId: row.id } });
      };

      const page = (pagedata) => {
        loadingBar.finish();
        loadingBar.start();
        ruleapi
          .page({
            page: pagedata && typeof pagedata === 'number' ? pagedata : 1,
            size: pagination.pageSize,
            filters: multipleSelectValue.value,
          })
          .then((res) => {
            loadingBar.finish();
            if (res.code == 0) {
              data.value = res.data.dataList;
              pagination.itemCount = res.data.total;
              pagination.pageCount = Math.ceil(res.data.total / pagination.pageSize);
            }
          });
      };

      const onRuleCreate = () => {
        router.push({ name: 'rulecreate' });
      };

      const onRuleDeleteTip = (row) => {
        let ids = [];
        let names = [];
        if (row.id) {
          checkedRows.value = [];
          checkedRowKeys.value = [];
          ids.push(row.id);
          names.push(row.name);
        }
        ids.push(...checkedRowKeys.value);
        for (let index = 0; index < checkedRows.value.length; index++) {
          names.push(checkedRows.value[index].name);
        }
        dialog.warning({
          title: '删除警告',
          content: () => {
            return h('lable', {}, [
              '确定删除 ',
              h('lable', { style: { color: '#8b5cf6', 'font-weight': 'bold' } }, names.join('、')),
              ' ?',
            ]);
          },
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            onRuleDelete(ids);
          },
        });
      };

      const onRuleDelete = (ids) => {
        if (ids.length > 0) {
          ruleapi.deletes(ids).then((res) => {
            if (res.code == 0) {
              page();
              checkedRowKeys.value = [];
              window.$message.success('删除成功');
            }
          });
        }
      };

      return {
        seekOption: createSeekOptions(),
        columns,
        data,
        pagination,
        multipleSelectValue,
        seekSelect,
        checkedRowKeys,
        checkedRows,
        rules,
        formRef,
        onRuleCreate,
        onRuleDeleteTip,
        onRuleDelete,
        page,
        AlertOn20Filled,
        Add12Filled,
        Delete24Regular,
        Edit16Filled,
      };
    },
  });
</script>

<style lang="less"></style>
