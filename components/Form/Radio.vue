<template>
  <div class="form-check align-items-cenetr d-flex mb-2">
    <input
      class="form-check-input"
      type="radio"
      :value="option"
      :id="option"
      v-model="model[name]"
      :name="name"
    />
    <label class="form-check-label ms-2" :for="option">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  option: {
    required: true,
    type: String
  },
  label: {
    required: true,
    type: String
  },
  model: {
    type: [Array, Object]
  },
  name: {
    type: String,
    default: ''
  },
  // class: {
  //   type: String,
  //   default: ''
  // },
  parentClass: {
    type: String,
    default: ''
  }
})
</script>
