<template>
    <div class="bg-sectionBg">

        <!-- product detailes top -->
        <div class="product_detailes_top pt-6">
            <div class="container">
                <div class="row">

                    <div class="col-lg-4">

                        <Galleria :value="attchements" dir="ltr" :numVisible="5" :circular="true" :autoPlay="true"
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

                    <div class="col-lg-6">

                        <div class="mb-4">
                            <div class="product_bread">
                                <div class="product_cat">{{ product.category_name }}</div>
                                <i class="fa-solid fa-angle-right"></i>
                                <div class="product_cat">{{ product.subcategory_name }}</div>
                            </div>

                            <div class="product_name c-primary fw-bold mt-1">{{ product.name }}</div>
                        </div>

                        <!-- Price -->
                        <div class="mb-4">
                            <div class="product_bread">Price</div>

                            <div class="fs15 c-primary fw-bold mt-1">{{ product.price }}</div>
                        </div>

                        <!-- Brand -->
                        <div class="mb-4">
                            <div class="product_bread">Brand</div>

                            <div class="c-primary mt-1">{{ product.brand }}</div>
                        </div>

                        <!-- Rate -->
                        <div class="mb-4">
                            <div class="product_bread">Ratings</div>

                            <div class="d-flex align-items-center gap-3 mt-1">
                                <div class="d-flex align-items-center gap-1">
                                    {{ product.avg_rate }} <i class="fa-solid fa-star"></i>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    {{ product.rating }} Review
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>

        <!-- Another Products -->
        <div class="another_products py-7">
            <div class="container">

                <h4 class="title mb-5">You may also like</h4>

                <swiper class="product-slide" :slidesPerView="5" :breakpoints="breakpoints" :navigation="true"
                    :pagination="false" :spaceBetween="30" :freeMode="true" :modules="modules">
                    <SwiperSlide class="product-slide-item" v-for="i in 10" :key="i">
                        <CategoriesProductCard
                            productImg="https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png"
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

// product
const product = ref({
    id: 1,
    category_name: 'Dress',
    subcategory_name: 'Sub-category',
    name: 'product name',
    price: '250 SAR / Day',
    brand: 'Gucci',
    avg_rate: 4.5,
    rating: 162
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

// ================================================================================ methods

// ================================================================================ lifecycle hooks

</script>

<style scoped></style>