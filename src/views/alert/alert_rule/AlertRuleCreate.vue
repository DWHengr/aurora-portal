<template>
  <div>
    <a-card>
      <div class="flex items-center">
        <NButton type="primary" size="medium" @click="onRuleCreate">
          <n-icon :component="ArrowReply20Filled" class="mr-2" size="22" />
          返回告警规则页面
        </NButton>
        <div class="cut-off"></div>
        <p class="text-16px font-medium"> 创建告警规则</p>
      </div>
    </a-card>
  </div>
</template>

<script>
  import { ArrowReply20Filled } from '@vicons/fluent';
  import { defineComponent } from 'vue';
  import ACard from '@/components/ACard.vue';
  export default defineComponent({
    components: { ACard },
    setup() {
      return {
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
</style>
