<template>
  <div class="uploader-container multi">
    <div class="file-upload">
      <label
        :for="name"
        class="txt_start d-flex align-items-center mainDark"
        @click="unAnimate"
      >
        <input
          :name="name"
          :data-name="DataName"
          :class="InputClass"
          :id="name"
          class="uploadImg"
          multiple
          hidden
          type="file"
          :accept="acceptedFiles"
          @change="fileUploder($event)"
        />
        <img class="width30" src="@/assets/images/edit-icon.png" alt="" />
        <span class="font9 line_20 mainColor fontBold">{{ label }}</span>
        <div class="feedback"></div>
      </label>
    </div>
    <div v-if="jobFunction === 'image'" class="flex align-items-center gap10 flex-wrap">
      <div v-for="(item, index) in fileSrcs" :key="item" class="img-box">
        <button
          @click="deleteEvent($event, index, 'image', item.name)"
          class="btn remove-box"
          type="button"
        >
          <!-- <font-awesome-icon class="pointer-none" :icon="['fas', 'times']" /> -->
        </button>
        <a data-fancybox="upload-gallery" :href="item.src">
          <img :class="{ scaleIn: isAnimated }" :src="item.src" alt="" />
        </a>
      </div>
    </div>
    <div v-if="jobFunction === 'file'" class="flex align-items-center gap10 flex-wrap">
      <div v-for="(item, index) in fileSrcs" :key="item" class="img-box">
        <button
          @click="deleteEvent($event, index, 'application', item.name)"
          class="btn remove-box"
          type="button"
        >
          <!-- <font-awesome-icon class="pointer-none" :icon="['fas', 'times']" /> -->
        </button>
        <a data-fancybox="pdf-gallery" data-type="pdf" :href="item.src">
          <span class="offWhite d-block w-100 h-100 p-2 radius8">
            <img :class="{ scaleIn: isAnimated }" src="@/assets/images/pdfFileIcon.png" alt="" />
          </span>
        </a>
      </div>
    </div>
    <div v-if="jobFunction === 'file-img'" class="flex align-items-center gap10 flex-wrap">
      <div v-for="(mergedItem, index) in src_img_file" :key="mergedItem" class="img-box">
        <button
          @click="deleteEvent($event, index, 'img_file')"
          class="btn remove-box"
          type="button"
        >
          <!-- <font-awesome-icon class="pointer-none" :icon="['fas', 'times']" /> -->
        </button>
        <div class="mergedItem" :class="{ scaleIn: isAnimated }" v-html="mergedItem"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ================================================================================ data & emits functions
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['object_images', 'object_files', 'object_file_img'])
const props = defineProps({
  name: {
    type: Array
  },
  label: {
    type: String
  },
  acceptedFiles: {
    type: String
  },
  jobFunction: {
    type: String
  },
  InputClass: {
    type: String
  },
  DataName: {
    type: String
  }
})
//  ========================================================================= reactive data
const isAnimated = ref(false)
const fileSrcs = ref([])
const objectFiles = ref([])
const objectImages = ref([])
const objectImgFile = ref([])
const src_img_file = ref([])
const pdf_av = ref('@/assets/images/pdfFileIcon.png')

// ======================================================================== methods
const unAnimate = () => {
  isAnimated.value = false
}
//========================================= upload imgs
const fileUploder = (event) => {
  let selectedFiles = event.target.files

  if (validateImageSize(selectedFiles)) {
    for (let i = 0; i < selectedFiles.length; i++) {
      let src = URL.createObjectURL(selectedFiles[i])
      let fileName = selectedFiles[i].name
      if (props.jobFunction == 'file-img') {
        if (selectedFiles[i].type.split('/')[0] === 'image') {
          src_img_file.value.push(`<a data-fancybox="upload-gallery" href='${src}'>
                        <img class="w-100 h-100 radius5" src="${src}" alt="">
                    </a>`)

          objectImgFile.value.push(selectedFiles[i])
        } else if (selectedFiles[i].type.split('application/')[1] === 'pdf') {
          src_img_file.value.push(`<a data-fancybox="upload-gallery" data-type="pdf" href='${src}'>
                        <span class="offWhite d-block w-100 h-100 p-2 radius8">
                            <img class="w-100 h-100 radius5" src="${pdf_av.value}"
                                alt="">
                        </span>
                    </a>`)

          objectImgFile.value.push(selectedFiles[i])
        } else {
          return false
        }
      } else if (props.jobFunction == 'image' || props.jobFunction == 'file') {
        let item = { src: src, name: fileName }
        fileSrcs.value.push(item)
        console.log(fileSrcs.value)
        if (selectedFiles[i].type.split('/')[0] === 'image') {
          objectImages.value.push(selectedFiles[i])
          emit('object_images', objectImages.value)
        } else if (selectedFiles[i].type.split('application/')[1] === 'pdf') {
          objectFiles.value.push(selectedFiles[i])
          emit('object_files', objectFiles.value)
        }
      }
    }
    emit('object_file_img', objectImgFile.value)
    isAnimated.value = true
  } else {
    console.log('Image size exceeds the maximum limit')
  }
}
// ======================================= validate size
const validateImageSize = (files) => {
  if (props.jobFunction == 'file') {
    const maxSizeInBytes = 20 * 1024 * 1024
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.size > maxSizeInBytes) {
        return false
      }
    }
    return true
  } else if (props.jobFunction == 'image') {
    const maxSizeInBytes = 10 * 1024 * 1024
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.size > maxSizeInBytes) {
        return false
      }
    }
    return true
  } else if (props.jobFunction == 'file-img') {
    const maxSizeInBytes = 20 * 1024 * 1024
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.size > maxSizeInBytes) {
        return false
      }
    }
    return true
  }
}
// ======================================= deleteEvent
const deleteEvent = (event, index, fileType, ItemName) => {
  let filesInput = document.getElementById(`${props.name}`)
  let files = new DataTransfer()
  let deleted = null
  for (let i = 0; i < filesInput.files.length; i++) {
    if (filesInput.files[i].name == ItemName && deleted != ItemName) {
      deleted = ItemName
      continue
    }
    files.items.add(filesInput.files[i])
  }
  filesInput.files = files.files

  event.target.parentElement.classList.add('reverse')
  if (props.jobFunction == 'file-img') {
    setTimeout(() => {
      objectImgFile.value.splice(index, 1)
      src_img_file.value.splice(index, 1)
    }, '600')
    emit('object_file_img', objectImgFile.value)
  } else {
    setTimeout(() => {
      fileSrcs.value.splice(index, 1)

      if (fileType === 'image') {
        objectImages.value.splice(index, 1)
        emit('object_images', objectImages.value)
      } else if (fileType === 'application') {
        objectFiles.value.splice(index, 1)
        emit('object_files', objectFiles.value)
      }
    }, '600')
  }
}
// ========================================================================= lifecycle hooks
</script>

<style lang="scss" scoped>
.uploader-container {
  position: relative;
  margin: auto;

  .file-upload {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #229edb;
    display: flex;
    align-items: flex-end;

    label {
      cursor: pointer;
      position: relative;
      z-index: 2;
    }

    .feedback {
      z-index: 10;
      width: fit-content;
      height: fit-content;
      bottom: -10px;
    }
  }

  &.multi {
    display: flex;
    align-items: flex-start;
    gap: 10px;

    .file-upload {
      width: 73px;
      height: 73px;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      background-color: #dff0f9;
      flex-shrink: 0;

      label {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }

    .img-box {
      position: relative;
      width: 73px;
      height: 73px;
      border-radius: 10px;
      transition: 0.3s all ease;

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }

      .remove-box {
        position: absolute;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #ffdcdc;
        color: crimson;
        font-size: 9px;
        z-index: 2;
      }
    }
  }
}

.mergedItem {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.scaleIn {
  animation: scaleIn 0.6s ease forwards;
}
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.reverse {
  animation: scaleIn 0.6s ease reverse;
}
</style>
