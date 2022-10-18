<template>
  <div>
    <ACard :bordered="false">
      <div class="mb-4">
        <n-icon :component="TabProhibited24Filled" class="text-purple-800 align-middle" size="38" />
        <h1 class="inline-block ml-2 align-middle" style="font-size: 18px">告警静默</h1>
      </div>
      <p> 设置告警静默信息</p>
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
        <div class="inline-block">
          <NButton
            type="primary"
            class="w-20 left-1"
            @click="
              () => {
                (showModal = true), (is0EditAnd1Create = 1), (silenceData = { type: 'block' });
              }
            "
          >
            新增
          </NButton>
        </div>
      </div>
      <div v-show="checkedRowKeys.length > 0">
        <div class="inline-block">
          <NButton type="error" class="w-20" @click="onSilenceDeleteTip"> 删除 </NButton>
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
    <n-modal v-model:show="showModal" class="w-[600px]" :mask-closable="false" preset="card">
      <template #header>
        <div class="model-header items-center">
          <NIcon
            v-if="is0EditAnd1Create == 1"
            size="26"
            class="text-purple-800 mr-2"
            :component="Add12Filled"
          />
          <NIcon
            v-if="is0EditAnd1Create == 0"
            size="26"
            class="text-purple-800 mr-2"
            :component="Edit16Filled"
          />
          <div v-if="is0EditAnd1Create == 1">新增告警用户</div>
          <div v-if="is0EditAnd1Create == 0">修改告警用户</div>
        </div>
      </template>
      <div class="mt-5">
        <n-form
          ref="formRef"
          :model="silenceData"
          :rules="rules"
          :label-width="100"
          label-placement="left"
          :style="{
            maxWidth: '780px',
          }"
        >
          <n-form-item label="静默名称:" path="name">
            <n-input class="w-9" v-model:value="silenceData.name" placeholder="请输入静默名称" />
          </n-form-item>
          <n-form-item label="静默类型:" path="type">
            <n-select
              v-model:value="silenceData.type"
              placeholder="请输入静默类型"
              :options="silenceTypeOptions"
            />
          </n-form-item>
          <n-form-item label="静默开始时间:" path="startTime">
            <n-date-picker
              v-if="silenceData.type == 'block'"
              class="w-full"
              v-model:value="silenceData.startTime"
              placeholder="请输入静默开始时间"
              format="yyyy/MM/dd HH:mm:ss"
              type="datetime"
              clearable
            />
            <n-date-picker
              v-if="silenceData.type == 'everyday'"
              class="w-full"
              v-model:value="silenceData.startTime"
              placeholder="请输入静默开始时间"
              type="date"
              clearable
            />
            <n-input v-if="silenceData.type == 'offday'" placeholder="周六" disabled />
          </n-form-item>
          <n-form-item label="静默结束时间:" path="endTime">
            <n-date-picker
              v-if="silenceData.type == 'block'"
              class="w-full"
              v-model:value="silenceData.endTime"
              placeholder="请输入静默结束时间"
              format="yyyy/MM/dd HH:mm:ss"
              type="datetime"
              clearable
            />
            <n-date-picker
              v-if="silenceData.type == 'everyday'"
              class="w-full"
              v-model:value="silenceData.endTime"
              placeholder="请输入静默结束时间"
              type="date"
              clearable
            />
            <n-input v-if="silenceData.type == 'offday'" placeholder="周日" disabled />
          </n-form-item>
          <n-form-item label="备注:" path="description">
            <n-input class="w-9" v-model:value="silenceData.description" placeholder="请输入备注" />
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <div class="flex justify-end w-full">
          <NButton class="w-20 m-1" @click="showModal = false"> 取消 </NButton>
          <NButton
            v-if="is0EditAnd1Create == 1"
            type="primary"
            class="w-20 m-1"
            @click="onSilenceCreate"
          >
            确定
          </NButton>
          <NButton
            v-if="is0EditAnd1Create == 0"
            type="primary"
            class="w-20 m-1"
            @click="onSilenceEdit"
          >
            确定
          </NButton>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script>
  import { h, defineComponent, ref, onMounted, reactive } from 'vue';
  import { NButton, NIcon, NTag } from 'naive-ui';
  import {
    TabProhibited24Filled,
    Add12Filled,
    Delete24Regular,
    Edit16Filled,
  } from '@vicons/fluent';
  import AFilterSeekInput from '@/components/AFilterSeekInput.vue';
  import ACard from '@/components/ACard.vue';
  import { useRouter } from 'vue-router';
  import silenceapi from '@/api/silence.js';
  import { useDialog } from 'naive-ui';

  const createSeekOptions = () => {
    return [
      {
        label: '静默名称',
        key: 'name',
      },
      {
        label: '静默类型',
        key: 'type',
      },
    ];
  };

  const silenceTypeOptions = [
    {
      label: '时间段',
      value: 'block',
    },
    {
      label: '每天',
      value: 'everyday',
    },
    {
      label: '休息日',
      value: 'offday',
    },
  ];

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
    name: 'AlertSilence',
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
      const silenceData = ref({
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
          title: '静默名称',
          key: 'name',
        },
        {
          title: '静默类型',
          key: 'type',
          render(row) {
            return h(
              NTag,
              {
                type: 'info',
                bordered: false,
              },
              {
                default: () => {
                  switch (row.type) {
                    case 'everyday':
                      return '每天';
                    case 'block':
                      return '时间段';
                    case 'offday':
                      return '休息日';
                  }
                },
              }
            );
          },
        },
        {
          title: '静默开始时间',
          key: 'startTime',
          render(row) {
            return h(
              'div',
              {},
              {
                default: () => {
                  let data = new Date(row.startTime);
                  switch (row.type) {
                    case 'everyday':
                      return data.toLocaleTimeString();
                    case 'block':
                      return data.toLocaleString();
                    case 'offday':
                      return '周六';
                  }
                },
              }
            );
          },
        },
        {
          title: '静默结束时间',
          key: 'endTime',
          render(row) {
            return h(
              'div',
              {},
              {
                default: () => {
                  let data = new Date(row.endTime);
                  switch (row.type) {
                    case 'everyday':
                      return data.toLocaleTimeString();
                    case 'block':
                      return data.toLocaleString();
                    case 'offday':
                      return '周日';
                  }
                },
              }
            );
          },
        },
        {
          title: '备注',
          key: 'description',
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
                    showModal.value = true;
                    is0EditAnd1Create.value = 0;
                    silenceData.value = { ...row };
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
                  onClick: () => onSilenceDeleteTip(row),
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
        silenceapi
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

      const onSilenceCreate = () => {
        formRef.value?.validate((errors) => {
          if (!errors) {
            silenceapi.create(silenceData.value).then((res) => {
              if (res.code == 0) {
                page();
                formRef.value.restoreValidation();
                silenceData.value = {};
                showModal.value = false;
                window.$message.success('添加成功');
              }
            });
          }
        });
      };

      const onSilenceEdit = () => {
        silenceapi.update(silenceData.value).then((res) => {
          if (res.code == 0) {
            page();
            formRef.value.restoreValidation();
            silenceData.value = {};
            showModal.value = false;
            window.$message.success('修改成功');
          }
        });
      };

      const onSilenceDeleteTip = (row) => {
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
            onSilenceDelete(ids);
          },
        });
      };

      const onSilenceDelete = (ids) => {
        if (ids.length > 0) {
          silenceapi.deletes(ids).then((res) => {
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
        silenceData,
        rules,
        formRef,
        silenceTypeOptions,
        onSilenceCreate,
        onSilenceDeleteTip,
        onSilenceDelete,
        page,
        onSeek,
        onSilenceEdit,
        TabProhibited24Filled,
        Add12Filled,
        Delete24Regular,
        Edit16Filled,
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
