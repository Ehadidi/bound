<template>
  <div v-if="showSplash" class="splash">
    <!-- Your loading splash content -->
    <img src="@/assets/images/logo.png" class="logo" alt="logo" />
  </div>
  <div v-else class="layout-app">
    <Toast />
    <LayoutHeader />
    <div class="page-content">
      <NuxtPage />
    </div>
    <LayoutFooter />
  </div>
</template>
<script setup>
import Toast from 'primevue/toast';
// ================================================================================ imports
const showSplash = ref(true);
// ================================================================================ data

// ================================================================================ methods

// ================================================================================ lifecycle hooks
onMounted(() => {
  setTimeout(() => {
    showSplash.value = false;
  }, 1000);
});
</script>
<style lang="scss">
.splash {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
</style>
  