<template>
  <n-scrollbar :style="{ 'max-height': screenHeight + 'px' }">
    <div>
      <a-card>
        <div class="flex items-center">
          <NButton type="primary" size="medium" @click="onBaackRulePage">
            <n-icon :component="ArrowReply20Filled" class="mr-2" size="22" />
            返回告警规则页面
          </NButton>
          <div class="cut-off"></div>
          <p class="text-16px font-medium"> {{ title }}</p>
        </div>
      </a-card>
      <a-card :gradual="false" class="mt-[15px]">
        <n-form
          ref="formRef"
          :model="ruleData"
          :rules="rules"
          :label-width="120"
          label-placement="left"
          :style="{
            maxWidth: '700px',
          }"
        >
          <p class="divide-label">基本信息</p>
          <n-form-item label="名称:" path="name">
            <n-input class="w-9" v-model:value="ruleData.name" placeholder="请输入规则名称" />
          </n-form-item>
          <n-form-item label="告警等级:" path="severity">
            <n-select
              v-model:value="ruleData.severity"
              placeholder="请选择告警等级"
              :options="severityTypeOptions"
            />
          </n-form-item>
          <n-form-item label="告警静默:" path="alertSilencesId">
            <n-select
              v-model:value="ruleData.alertSilencesId"
              placeholder="请选择告警静默"
              :options="silenceOptions"
            />
          </n-form-item>
          <p class="divide-label">告警对象</p>
          <n-dynamic-input
            class="pl-[120px]"
            v-model:value="ruleData.alertObjectArr"
            item-style="margin-bottom: 0;"
            :on-create="onCreateAlertObject"
          >
            <template #create-button-default> 增加告警对象键值对 </template>
            <template #default="{ index }">
              <div style="display: flex">
                <n-form-item
                  ignore-path-change
                  :show-label="false"
                  :path="`alertObjectArr[${index}].name`"
                  :rule="dynamicInputRule"
                >
                  <n-input
                    v-model:value="ruleData.alertObjectArr[index].name"
                    placeholder="key"
                    @keydown.enter.prevent
                  />
                </n-form-item>
                <div style="height: 34px; line-height: 34px; margin: 0 8px"> = </div>
                <n-form-item
                  ignore-path-change
                  :show-label="false"
                  :path="`alertObjectArr[${index}].value`"
                  :rule="dynamicInputRule"
                >
                  <n-input
                    v-model:value="ruleData.alertObjectArr[index].value"
                    placeholder="Value"
                    @keydown.enter.prevent
                  />
                </n-form-item>
              </div>
            </template>
          </n-dynamic-input>
          <p class="divide-label">告警规则</p>
          <div>
            <div>
              <n-form-item label="间隔时间(m):" path="alertInterval">
                <ATimeInputVue
                  class="w-9"
                  v-model:value="ruleData.alertInterval"
                  placeholder="请输入告警间隔时间"
                />
              </n-form-item>
            </div>
            <div class="flex justify-end"
              >告警规则：满足以下指标判断条件，且告警规则持续时间
              <n-form-item class="w-36 inline-block" path="persistent">
                <ATimeInputVue v-model:value="ruleData.persistent" /> </n-form-item
              >，则触发。</div
            >
            <div>
              <n-dynamic-input
                class="pl-[120px]"
                v-model:value="ruleData.rulesArr"
                item-style="margin-bottom: 0;"
                :on-create="onCreateAlertMetric"
              >
                <template #create-button-default>新增告警指标 </template>
                <template #default="{ index }">
                  <div style="display: flex">
                    <n-form-item
                      ignore-path-change
                      :show-label="false"
                      class="w-38"
                      :path="`rulesArr[${index}].metricId`"
                    >
                      <n-select
                        v-model:value="ruleData.rulesArr[index].metricId"
                        placeholder="告警指标"
                        filterable
                        :options="metricsOptions"
                        @update:value="
                          (id, row) => onMetricSelectUpdate(row, ruleData.rulesArr[index])
                        "
                      />
                    </n-form-item>
                    <n-form-item
                      class="w-40"
                      ignore-path-change
                      :show-label="false"
                      :path="`rulesArr[${index}].statistics`"
                      :rule="dynamicInputRule"
                    >
                      <ATimeInputVue
                        v-model:value="ruleData.rulesArr[index].statistics"
                        placeholder="统计时间"
                      />
                    </n-form-item>
                    <n-form-item
                      class="w-20"
                      ignore-path-change
                      :show-label="false"
                      :path="`rulesArr[${index}].operator`"
                      :rule="dynamicInputRule"
                    >
                      <n-select
                        v-model:value="ruleData.rulesArr[index].operator"
                        placeholder="操作符"
                        :options="ruleData.rulesArr[index].operOption"
                      />
                    </n-form-item>
                    <n-form-item
                      class="w-26"
                      ignore-path-change
                      :show-label="false"
                      :path="`rulesArr[${index}].alertValue`"
                      :rule="dynamicInputRule"
                    >
                      <n-input
                        v-model:value="ruleData.rulesArr[index].alertValue"
                        placeholder="告警值"
                        :allow-input="(value) => !value || /^\d+$/.test(value)"
                        @keydown.enter.prevent
                      >
                        <template #suffix> {{ ruleData.rulesArr[index].unit }} </template>
                      </n-input>
                    </n-form-item>
                  </div>
                </template>
              </n-dynamic-input>
            </div>
          </div>
          <p class="divide-label">告警通知</p>
          <n-form-item label="告警通知组:" path="userGroupIdsArr">
            <n-select
              v-model:value="ruleData.userGroupIdsArr"
              multiple
              :options="userGroupIdsOption"
            />
          </n-form-item>
          <n-form-item label="回调接口:" path="webhook">
            <n-input
              class="w-9"
              type="textarea"
              maxlength="120"
              show-count
              :autosize="{
                minRows: 2,
                maxRows: 2,
              }"
              v-model:value="ruleData.webhook"
              placeholder="请输入回调接口"
            />
          </n-form-item>
          <div class="flex justify-center">
            <NButton class="w-80px" @click="onBaackRulePage"> 返回 </NButton>
            <NButton class="ml-20px w-80px" @click="onCreateRule" type="primary"> 保存 </NButton>
          </div>
        </n-form>
      </a-card>
    </div>
  </n-scrollbar>
</template>

<script>
  import { ArrowReply20Filled } from '@vicons/fluent';
  import { defineComponent, ref, onMounted } from 'vue';
  import ACard from '@/components/ACard.vue';
  import ATimeInputVue from '@/components/ATimeInput.vue';
  import { useRouter } from 'vue-router';
  import silenceapi from '@/api/silence.js';
  import metricapi from '@/api/metric.js';
  import usergroupapi from '@/api/userGroup.js';
  import ruleapi from '@/api/rule.js';
  const severityTypeOptions = [
    {
      label: '提示',
      value: 'hint',
    },
    {
      label: '次要',
      value: 'minor',
    },
    {
      label: '严重',
      value: 'importance',
    },
    {
      label: '紧急',
      value: 'urgency',
    },
  ];
  export default defineComponent({
    components: { ACard, ATimeInputVue },
    setup() {
      let router = useRouter();
      let screenHeight = ref(window.innerHeight - 89);
      let silenceOptions = ref([]);
      let metricsOptions = ref([]);
      let userGroupIdsOption = ref([]);
      let title = ref('创建告警规则');
      let ruleData = ref({
        name: null,
        severity: null,
        webhook: null,
        alertSilencesId: null,
        description: null,
        persistent: null,
        alertInterval: null,
        rulesStatus: 1,
        alertObjectArr: [],
        rulesArr: [],
      });

      onMounted(() => {
        isRuleEdit(router.currentRoute.value.query.ruleId);
        window.onresize = () => {
          screenHeight.value = window.innerHeight - 89;
        };
        getAllSilences();
        getAllMetrics();
        getAllUserGroupIds();
      });

      const isRuleEdit = (id) => {
        if (id) {
          title.value = '修改告警规则';
          ruleapi.details(id).then((res) => {
            if (res.code == 0) {
              for (let index = 0; index < res.data.rulesArr?.length; index++) {
                let item = res.data.rulesArr[index];
                let operOption = [];
                let operArr = item.operator.split(',');
                for (let index = 0; index < operArr.length; index++) {
                  operOption.push({ label: operArr[index], value: operArr[index] });
                }
                item.operOption = operOption;
              }
              ruleData.value = res.data;
            }
          });
        }
      };

      const getAllSilences = () => {
        silenceapi.all().then((res) => {
          if (res.code == 0) {
            let options = [];
            for (let index = 0; index < res.data?.length; index++) {
              let item = res.data[index];
              options.push({
                label: item.name,
                value: item.id,
              });
            }
            silenceOptions.value = options;
          }
        });
      };

      const getAllUserGroupIds = () => {
        usergroupapi.all().then((res) => {
          if (res.code == 0) {
            let options = [];
            for (let index = 0; index < res.data?.length; index++) {
              let item = res.data[index];
              options.push({
                label: item.name,
                value: item.id,
              });
            }
            userGroupIdsOption.value = options;
          }
        });
      };

      const getAllMetrics = () => {
        metricapi.all().then((res) => {
          if (res.code == 0) {
            let options = [];
            for (let index = 0; index < res.data?.length; index++) {
              let item = res.data[index];
              options.push({
                label: item.name,
                value: item.id,
                unit: item.unit,
                operator: item.operator,
              });
            }
            metricsOptions.value = options;
          }
        });
      };

      const onBaackRulePage = () => {
        router.push({ name: 'rule' });
      };

      const onCreateRule = () => {
        if (router.currentRoute.value.query.ruleId) {
          ruleapi.update(ruleData.value).then((res) => {
            if (res.code == 0) {
              window.$message.success('修改成功');
            }
          });
        } else {
          ruleData.value.rulesStatus = 1;
          ruleapi.create(ruleData.value).then((res) => {
            if (res.code == 0) {
              window.$message.success('添加成功');
              ruleData.value = {
                name: null,
                severity: null,
                webhook: null,
                alertSilencesId: null,
                description: null,
                persistent: null,
                alertInterval: null,
                rulesStatus: null,
                alertObjectArr: [],
                userGroupIdsArr: [],
                rulesArr: [],
              };
            }
          });
        }
      };

      const onCreateAlertObject = () => {
        return {
          name: '',
          value: '',
        };
      };

      const onCreateAlertMetric = () => {
        return {
          metricId: null,
          statistics: null,
          operator: null,
          alertValue: '',
        };
      };

      const onMetricSelectUpdate = (row, data) => {
        data.unit = row.unit;
        let operOption = [];
        let operArr = row.operator.split(',');
        for (let index = 0; index < operArr.length; index++) {
          operOption.push({ label: operArr[index], value: operArr[index] });
        }
        data.operOption = operOption;
      };
      return {
        ruleData,
        screenHeight,
        severityTypeOptions,
        silenceOptions,
        metricsOptions,
        title,
        userGroupIdsOption,
        onBaackRulePage,
        onCreateRule,
        onCreateAlertObject,
        onCreateAlertMetric,
        onMetricSelectUpdate,
        ArrowReply20Filled,
      };
    },
  });
</script>
<style lang="less">
  .cut-off {
    content: '';
    border-left: 1px solid rgb(45, 66, 97);
    margin-left: 10px;
    margin-right: 10px;
    height: 30px;
    width: 0px;
  }
  .divide-label {
    margin-top: 8px;
    margin-bottom: 20px;
    font-size: 16px;
    &::before {
      content: '';
      border-left: 5px solid #6d28d9;
      margin-right: 3px;
    }
  }
</style>
