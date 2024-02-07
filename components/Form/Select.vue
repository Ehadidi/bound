<template>
  <div :class="parentClass">
    <label v-if="label" class="d-block mb-2">{{ label }}</label>
    <div class="form-inputs">
      <MultiSelect
        v-if="multi"
        v-model="model[name]"
        :options="myOptions"
        optionLabel="name"
        :selectionLimit="selectionLimit"
        :placeholder="placeholder"
        :display="display"
        class="w-full"
      >
        <template v-if="customTemp" #option="slotProps">
          <div class="d-flex align-items-center">
            <img
              :alt="slotProps.option.name"
              :src="slotProps.option.avatar"
              width="20"
              height="20"
              class="rounded-circle me-2 border border-primary"
            />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </MultiSelect>

      <Dropdown
        v-else
        v-model="model[name]"
        :options="myOptions"
        optionLabel="name"
        :placeholder="placeholder"
        class="w-full"
        :disabled="disabled"
      />
      <span v-if="$slots.icon" class="form-icon">
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
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'

import { ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  selectionLimit: {
    type: Number
  },
  display: {
    type: String,
    default: 'comma'
  },
  placeholder: {
    type: String,
    default: 'اختر'
  },
  myOptions: {
    type: Array,
    default() {
      return []
    }
  },
  addition: {
    type: Boolean,
    default: false
  },
  label: {
    type: String
  },
  parentClass: {
    type: String
  },
  icon: {
    type: Boolean,
    default: false
  },
  model: {
    type: [Array, Object]
  },
  multi: {
    type: Boolean,
    default: false
  },
  customTemp: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss">
.p-dropdown,
.p-multiselect {
  position: relative;
  width: 100%;
  height: 40px;
  max-height: 230px !important;
  padding: 0;
  border: 2px solid #ddd;
  background-color: transparent;
  color: #000;
  transition: 0.3s all ease;
  border-radius: 5px;
  font-size: 13px;
  padding-inline-start: 30px;
  font-family: 'URW DIN Arabic' !important;

  &.p-overlay-open {
    box-shadow: none;
  }

  .p-dropdown-label,
  .p-multiselect-label {
    padding: 0;
    font-size: 13px;
    font-family: 'URW DIN Arabic' !important;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &:not(.p-disabled) {
    &:hover {
      border-color: #2966b0;
    }

    &.p-focus {
      box-shadow: none;
      .p-dropdown-trigger {
        color: #2966b0;
      }
    }
  }

  &.code {
    padding-inline-start: 10px;
    width: 80px;
    border: 0;
    &::after {
      position: absolute;
      right: 0;
      content: '';
      background-color: #ddd;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 1px;
      height: 70%;
    }

    .p-dropdown-trigger {
      width: 1rem !important;
      margin-inline-end: 6px;
    }

    .p-dropdown-label {
      overflow: visible;
    }

    .p-icon {
      width: 10px !important;
      height: 10px !important;
    }
  }
}

.p-dropdown-panel,
.p-multiselect-panel {
  background-color: rgb(248, 249, 251);
  // border-top: 0;
  // border-radius:0 0 10px 10px;

  .p-dropdown-items,
  .p-multiselect-items {
    .p-dropdown-item,
    .p-multiselect-item {
      font-size: 13px;
      padding: 5px 15px;

      &.p-highlight {
        color: #2966b0 !important;
        background: #229ddb21 !important;
      }
    }
  }
}
.feedback {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 5px 5px;
  font-size: 10px;
  color: crimson;
  pointer-events: none;
  visibility: hidden;
  transition: 0.3s all ease;
  opacity: 0;
  white-space: nowrap;

  span {
    background-color: #fff;
    padding: 0 5px;
    border-radius: 5px;
  }

  &.valid {
    visibility: visible;
    opacity: 1;
  }

  &.service_feedback {
    bottom: -100%;
  }

  &.type_feedback {
    bottom: -100%;
  }
}

.addition {
  position: absolute;
  left: 0;
  height: 100%;
}

.p-multiselect-chip {
  .p-multiselect-token {
    padding: 5px;
    background: transparent;
    border-radius: 2px;
    border: 1px solid #ddd;
  }
}

.p-multiselect-trigger {
  width: 2rem !important;
}

html[lang='en'] {
  .addition {
    left: unset;
    right: 0;
  }
}
html[lang='ar'] {
  .p-checkbox {
    &.p-component {
      margin-right: 0;
      margin-left: 0.5rem;
    }
  }

  .p-multiselect-chip {
    .p-multiselect-token {
      margin-right: 0;
      margin-left: 0.5rem;
      .p-multiselect-token-icon {
        margin-left: 0;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
