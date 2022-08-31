<template>
  <n-layout class="layout" has-sider>
    <n-layout-sider>
      <Menu />
    </n-layout-sider>
    <n-layout>
      <RouterView />
    </n-layout>
  </n-layout>
</template>

<script setup>
  import Menu from '../components/AMenu.vue';
</script>
