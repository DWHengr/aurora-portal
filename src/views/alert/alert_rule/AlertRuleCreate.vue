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
          <p class="text-16px font-medium"> 创建告警规则</p>
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
            maxWidth: '640px',
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
              :options="severityTypeOptions"
            />
          </n-form-item>
          <p class="divide-label">告警对象</p>
          <n-dynamic-input
            class="pl-[120px]"
            v-model:value="ruleData.alertObject"
            item-style="margin-bottom: 0;"
            :on-create="onCreateAlertObject"
          >
            <template #create-button-default> 增加告警对象键值对 </template>
            <template #default="{ index }">
              <div style="display: flex">
                <n-form-item
                  ignore-path-change
                  :show-label="false"
                  :path="`alertObject[${index}].name`"
                  :rule="dynamicInputRule"
                >
                  <n-input
                    v-model:value="ruleData.alertObject[index].name"
                    placeholder="key"
                    @keydown.enter.prevent
                  />
                </n-form-item>
                <div style="height: 34px; line-height: 34px; margin: 0 8px"> = </div>
                <n-form-item
                  ignore-path-change
                  :show-label="false"
                  :path="`alertObject[${index}].value`"
                  :rule="dynamicInputRule"
                >
                  <n-input
                    v-model:value="ruleData.alertObject[index].value"
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
                <n-input
                  class="w-9"
                  v-model:value="ruleData.alertInterval"
                  placeholder="请输入告警间隔时间"
                />
              </n-form-item>
            </div>
            <div class="flex justify-end"
              >告警规则：满足以下指标判断条件，且告警规则持续时间
              <n-form-item class="w-38 inline-block" path="selectValue">
                <n-select
                  v-model:value="ruleData.selectValue"
                  placeholder="告警规则持续时间"
                  :options="generalOptions"
                /> </n-form-item
              >，则触发。</div
            >
            <div>
              <n-dynamic-input
                class="pl-[120px]"
                v-model:value="ruleData.alertMetric"
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
                      :path="`alertMetric[${index}].metric_id`"
                    >
                      <n-select
                        v-model:value="ruleData.alertMetric[index].metric_id"
                        placeholder="告警指标"
                        :options="generalOptions"
                      />
                    </n-form-item>
                    <n-form-item
                      class="w-30"
                      ignore-path-change
                      :show-label="false"
                      :path="`alertMetric[${index}].statistics`"
                      :rule="dynamicInputRule"
                    >
                      <n-select
                        v-model:value="ruleData.alertMetric[index].statistics"
                        placeholder="统计时间"
                        :options="generalOptions"
                      />
                    </n-form-item>
                    <n-form-item
                      class="w-20"
                      ignore-path-change
                      :show-label="false"
                      :path="`alertMetric[${index}].operator`"
                      :rule="dynamicInputRule"
                    >
                      <n-select
                        v-model:value="ruleData.alertMetric[index].operator"
                        placeholder="操作符"
                        :options="generalOptions"
                      />
                    </n-form-item>
                    <n-form-item
                      class="w-20"
                      ignore-path-change
                      :show-label="false"
                      :path="`alertMetric[${index}].alert_value`"
                      :rule="dynamicInputRule"
                    >
                      <n-input
                        v-model:value="ruleData.alertMetric[index].alert_value"
                        placeholder="告警值"
                        @keydown.enter.prevent
                      />
                    </n-form-item>
                  </div>
                </template>
              </n-dynamic-input>
            </div>
          </div>
          <p class="divide-label">告警规则</p>
          <n-form-item label="名称:" path="inputValue">
            <n-input class="w-9" v-model:value="ruleData.inputValue" placeholder="请输入规则名称" />
          </n-form-item>
          <n-form-item label="告警等级:" path="inputValue">
            <n-input class="w-9" v-model:value="ruleData.inputValue" placeholder="请输入规则名称" />
          </n-form-item>
          <n-form-item label="回调接口:" path="inputValue">
            <n-input class="w-9" v-model:value="ruleData.inputValue" placeholder="请输入规则名称" />
          </n-form-item>
        </n-form>
      </a-card>
    </div>
  </n-scrollbar>
</template>

<script>
  import { ArrowReply20Filled } from '@vicons/fluent';
  import { defineComponent, ref, onMounted } from 'vue';
  import ACard from '@/components/ACard.vue';
  import { useRouter } from 'vue-router';
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
    components: { ACard },
    setup() {
      let router = useRouter();
      let screenHeight = ref(window.innerHeight - 89);

      let ruleData = ref({
        name: null,
        severity: null,
        webhook: null,
        alertObject: [],
        alertMetric: [],
      });

      onMounted(() => {
        window.onresize = () => {
          screenHeight.value = window.innerHeight - 89;
          // eslint-disable-next-line no-console
          console.log(window.innerHeight);
        };
      });

      const onBaackRulePage = () => {
        router.push({ name: 'rule' });
      };

      const onCreateAlertObject = () => {
        return {
          name: '',
          value: '',
        };
      };

      const onCreateAlertMetric = () => {
        return {
          metric_id: null,
          statistics: null,
          operator: null,
          alert_value: '',
        };
      };
      return {
        ruleData,
        screenHeight,
        severityTypeOptions,
        onBaackRulePage,
        onCreateAlertObject,
        onCreateAlertMetric,
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
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 16px;
    &::before {
      content: '';
      border-left: 5px solid #6d28d9;
      margin-right: 3px;
    }
  }
</style>
