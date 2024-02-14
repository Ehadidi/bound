<template>
    <div class="bg-sectionBg main-sec py-5">
        <div class="container">
            <div class="sec-title mb-5">
                <div class="text-bg about">
                    <img src="~/assets/images/about-text.png" alt="about" />
                </div>
            </div>

            <div class="row">
                <div class="col-xl-11 mx-auto">

                    <!--******* Data *******-->
                    <div class="row gy-4 justify-content-between align-items-center" v-if="!loading">

                        <!-- Slider -->
                        <div class="col-xl-5 col-lg-6">

                            <div class="slider" v-if="slider.length">
                                <div class="logo_con">
                                    <img src="~/assets/images/white_logo.png" class="logo" alt="">
                                </div>
                                <Carousel :value="slider" :numVisible="1" :numScroll="1"
                                    :responsiveOptions="responsiveOptions" circular :autoplayInterval="3000"
                                    class="dir-slider">
                                    <template #item="slotProps">
                                        <img :src="slotProps.data.image" alt="slider-img" class="slider-img" />
                                    </template>
                                </Carousel>
                            </div>

                            <div class="not_found" v-else>
                                <p>{{ $t('notFound.Images') }}</p>
                            </div>

                        </div>

                        <!-- Content -->
                        <div class="col-lg-6">
                            <h6 class="mb-2 font12">{{ $t('header.about') }}</h6>
                            <span class="montagu mb-3 font30 d-block text-primary">{{ $t('header.aboutQu') }}</span>
                            <p class="font13 line-height-4">{{ aboutText }}</p>

                            <div class="about_items">

                                <div class="about_item">
                                    <div class="about_icon">
                                        <img src="~/assets/images/shape1.png" class="bg" alt="about icon" />
                                        <img src="~/assets/images/about1.png" class="ic" alt="about icon" />
                                    </div>
                                    <div class="text-center font14 montagu text-secondary mt-3">{{ $t('about.item1') }}
                                    </div>
                                </div>

                                <div class="about_item">
                                    <div class="about_icon">
                                        <img src="~/assets/images/shape2.png" class="bg" alt="about icon" />
                                        <img src="~/assets/images/about2.png" class="ic" alt="about icon" />
                                    </div>
                                    <div class="text-center font14 montagu text-secondary mt-3">{{ $t('about.item2') }}
                                    </div>
                                </div>

                                <div class="about_item">
                                    <div class="about_icon">
                                        <img src="~/assets/images/shape3.png" class="bg" alt="about icon" />
                                        <img src="~/assets/images/about3.png" class="ic" alt="about icon" />
                                    </div>
                                    <div class="text-center font14 montagu text-secondary mt-3">{{ $t('about.more') }}</div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <!--******* Skeleton *******-->
                    <div class="row gy-4 justify-content-between align-items-center" v-if="loading">

                        <!-- Slider -->
                        <div class="col-xl-5 col-lg-6">

                            <Skeleton width="100%" height="400px" />

                        </div>

                        <!-- Content -->
                        <div class="col-lg-6">
                            <Skeleton width="5rem" height=".7rem" class="mb-3" />
                            <Skeleton width="15rem" height=".7rem" class="mb-5" />

                            <Skeleton height=".5rem" class="mb-3" v-for="i in 4" :key="i" />
                            <Skeleton height=".5rem" width="15rem" class="mb-5" />

                            <div class="about_items">

                                <div class="about_item" v-for="i in 3" :key="i">
                                    <Skeleton shape="circle" size="5rem" class="mb-3 mx-auto" />
                                    <Skeleton width="5rem" height=".7rem" class="mb-3" />
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// ======================================================================== imports
import { response } from "~/network/response";

// ======================================================================== data
const axios = useNuxtApp().$axios;

// slider
const slider = ref([]);

const responsiveOptions = ref([
    {
        breakpoint: "767px",
        numVisible: 1,
        numScroll: 1,
    },
]);

// aboutText
const aboutText = ref(``);

// loading
const loading = ref(false)

// ======================================================================== methods

const get_about = async () => {
    loading.value = true;
    axios
        .get(`about`)
        .then((res) => {
            let status = response(res).status;
            let data = response(res).data;
            if (status === "success") {
                aboutText.value = data.about;
                slider.value = data.about_images
            }
            loading.value = false;

        })
        .catch((e) => {
            console.error(e);
        });
};

// ======================================================================== lifecycle
onMounted(() => {
    get_about()
})

</script>

<style scoped></style>