<template>
  <label class="d-block mb-2 fw-bold font14 text-primary">{{ label }}</label>
  <div
    class="form-inputs"
    :class="{
      unIconed: !icon,
      iconLeft: iconLeft == true,
      iconRight: iconRight == true,
    }"
  >
    <div class="file-placeholder default_input p-0">
      <input
        :disabled="readonly"
        :id="id"
        type="file"
        class="file-upload"
        accept="image/*"
        ref="fileUploadRef"
      />
      <div class="file-browse">
        <span class="file-browse-txt">{{ placeholder }} </span>
        <span class="browse text-gray-500">
          <i class="fa-solid fa-camera"></i>
        </span>
      </div>
    </div>
    <span v-if="$slots.icon" class="form-icon">
      <slot name="icon"></slot>
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const emit = defineEmits(["update:fileUrl"]);

const props = defineProps({
  label: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  name: {
    type: String,
  },
  id: {
    type: String,
  },
  icon: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const fileUploadRef = ref(null);

onMounted(() => {
  if (fileUploadRef.value) {
    fileUploadRef.value.addEventListener("change", getFileName);
  }
});

const getFileName = (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const base64String = reader.result;
      emit("update:fileUrl", base64String); // Emitting the event with the file URL
    };
    reader.readAsDataURL(file); // Read file as data URL
  }

  const newVal = fileUploadRef.value.value;
  if (newVal !== "") {
    fileUploadRef.value.nextElementSibling.querySelector(
      ".file-browse-txt"
    ).textContent = newVal;
  }
};
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

  input[type="file"] {
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
    padding: 10px;

    .file-browse-txt {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      font-size: 12px;
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
  color: #2966b0;

  &.option {
    left: 0;
    right: unset;
    width: unset;
    pointer-events: visible;
  }
}
html[lang="en"] {
  .form-icon {
    &.option {
      right: 0;
      left: unset;
      width: unset;
    }
  }
}
</style>
