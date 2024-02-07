<template>
  <div class="mb-3">
    <textarea
      :id="id"
      :rows="rows"
      v-model="model[name]"
      class="form-control"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  rows: {
    type: Number,
    default: 3,
  },
  model: {
    type: [Array, Object, String],
  },
  name: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});
</script>
