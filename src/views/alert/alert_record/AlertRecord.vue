<template>
  <div>
    <ACard :bordered="false">
      <div class="mb-4">
        <n-icon :component="DocumentError20Filled" class="text-purple-800 align-middle" size="38" />
        <h1 class="inline-block ml-2 align-middle" style="font-size: 18px">告警记录</h1>
      </div>
      <p> 查看当前告警记录信息</p>
    </ACard>
    <ACard class="mt-[15px]" :gradual="false">
      <!-- 操作栏 -->
      <div v-show="checkedRowKeys.length <= 0">
        <n-input-group class="w-[calc(100%-5.25rem)]">
          <AFilterSeekInput
            class="w-full"
            v-model:value="multipleSelectValue"
            :seek-option="seekOption"
          />
          <NButton type="primary" class="w-20" @click="page"> 查找 </NButton>
        </n-input-group>
      </div>
      <div v-show="checkedRowKeys.length > 0">
        <div class="inline-block">
          <NButton type="error" class="w-20" @click="onRecordDeleteTip"> 删除 </NButton>
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
  import { NButton, NIcon, NTag } from 'naive-ui';
  import { DocumentError20Filled, Delete24Regular } from '@vicons/fluent';
  import AFilterSeekInput from '@/components/AFilterSeekInput.vue';
  import ACard from '@/components/ACard.vue';
  import { useRouter } from 'vue-router';
  import recordapi from '@/api/record.js';
  import { useDialog } from 'naive-ui';

  const createSeekOptions = () => {
    return [
      {
        label: '规则名称',
        key: 'ruleName',
      },
    ];
  };

  export default defineComponent({
    name: 'AlertRecord',
    components: { AFilterSeekInput, ACard },
    setup() {
      const dialog = useDialog();
      const multipleSelectValue = ref([]);
      const seekSelect = ref(null);
      const router = useRouter();
      const checkedRowKeys = ref([]);
      const checkedRows = ref([]);
      const data = ref([]);
      const showModal = ref(false);
      const recordData = ref({
        name: '',
        type: '',
      });
      const formRef = ref(null);
      const pagination = reactive({
        pageSize: 10,
      });
      const is0EditAnd1Create = ref(0);
      const columns = [
        {
          type: 'selection',
        },
        {
          title: '规则名称',
          key: 'ruleName',
        },
        {
          title: '告警等级',
          key: 'severity',
        },
        {
          title: '概述',
          key: 'summary',
        },
        {
          title: '值',
          key: 'value',
        },
        {
          title: '属性',
          key: 'attribute',
        },
        {
          title: '创建时间',
          key: 'createTime',
          render(row) {
            return h(
              'div',
              {},
              {
                default: () => {
                  let data = new Date(row.createTime);
                  return data?.toLocaleString();
                },
              }
            );
          },
        },
        {
          title: '操作',
          key: 'actions',
          render(row) {
            return [
              h(
                NButton,
                {
                  type: 'error',
                  size: 'small',
                  style: { margin: '2px' },
                  onClick: () => onRecordDeleteTip(row),
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

      const page = (pagedata) => {
        recordapi
          .page({
            page: pagedata && typeof pagedata === 'number' ? pagedata : 1,
            size: pagination.pageSize,
            filters: multipleSelectValue.value,
          })
          .then((res) => {
            if (res.code == 0) {
              data.value = res.data.dataList;
              pagination.itemCount = res.data.total;
              pagination.pageCount = Math.ceil(res.data.total / pagination.pageSize);
            }
          });
      };

      const onRecordDeleteTip = (row) => {
        let ids = [];
        let names = [];
        if (row.id) {
          checkedRows.value = [];
          checkedRowKeys.value = [];
          ids.push(row.id);
          names.push(row.ruleName);
        }
        ids.push(...checkedRowKeys.value);
        for (let index = 0; index < checkedRows.value.length; index++) {
          names.push(checkedRows.value[index].ruleName);
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
            onRecordDelete(ids);
          },
        });
      };

      const onRecordDelete = (ids) => {
        if (ids.length > 0) {
          recordapi.deletes(ids).then((res) => {
            if (res.code == 0) {
              page();
              checkedRowKeys.value = [];
              window.$message.success('删除成功');
            }
          });
        }
      };

      const onSeek = () => {
        // eslint-disable-next-line no-console
        console.log(multipleSelectValue.value);
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
        is0EditAnd1Create,
        showModal,
        recordData,
        formRef,
        onRecordDeleteTip,
        onRecordDelete,
        page,
        onSeek,
        DocumentError20Filled,
        Delete24Regular,
      };
    },
  });
</script>

<style lang="less">
  .model-header {
    display: flex;
    color: black;
    font-size: 20px;
    background: linear-gradient(to right, white, #c4b5fd);
  }
</style>
