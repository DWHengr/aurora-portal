<template>
  <NConfigProvider :theme-overrides="ThemeOverrides" :locale="zhCN" :date-locale="dateZhCN">
    <NMessageProvider class="bg-purple-50">
      <NDialogProvider>
        <RouterView />
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup>
  import { zhCN, dateZhCN } from 'naive-ui';
  const ThemeOverrides = {
    common: {
      primaryColor: '#8b5cf6',
      primaryColorHover: '#6d28d9',
      primaryColorPressed: '#6d28d9',
      primaryColorSuppl: '#6d28d9',
      borderRadius: '5px',
      iconColor: '#6d28d9',
      fontWeight: 600,
    },
    Message: {
      iconColorSuccess: '#6d28d9',
    },
    Tag: {
      colorInfo: '#ddd6fe',
      textColorInfo: '#6d28d9',
    },
    Dialog: {
      iconColorWarning: '#6d28d9',
      peers: {
        Button: {
          colorWarning: '#8b5cf6',
          colorHoverWarning: '#6d28d9',
          colorPressedWarning: '#6d28d9',
          colorFocusWarning: '#6d28d9',
          borderWarning: '#8b5cf6',
          borderHoverWarning: '#8b5cf6',
          borderPressedWarning: '#8b5cf6',
          borderFocusWarning: '#8b5cf6',
        },
      },
    },
    DataTable: {
      tdColorHover: '#e5e0ff',
    },
  };
</script>

<style></style>
