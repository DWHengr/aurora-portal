<template>
  <n-layout class="layout" has-sider>
    <n-layout-sider
      collapse-mode="width"
      width="230"
      :inverted="true"
      :collapsed="collapsed"
      :collapsed-width="64"
      @collapse="collapsed = true"
      @expand="collapsed = false"
      :native-scrollbar="false"
      class="layout-sider"
    >
      <ALogo :collapsed="collapsed" />
      <AMenu v-model:collapsed="collapsed" :menus="menus" />
    </n-layout-sider>
    <n-layout>
      <n-layout-content class="layout-content layout-default-background">
        <n-layout-header>
          <APageHeader v-model:collapsed="collapsed" />
        </n-layout-header>
        <div class="layout-content-main">
          <div class="main-view">
            <RouterView />
          </div>
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup>
  import AMenu from '@/components/AMenu.vue';
  import ALogo from '@/components/ALogo.vue';
  import { menus } from './js/menu';
  import { ref } from 'vue';
  import APageHeader from '@/components/APageHeader.vue';
  import { useMessage } from 'naive-ui';

  const collapsed = ref(true);
  window.$message = useMessage();
</script>

<style lang="less">
  .layout {
    display: flex;
    flex-direction: row;
    flex: auto;

    &-default-background {
      background: #f5f7f9;
    }

    .layout-sider {
      min-height: 100vh;
      box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
      position: relative;
      z-index: 13;
      transition: all 0.2s ease-in-out;
    }

    .layout-sider-fix {
      position: fixed;
      top: 0;
      left: 0;
    }

    .ant-layout {
      overflow: hidden;
    }

    .layout-right-fix {
      overflow-x: hidden;
      padding-left: 200px;
      min-height: 100vh;
      transition: all 0.2s ease-in-out;
    }

    .layout-content {
      flex: auto;
      min-height: 100vh;
    }

    .n-layout-header.n-layout-header--absolute-positioned {
      z-index: 11;
    }

    .n-layout-footer {
      background: none;
    }
  }

  .layout-content-main {
    margin: 0 10px 10px;
    position: relative;
    padding-top: 15px;
  }

  .layout-content-main-fix {
    padding-top: 64px;
  }

  .fluid-header {
    padding-top: 0;
  }

  .main-view-fix {
    padding-top: 44px;
  }

  .noMultiTabs {
    padding-top: 0;
  }
</style>
