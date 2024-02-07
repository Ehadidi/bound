<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="check_group">
    <div class="check-box">
      <div class="form-check">
        <input :name="name" :id="inputId" :value="option" v-model="model[name]" :class="InputClass" class="form-check-input" type="checkbox" />
        <label class="form-check-label fw-bold" :for="inputId">
          {{ label }}
        </label>
      </div>
    </div>
  </div>
  <!-- <div class="form-check mb-2">
    <input
      :id="inputId"
      :value="option"
      v-model="model[name]"
      class="form-check-input"
      type="checkbox"
    />
    <label class="form-check-label fw-bold" :for="inputId">
      {{ label }}
    </label>
  </div> -->
</template>

<script setup>
const props = defineProps({
  inputId: {
    required: true,
    type: String,
  },
  label: {
    required: true,
    type: String,
  },
  model: {
    type: [Object, Array],
  },
  name: {
    type: String,
    default: "",
  },
  InputClass: {
    type: String,
    default: "",
  },
  option: {
    type: String,
    default: "",
  },
});
</script>

<style>
.check_group{
  display: flex;
  align-items: center;
}
</style>