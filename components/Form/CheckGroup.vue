<template>
  <FormCheckbox
    v-for="(option, index) in options"
    :option="option.name"
    :label="option.label"
    :key="option"
    :model="model"
    :name="name"
    :input-id="option.name"
  />
</template>

<script setup>
const props = defineProps({
  options: {
    required: true,
    type: Array
  },
  name: {
    required: true,
    type: String,
    default: ''
  },
  model: {
    type: [Array, Object]
  }
})
</script>
