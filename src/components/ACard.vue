<template>
  <n-card :class="{ 'box-gradual': gradual }">
    <div class="container-header"></div>
    <slot></slot>
    <div class="container-footer"></div>
  </n-card>
</template>
<script>
  import { defineComponent } from 'vue';
  export default defineComponent({
    props: {
      gradual: {
        type: Boolean,
        default: true,
      },
    },
  });
</script>
<style lang="less">
  .container-header {
    &::before {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      top: 0;
      left: 0;
      border-top: 2px solid #6d28d9;
      border-left: 2px solid #6d28d9;
    }
    &::after {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      top: 0;
      right: 0;
      border-top: 2px solid #6d28d9;
      border-right: 2px solid #6d28d9;
    }
  }
  .container-footer {
    &::before {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      bottom: 0;
      left: 0;
      border-bottom: 2px solid #6d28d9;
      border-left: 2px solid #6d28d9;
    }
    &::after {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      bottom: 0;
      right: 0;
      border-bottom: 2px solid #6d28d9;
      border-right: 2px solid #6d28d9;
    }
  }
  .box-gradual {
    background: linear-gradient(to right, white, #a78bfa);
  }
</style>
