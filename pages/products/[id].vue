<template>
    <div class="bg-sectionBg">

        <!-- product detailes top -->
        <div class="product_detailes_top pt-6">
            <div class="container">

                <!-- product detailes -->
                <div class="row gy-4" v-if="!loading">

                    <!-- Galleria -->
                    <div class="col-xl-4 col-lg-5">

                        <div class="dir" v-if="attchements.length">
                            <Galleria :value="attchements" v-model:activeIndex="activeIndex" :numVisible="5"
                                :circular="true" :transitionInterval="3000">
                                <template #item="slotProps">
                                    <img class="galleria_img" :src="slotProps.item.image" alt="product image"
                                        style="width: 100%; display: block" />
                                    <Image :src="slotProps.item.image" alt="Image" class="fancyImg" preview />
                                </template>
                                <template #thumbnail="slotProps">
                                    <img class="thumbnail_img" :src="slotProps.item.image" alt="thumbnail"
                                        style="display: block" />
                                </template>
                            </Galleria>
                        </div>

                        <div class="not_found galleria" v-else>
                            <p>{{ $t('notFound.Images') }}</p>
                        </div>

                    </div>

                    <div class="col-xl-6 col-lg-7">

                        <!-- Name -->
                        <div class="mb-3">
                            <div class="product_bread">
                                <div class="product_cat">{{ product.categories_name }}</div>
                            </div>

                            <div class="product_name c-primary fw-bold mt-1">{{ product.name }}</div>
                        </div>

                        <!-- Price -->
                        <div class="mb-3">
                            <div class="product_bread">{{ $t("product.price") }}</div>

                            <div class="fs15 c-primary fw-bold mt-1">{{ product.price }}</div>
                        </div>

                        <!-- Brand -->
                        <div class="mb-3">
                            <div class="product_bread">{{ $t("product.brand") }}</div>

                            <div class="c-primary mt-1">{{ product.brand }}</div>
                        </div>

                        <!-- Rate -->
                        <div class="mb-4">
                            <div class="product_bread">{{ $t("product.rating") }}</div>

                            <div class="d-flex align-items-center gap-3 mt-1">
                                <div class="d-flex align-items-center gap-1">
                                    {{ product.rate_avg }} <i class="fa-solid fa-star"></i>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    {{ product.rate_count }} Review
                                </div>
                            </div>
                        </div>

                        <hr class="mb-4" />

                        <!-- Description -->
                        <p class="mb-4">{{ product.description }}</p>

                        <!-- Size -->
                        <div class="mb-4">
                            <div class="product_bread">{{ $t("product.size") }}</div>

                            <div class="pro_filter_btns mt-2">
                                <label class="pro_btn" v-for="size in product.sizes" :key="size.id">
                                    <input type="radio" name="size" v-model="selectedSize" :value="size.id">
                                    {{ size.size }}
                                </label>
                            </div>
                        </div>

                        <!-- Color -->
                        <div>
                            <div class="product_bread">{{ $t("product.color") }}</div>

                            <div class="pro_filter_btns mt-2">
                                <label class="pro_btn" v-for="color in product.imagesAndColors" :key="color.id">
                                    <input type="radio" name="color" @change="changeColor(color.id)" v-model="selectedColor"
                                        :value="color.id">
                                    {{ color.color }}
                                    <span :style="{ 'background-color': color.color }" class="color"></span>
                                </label>
                            </div>
                        </div>

                    </div>

                </div>

                <!--******* Skeleton *******-->
                <div class="row gy-4" v-if="loading">

                    <div class="col-xl-4 col-lg-5">

                        <Skeleton width="100%" height="400px" class="rounded-0" />

                    </div>

                    <div class="col-xl-6 col-lg-7">

                        <div class="mb-4" v-for="item in 4" :key="item">
                            <Skeleton width="5rem" height=".6rem" class="mb-3" />
                            <Skeleton width="12rem" height=".6rem" />
                        </div>

                        <hr class="mb-4" />

                        <Skeleton width="20rem" height=".6rem" class="mb-4" />

                        <div class="mb-4" v-for="item in 2" :key="item">
                            <Skeleton width="5rem" height=".6rem" class="mb-3" />
                            <div class="pro_filter_btns mt-2">
                                <Skeleton width="5rem" height="2.3rem" class="rounded-0" v-for="item in 3" :key="item" />
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>

        <!-- Another Products -->
        <div class="another_products py-7" v-if="!loading">
            <div class="container">

                <h4 class="title mb-5">{{ $t('product.another_products') }}</h4>

                <swiper class="product-slide" :slidesPerView="5" :breakpoints="breakpoints" :navigation="true"
                    :pagination="false" :spaceBetween="30" :freeMode="true" :modules="modules">
                    <SwiperSlide class="product-slide-item" v-for="product in you_may_also_know" :key="product.id">

                        <CategoriesProductCard :productImg="product.image" :price="product.price"
                            :productName="product.name" :rate="product.rate_average" :id="product.id" />

                    </SwiperSlide>
                </swiper>

            </div>
        </div>

        <!--******* Skeleton *******-->
        <div class="another_products py-7" v-if="loading">
            <div class="container">

                <Skeleton width="14rem" height=".6rem" class="mb-5" />

                <swiper class="product-slide" :slidesPerView="5" :breakpoints="breakpoints" :navigation="true"
                    :pagination="false" :spaceBetween="30" :freeMode="true" :modules="modules">
                    <SwiperSlide class="product-slide-item" v-for="product in 6" :key="product">

                        <div>
                            <Skeleton shape="circle" size="6rem" class="mb-4 mx-auto" />
                            <Skeleton width="5rem" height=".6rem" class="mb-3 mx-auto" />
                            <Skeleton width="8rem" height=".6rem" class="mb-3 mx-auto" />
                            <Skeleton width="5rem" height=".6rem" class="mb-3 mx-auto" />
                        </div>

                    </SwiperSlide>
                </swiper>

            </div>
        </div>

    </div>
</template>

<script setup>

// ================================================================================ imports
import { Navigation, Autoplay, Pagination, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { response } from "~/network/response";

// ================================================================================ data
const modules = [Navigation, Pagination, Autoplay, FreeMode];
const axios = useNuxtApp().$axios;

// route Id
const { id } = useRoute().params;

// loading
const loading = ref(false);

// breakpoints
const breakpoints = {
    320: {
        slidesPerView: 1,
    },
    480: {
        slidesPerView: 2,
    },
    767: {
        slidesPerView: 3,
    },
    992: {
        slidesPerView: 6,
    }
}

// product
const product = ref({});

// attchements
const attchements = ref([]);

// selectedSize
const selectedSize = ref(null);

// selectedColor
const selectedColor = ref(null);

// you_may_also_know
const you_may_also_know = ref([]);

// activeIndex
const activeIndex = ref(0);

// ================================================================================ methods
const get_detailes = async () => {
    loading.value = true;
    axios
        .get(`product-details/${id}`)
        .then((res) => {
            let status = response(res).status;
            let data = response(res).data;
            if (status === "success") {
                product.value = data.product;
                you_may_also_know.value = data.you_may_also_know;
                attchements.value = data.product.imagesAndColors;
                selectedSize.value = data.product.sizes[0].id;
                selectedColor.value = data.product.imagesAndColors[0].id;
            }
            loading.value = false;
        })
        .catch((e) => {
            console.error(e);
        });
};

// change Color
const changeColor = (colorId) => {
    for (let i = 0; i < attchements.value.length; i++) {
        if (attchements.value[i].id == colorId) {
            activeIndex.value = i;
            selectedColor.value = colorId;
        }
    }
}

// ================================================================================ watch

watch(activeIndex, (newVal) => {
    changeColor(attchements.value[newVal].id);
});

// ================================================================================ lifecycle hooks
onMounted(() => {
    get_detailes();
});

</script>

<style scoped></style>
