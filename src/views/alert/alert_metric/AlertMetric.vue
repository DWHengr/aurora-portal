<template>
  <div>
    <ACard :bordered="false">
      <div class="mb-4">
        <n-icon
          :component="BarcodeScanner24Filled"
          class="text-purple-800 align-middle"
          size="38"
        />
        <h1 class="inline-block ml-2 align-middle" style="font-size: 18px">告警指标</h1>
      </div>
      <p> 设置告警指标信息</p>
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
          <NButton
            type="primary"
            class="w-20 left-1"
            @click="
              () => {
                (showModal = true),
                  (is0EditAnd1Create = 1),
                  (metricData = {}),
                  (verifyMetricStatus = ''),
                  (verifyMetricValue = '');
              }
            "
          >
            新增
          </NButton>
        </div>
      </div>
      <div v-show="checkedRowKeys.length > 0">
        <div class="inline-block">
          <NButton type="error" class="w-20" @click="onMetricDeleteTip"> 删除 </NButton>
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
          <div v-if="is0EditAnd1Create == 1">新增告警指标</div>
          <div v-if="is0EditAnd1Create == 0">修改告警指标</div>
        </div>
      </template>
      <div class="mt-5">
        <n-form
          ref="formRef"
          :model="metricData"
          :rules="rules"
          :label-width="100"
          label-placement="left"
          :style="{
            maxWidth: '780px',
          }"
        >
          <n-form-item label="指标名称:" path="name">
            <n-input class="w-9" v-model:value="metricData.name" placeholder="请输入指标名称" />
          </n-form-item>
          <n-form-item label="指标类型:" path="type">
            <n-input class="w-9" v-model:value="metricData.type" placeholder="请输入指标类型" />
          </n-form-item>
          <n-form-item label="表达式:" :validation-status="verifyMetricStatus" path="expression">
            <n-input class="w-9" v-model:value="metricData.expression" placeholder="请输入表达式">
              <template #suffix>
                <n-button size="tiny" type="primary" @click="onVerifyMetric"> 验证 </n-button>
              </template>
            </n-input>
            <template #feedback>
              {{ verifyMetricValue }}
            </template>
          </n-form-item>
          <n-form-item label="单位:" path="unit">
            <n-input class="w-9" v-model:value="metricData.unit" placeholder="请输入单位" />
          </n-form-item>
          <n-form-item label="操作符:" path="operatorArr">
            <n-select
              v-model:value="metricData.operatorArr"
              placeholder="请选择操作符"
              :options="operatorOption"
              multiple
            />
          </n-form-item>
          <n-form-item label="备注:" path="description">
            <n-input
              class="w-9"
              type="textarea"
              maxlength="100"
              show-count
              :autosize="{
                minRows: 3,
                maxRows: 3,
              }"
              v-model:value="metricData.description"
              placeholder="请输入备注"
            />
          </n-form-item>
        </n-form>
        <n-modal v-model:show="showMeticsDetailsModal" class="w-[800px]" preset="card">
          >l
        </n-modal>
      </div>
      <template #action>
        <div class="flex justify-end w-full">
          <NButton class="w-20 m-1" @click="showModal = false"> 取消 </NButton>
          <NButton
            v-if="is0EditAnd1Create == 1"
            type="primary"
            class="w-20 m-1"
            @click="onMetricCreate"
          >
            确定
          </NButton>
          <NButton
            v-if="is0EditAnd1Create == 0"
            type="primary"
            class="w-20 m-1"
            @click="onMetricEdit"
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
  import { NButton, NIcon, NTag, NEllipsis } from 'naive-ui';
  import {
    BarcodeScanner24Filled,
    Add12Filled,
    Delete24Regular,
    Edit16Filled,
  } from '@vicons/fluent';
  import AFilterSeekInput from '@/components/AFilterSeekInput.vue';
  import ACard from '@/components/ACard.vue';
  import { useRouter } from 'vue-router';
  import metricapi from '@/api/metric.js';
  import { useDialog, useLoadingBar } from 'naive-ui';
  import { debounce } from 'lodash';

  const createSeekOptions = () => {
    return [
      {
        label: '指标名称',
        key: 'name',
      },
      {
        label: '指标类型',
        key: 'type',
      },
    ];
  };

  const operatorOption = [
    {
      label: '==',
      value: '==',
    },
    {
      label: '>',
      value: '>',
    },
    {
      label: '<',
      value: '<',
    },
    {
      label: '!=',
      value: '!=',
    },
    {
      label: '>=',
      value: '>=',
    },
    {
      label: '<=',
      value: '<=',
    },
  ];

  export default defineComponent({
    name: 'AlertMetric',
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
      const showMeticsDetailsModal = ref(false);
      const verifyMetricValue = ref('');
      const verifyMetricStatus = ref('');
      const metricData = ref({
        name: '',
        type: '',
      });
      const formRef = ref(null);
      const pagination = reactive({
        pageSize: 10,
      });
      const is0EditAnd1Create = ref(0);
      const loadingBar = useLoadingBar();
      const columns = [
        {
          type: 'selection',
        },
        {
          title: '指标名称',
          key: 'name',
        },
        {
          title: '指标类型',
          key: 'type',
        },
        {
          title: '表达式',
          key: 'expression',
        },
        {
          title: '单位',
          key: 'unit',
        },
        {
          title: '操作符',
          key: 'operator',
        },
        {
          title: '备注',
          key: 'description',
          render(row) {
            return h(
              NEllipsis,
              {
                style: 'max-width: 200px',
              },
              {
                default: () => row.description,
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
                  type: 'primary',
                  size: 'small',
                  style: { margin: '2px' },
                  onClick: () => {
                    showModal.value = true;
                    is0EditAnd1Create.value = 0;
                    verifyMetricStatus.value = '';
                    verifyMetricValue.value = '';
                    metricData.value = { ...row };
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
                  onClick: () => onMetricDeleteTip(row),
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

      const rules = {
        name: {
          required: true,
          message: '请输入指标名称',
          trigger: ['input', 'blur'],
        },
        type: {
          required: true,
          trigger: ['input', 'blur'],
          message: '请输入指标类型',
        },
        expression: {
          required: true,
          validator: () => onVerifyMetric(),
          trigger: ['blur'],
        },
        unit: {
          required: true,
          trigger: ['input', 'blur'],
          message: '请输入单位',
        },
        operatorArr: {
          type: 'array',
          required: true,
          message: '请输入操作符',
          trigger: ['blur', 'change'],
        },
      };

      onMounted(() => {
        page();
      });

      const page = (pagedata) => {
        loadingBar.finish();
        loadingBar.start();
        metricapi
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

      const onMetricCreate = debounce(() => {
        formRef.value?.validate((errors) => {
          if (!errors && verifyMetricStatus.value == 'success') {
            metricapi.create(metricData.value).then((res) => {
              if (res.code == 0) {
                page();
                formRef.value.restoreValidation();
                metricData.value = {};
                showModal.value = false;
                window.$message.success('添加成功');
              }
            });
          }
        });
      }, 600);

      const onMetricEdit = debounce(() => {
        formRef.value?.validate((errors) => {
          if (!errors && verifyMetricStatus.value == 'success') {
            metricapi.update(metricData.value).then((res) => {
              if (res.code == 0) {
                page();
                formRef.value.restoreValidation();
                metricData.value = {};
                showModal.value = false;
                window.$message.success('修改成功');
              }
            });
          }
        });
      }, 600);

      const onMetricDeleteTip = (row) => {
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
            onMetricDelete(ids);
          },
        });
      };

      const onMetricDelete = (ids) => {
        if (ids.length > 0) {
          metricapi.deletes(ids).then((res) => {
            if (res.code == 0) {
              page();
              checkedRowKeys.value = [];
              window.$message.success('删除成功');
            }
          });
        }
      };

      const onVerifyMetric = () => {
        if (!metricData.value.expression) {
          verifyMetricStatus.value = 'error';
          verifyMetricValue.value = '请输入表达式';
          return;
        }
        let exp = metricData.value.expression;
        exp = exp?.replace('${}', '');
        exp = exp?.replace('$[]', '[1m]') + '==1';
        metricapi.verify(exp).then((res) => {
          if (res.code == 0) {
            let item = res.data;
            if (item.status == 'success') {
              verifyMetricStatus.value = 'success';
              if (!item.data.result || item.data.result.length <= 0) {
                verifyMetricValue.value = '测试表达式: ' + exp + ' 返回值为空';
              } else {
                let value = item.data.result[0].value[1];
                verifyMetricValue.value = '测试表达式: ' + exp + ' 返回值: ' + value;
              }
            } else if (item.status == 'error') {
              verifyMetricStatus.value = 'error';
              verifyMetricValue.value = item.error;
            }
          }
        });
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
        metricData,
        rules,
        formRef,
        operatorOption,
        showMeticsDetailsModal,
        verifyMetricValue,
        verifyMetricStatus,
        onMetricCreate,
        onMetricDeleteTip,
        onMetricDelete,
        page,
        onMetricEdit,
        onVerifyMetric,
        BarcodeScanner24Filled,
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
