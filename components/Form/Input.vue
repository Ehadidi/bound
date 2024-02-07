<template>
  <div :class="parentClass" class="position-relative">
    <label v-if="label" class="d-block mb-2 fw-bold font14 text-primary">{{ label }}</label>
    <div
      class="form-inputs"
      :class="{ unIconed: !icon, iconLeft: iconLeft == true, iconRight: iconRight == true }"
    >
      <InputNumber
        v-if="type == 'number' && max"
        v-model="model[name]"
        inputId="minmax"
        :min="min"
        :max="max"
        :name="name"
        :placeholder="placeholder"
        class="w-100"
      />
      <textarea
        :readonly="readonly"
        :class="InputClass"
        v-if="textarea == true"
        class="default_input textarea"
        :rows="rows"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        v-model="model[name]"
      ></textarea>
      <input
        :readonly="readonly"
        :class="InputClass"
        v-if="!max && !textarea"
        class="default_input"
        :type="type == 'password' ? (showPass ? 'text' : 'password') : type"
        :placeholder="placeholder"
        :name="name"
        v-model="model[name]"
      />
      <span
        v-if="type == 'password'"
        class="form-icon cursor-pointer option"
        @click.prevent="showPass = !showPass"
      >
        <!-- <font-awesome-icon :icon="['fas', showPass ? 'eye-slash' : 'eye']" /> -->
        <i class="pi" :class="showPass ? 'pi-eye-slash' : 'pi-eye'"></i>
      </span>
      <span v-if="$slots.icon" class="form-icon" :class="{ areaIcon: textarea == true }">
        <slot name="icon"></slot>
      </span>
      <div v-if="addition" class="addition">
        <slot name="addition"></slot>
      </div>
      <!-- <div class="feedback"></div> -->
    </div>
  </div>
</template>

<script setup>
import InputNumber from 'primevue/inputnumber'

import { ref } from 'vue'
const showPass = ref(false)
const props = defineProps({
  model: {
    type: [Array, Object]
  },
  parentClass: {
    type: String
  },
  required: {
    type: Boolean
  },
  height: {
    type: String
  },
  label: {
    type: String
  },
  max: {
    type: Number
  },
  min: {
    type: Number
  },
  textarea: {
    type: Boolean
  },
  rows: {
    type: Number
  },
  name: {
    type: String
  },
  placeholder: {
    type: String
  },
  type: {
    type: String
  },
  iconRight: {
    type: Boolean
  },
  iconLeft: {
    type: Boolean
  },
  icon: {
    type: Boolean,
    default: false
  },
  InputClass: {
    type: String
  },
  InputValue: {
    type: String
  },
  addition: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss">
.form-inputs {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: hidden;
  margin-bottom: 0;
  transition: 0.3s all ease;

  .form-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 15px 10px;
    pointer-events: none;

    &.option {
      left: 0;
      right: unset;
      width: unset;
      pointer-events: visible;
    }

    &.areaIcon {
      align-items: flex-start;
    }
  }

  .default_input,
  .p-inputnumber-input {
    position: relative;
    width: 100%;
    height: 50px;
    padding: 10px;
    border: 2px solid #ddd;
    background-color: #fff;
    color: #000;
    transition: 0.3s all ease;
    // border-radius: 5px;
    font-size: 13px;
    padding-inline-start: 35px;

    &:focus-visible {
      outline: none;
      border-color: #000;
    }

    &::placeholder {
      color: #656565;
      font-size: 11px;
      transition: 0.3s all ease;
    }
    &.textarea {
      height: auto;
      resize: none;
      min-height: auto;
      overflow: unset;
    }
  }

  .p-inputnumber-input {
    padding-inline-start: 10px;
    font-family: 'URW DIN Arabic' !important;
  }

  &.unIconed {
    .form-icon {
      display: none;
    }

    .default_input {
      padding-inline-start: 10px;
    }
  }

  &.iconLeft {
    .default_input {
      padding-inline-start: 10px;
      padding-inline-end: 35px;
    }

    .form-icon {
      justify-content: flex-end;
    }
  }

  &.iconRight {
    .default_input {
      padding-inline-start: 35px;
      padding-inline-end: 10px;
    }

    .form-icon {
      justify-content: flex-start;
    }
  }

  .p-icon {
    width: 10px !important;
  }

  .addition {
    position: absolute;
    left: 0;
    height: 100%;
  }
}

html[lang='en'] {
  .addition {
    left: unset;
    right: 0;
  }

  .form-icon {
    &.option {
      right: 0;
      left: unset;
      width: unset;
    }
  }
}
</style>
