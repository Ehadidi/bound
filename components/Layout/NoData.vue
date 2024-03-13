<template>
  <div class="flex-column flex-center p-3">
    <img src="~/assets/images/no_data.png" width="30%" alt="no data found" />

    <h6 v-if="msg" class="mt-4">{{ msg }}</h6>
    <h6 v-else class="mt-4">{{ $t("validate_msg.emptyFilterMessage") }}</h6>
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
