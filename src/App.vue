<template>
  <NConfigProvider :theme-overrides="ThemeOverrides">
    <NMessageProvider>
      <NDialogProvider>
        <RouterView />
      </NDialogProvider>
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
  };
</script>

<style></style>
