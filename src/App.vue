<template>
  <NConfigProvider :theme-overrides="ThemeOverrides">
    <NMessageProvider>
      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup>
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
  };
</script>

<style></style>
