<template>
    <div class="uploader-container">
        <div class="file-upload">
            <input :data-name="DataName" :class="InputClass" id="file-upload" class="uploadImg" :name="name" hidden
                type="file" accept="image/*" @change="fileUploder" />
            <label for="file-upload" class="txt_start d-flex align-items-center mainDark" @click="unAnimate">
                <img src="@/assets/images/edit-icon.png" width="20" alt="">
            </label>
            <div class="feedback"></div>
        </div>
        <div class="holder-area">
            <img v-if="imageSrc" :class="{ 'scaleIn': isAnimated }" :src="imageSrc" alt="">
            <img v-else :class="{ 'scaleIn': isAnimated }" src="@/assets/images/img_avatar.png" alt="">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    name: {
        type: String
    },
    InputClass: {
        type: String
    },
    DataName: {
        type: String
    }
})
const imageSrc = ref(``)
const isAnimated = ref(false)
const unAnimate = () => {
    isAnimated.value = false
}
const fileUploder = (e) => {
    let selectedFiles = e.target.files[0];
    let read = new FileReader();
    read.readAsDataURL(selectedFiles);
    read.onload = e => {
        imageSrc.value = e.target.result;
        isAnimated.value = true
    };
};
</script>

<style lang="scss" scoped>
.uploader-container {
    position: relative;
    width: 90px;
    height: 90px;
    margin: auto;

    .file-upload {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #229EDB;
        display: flex;
        align-items: flex-end;

        label {
            cursor: pointer;
            position: relative;
            z-index: 2;
        }
        .feedback{
            z-index: 10;
            width: fit-content;
            height: fit-content;
            bottom: -45%;
        }
    }

    .holder-area {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        padding: 5px;
        z-index: 1;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }

        button {
            position: absolute;
            top: -1px;
            left: -5px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            padding: 0;
            background-color: crimson;
            color: #fff;
        }
    }
}
.scaleIn {
    animation: scaleIn .6s ease forwards;
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
</style>