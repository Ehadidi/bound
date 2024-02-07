<template>
  <label class="fontBold txt_start d-block mb-2 font11">{{ label }}</label>
  <div class="form-inputs" :class="{ unIconed: !icon, iconLeft: iconLeft == true, iconRight: iconRight == true }">
    <div class="file-placeholder default_input p-0">
      <input :disabled="readonly" id="civil-id" type="file" class="file-upload" accept="image/*" />
      <div class="file-browse">
        <span class="file-browse-txt">{{ placeholder }} </span>
        <span class="browse"> <font-awesome-icon :icon="['fas', 'upload']" /></span>
      </div>
    </div>
    <span v-if="$slots.icon" class="form-icon">
      <slot name="icon"></slot>
    </span>
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
const emit = defineEmits(['update:fileUrl'])

const props = defineProps({
  label: {
    type: String
  },
  placeholder: {
    type: String
  },
  icon: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  const pmfFileupload = {
    $filePlaceholder: null,
    $fileUpload: null,
    $fileBrowseTxt: null,
    newVal: '',

    init: function () {
      this.cacheDom()
      this.events()
    },

    cacheDom: function () {
      this.$filePlaceholder = document.querySelector('.file-placeholder')
      this.$fileUpload = this.$filePlaceholder.querySelector('.file-upload')
      this.$fileBrowseTxt = this.$filePlaceholder.querySelector('.file-browse-txt')
    },

    events: function () {
      const self = this
      this.$fileUpload.addEventListener('change', function (e) {
        self.getFileName(e)
      })
    },

    getFileName: function (e) {
      const file = e.target.files[0]

      if (file) {
        const reader = new FileReader()
        reader.onloadend = (e) => {
          const base64String = reader.result;
          // const base64String = reader.result.split(',')[1] // Extract base64 string
          emit('update:fileUrl', base64String) // Emitting the event with the file URL
        }
        reader.readAsDataURL(file) // Read file as data URL
      }

      this.newVal = this.$fileUpload.value
      if (this.newVal !== '') {
        this.$fileBrowseTxt.textContent = this.newVal
        this.$fileBrowseTxt.classList.add('hasValue')
      }
    }
  }

  pmfFileupload.init()
})
</script>

<style lang="scss">
.file-placeholder {
  position: relative;
  cursor: pointer;

  label {
    display: block;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  input[type='file'] {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .file-browse {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.375rem 0.75rem;
    padding-inline-start: 35px;

    .file-browse-txt {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      padding-left: 10px;
    }

    .browse {
      display: block;
      font-size: 14px;
    }
  }
}

.form-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
  pointer-events: none;
  color: #2966B0;

  &.option {
    left: 0;
    right: unset;
    width: unset;
    pointer-events: visible;
  }
}
html[lang=en] {
  .form-icon {
    &.option {
      right: 0;
      left: unset;
      width: unset;
    }
  }
}
</style>
