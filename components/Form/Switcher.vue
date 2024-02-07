<template>
  <div class="form-check form-switch">
    <input
      class="form-check-input form-check-md"
      type="checkbox"
      v-model="model[name]"
      :id="id"
      @change="toggle"
    />
    <label class="form-check-label" :for="id"></label>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['toggle'])
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  model: {
    type: [Array, Object]
  },
  name: {
    type: String,
    default: ''
  },
  errors: {
    type: [Array, Object],
    default: []
  }
})

function toggle() {
  emit('toggle')
}
</script>

<style scoped></style>
