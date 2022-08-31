<template>
  <NConfigProvider :theme-overrides="ThemeOverrides">
    <RouterView />
  </NConfigProvider>
</template>

<script setup>
  const ThemeOverrides = {
    common: {
      primaryColor: '#8b5cf6',
      primaryColorHover: '#6d28d9',
      borderRadius: '5px',
      fontWeight: 600,
    },
  };
</script>

<style></style>
