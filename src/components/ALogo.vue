<template>
  <div class="logo">
    <img src="@/assets/logo.png" alt="" :class="{ 'mr-2': !collapsed }" />
    <div v-show="!collapsed" class="logo-title">Aurora</div>
  </div>
</template>

<script>
  export default {
    name: 'ALogo',
    props: {
      collapsed: {
        type: Boolean,
        default: true,
      },
    },
  };
</script>

<style lang="less" scoped>
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    line-height: 64px;
    overflow: hidden;
    white-space: nowrap;

    img {
      width: auto;
      height: 32px;
    }

    .logo-title {
      margin-bottom: 0;
    }
  }
</style>
