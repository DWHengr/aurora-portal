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
          :model="model"
          :rules="rules"
          :label-width="100"
          label-placement="left"
          :style="{
            maxWidth: '640px',
          }"
        >
          <p class="divide-label">基本信息</p>
          <n-form-item label="名称:" path="inputValue">
            <n-input class="w-9" v-model:value="model.inputValue" placeholder="请输入规则名称" />
          </n-form-item>
          <n-form-item label="告警等级:" path="inputValue">
            <n-input class="w-9" v-model:value="model.inputValue" placeholder="请输入规则名称" />
          </n-form-item>
          <n-form-item label="回调接口:" path="inputValue">
            <n-input class="w-9" v-model:value="model.inputValue" placeholder="请输入规则名称" />
          </n-form-item>
          <p class="divide-label">告警对象</p>
          <n-form-item label="名称:" path="inputValue">
            <n-input class="w-9" v-model:value="model.inputValue" placeholder="请输入规则名称" />
          </n-form-item>
          <n-form-item label="告警等级:" path="inputValue">
            <n-input class="w-9" v-model:value="model.inputValue" placeholder="请输入规则名称" />
          </n-form-item>
          <n-form-item label="回调接口:" path="inputValue">
            <n-input class="w-9" v-model:value="model.inputValue" placeholder="请输入规则名称" />
          </n-form-item>
          <p class="divide-label">告警规则</p>
          <n-form-item label="名称:" path="inputValue">
            <n-input class="w-9" v-model:value="model.inputValue" placeholder="请输入规则名称" />
          </n-form-item>
          <n-form-item label="告警等级:" path="inputValue">
            <n-input class="w-9" v-model:value="model.inputValue" placeholder="请输入规则名称" />
          </n-form-item>
          <n-form-item label="回调接口:" path="inputValue">
            <n-input class="w-9" v-model:value="model.inputValue" placeholder="请输入规则名称" />
          </n-form-item>
          <p class="divide-label">告警规则</p>
          <n-form-item label="名称:" path="inputValue">
            <n-input class="w-9" v-model:value="model.inputValue" placeholder="请输入规则名称" />
          </n-form-item>
          <n-form-item label="告警等级:" path="inputValue">
            <n-input class="w-9" v-model:value="model.inputValue" placeholder="请输入规则名称" />
          </n-form-item>
          <n-form-item label="回调接口:" path="inputValue">
            <n-input class="w-9" v-model:value="model.inputValue" placeholder="请输入规则名称" />
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
  export default defineComponent({
    components: { ACard },
    setup() {
      let router = useRouter();
      let screenHeight = ref(window.innerHeight - 89);

      let model = ref({
        name: null,
        severity: null,
        webhook: null,
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
      return {
        model,
        screenHeight,
        onBaackRulePage,
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
