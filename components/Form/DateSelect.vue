<template>
  <Calendar
    v-model="model[name]"
    showIcon
    iconDisplay="input"
    dateFormat="dd/mm/yy"
    :placeholder="placeholder"
  />
</template>
<script setup>
import Calendar from 'primevue/calendar'
const props = defineProps({
  model: {
    type: [Array, Object]
  },
  name: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

</script>
