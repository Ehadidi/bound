<template>
    <div class="bg-sectionBg">

        <!-- product detailes top -->
        <div class="product_detailes_top pt-6">
            <div class="container">
                <div class="row gy-4">

                    <div class="col-xl-4 col-lg-5">

                        <div class="dir">
                            <Galleria :value="attchements" :numVisible="5" :circular="true" :autoPlay="true"
                                :transitionInterval="3000">
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

                    </div>

                    <div class="col-xl-6 col-lg-7">

                        <div class="mb-3">
                            <div class="product_bread">
                                <div class="product_cat">{{ product.category_name }}</div>
                                <i class="fa-solid fa-angle-right"></i>
                                <div class="product_cat">{{ product.subcategory_name }}</div>
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
                                    {{ product.avg_rate }} <i class="fa-solid fa-star"></i>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    {{ product.rating }} Review
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
                                    {{ size.name }}
                                </label>
                            </div>
                        </div>

                        <!-- Color -->
                        <div>
                            <div class="product_bread">{{ $t("product.color") }}</div>

                            <div class="pro_filter_btns mt-2">
                                <label class="pro_btn" v-for="color in product.colors" :key="color.id">
                                    <input type="radio" name="color" v-model="selectedColor" :value="color.id">
                                    {{ color.name }}
                                    <span :style="{ 'background-color': color.hex }" class="color"></span>
                                </label>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

        <!-- Another Products -->
        <div class="another_products py-7">
            <div class="container">

                <h4 class="title mb-5">{{ $t('product.another_products') }}</h4>

                <swiper class="product-slide" :slidesPerView="5" :breakpoints="breakpoints" :navigation="true"
                    :pagination="false" :spaceBetween="30" :freeMode="true" :modules="modules">
                    <SwiperSlide class="product-slide-item" v-for="i in 10" :key="i">
                        <CategoriesProductCard
                            productImg="https://www.freepnglogos.com/uploads/women-bag-png/women-bag-png-transparent-images-download-clip-4.png"
                            price="250 SAR" productName="Handbag" rate="4" id="1" />
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
// ================================================================================ data
const modules = [Navigation, Pagination, Autoplay, FreeMode];

// route Id
const { id } = useRoute().params;

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
const product = ref({
    id: 1,
    category_name: 'Dress',
    subcategory_name: 'Sub-category',
    name: 'product name',
    price: '250 SAR / Day',
    brand: 'Gucci',
    avg_rate: 4.5,
    rating: 162,
    sizes: [
        {
            id: 1,
            name: 'S',
        },
        {
            id: 2,
            name: 'M',
        },
        {
            id: 3,
            name: 'L',
        }
    ],
    colors: [
        {
            id: 1,
            name: 'red',
            hex: '#f00',
        },
        {
            id: 2,
            name: 'blue',
            hex: '#00f',
        },
        {
            id: 3,
            name: 'green',
            hex: '#0f0',
        }
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
});

// attchements
const attchements = ref([
    {
        id: 1,
        image: 'https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png',
    },
    {
        id: 2,
        image: 'https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png',
    },
    {
        id: 3,
        image: 'https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png',
    },
    {
        id: 4,
        image: 'https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png',
    },
    {
        id: 5,
        image: 'https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png',
    },
    {
        id: 6,
        image: 'https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png',
    },
    {
        id: 7,
        image: 'https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png',
    }
]);

// selectedSize
const selectedSize = ref(1);

// selectedColor
const selectedColor = ref(1);
// ================================================================================ methods

// ================================================================================ lifecycle hooks

</script>

<style scoped></style>
