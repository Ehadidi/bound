<template>
  <div class="order-card bg-white fs-14px shadow-sm mb-3">
    <div class="p-3 border-bottom">
      <div class="d-flex align-items-center justify-content-between flex-wrap">
        <span class="text-grayColor"
          >{{ $t("orders.order_num") }} {{ orderNum }}</span
        >
        <span class="text-grayColor">
          <i class="fa-solid fa-clock mx-1"></i>
          {{ time }}
        </span>
      </div>

      <div class="py-3">
        <swiper
          :slidesPerView="7"
          :breakpoints="breakpoints"
          :navigation="true"
          :pagination="false"
          :spaceBetween="10"
          :freeMode="true"
          :modules="modules"
        >
          <SwiperSlide v-for="i in products" :key="i">
            <div class="px-3">
              <img :src="i.image" alt="product name" class="mw-100" />
            </div>
          </SwiperSlide>
        </swiper>
      </div>
    </div>

    <div
      class="d-flex align-items-center justify-content-between flex-wrap p-3"
    >
      <span v-if="type == 'waiting'" class="text-dark fw-bold">
        {{ status }}
      </span>
      <span v-if="type == 'payment'" class="text-dark fw-bold">
        <span class="mx-1 bg-primary rounded-circle circle-shape">
          <i class="fa-solid fa-dollar-sign"></i
        ></span>
        {{ status }}
      </span>
      <span v-if="type == 'active'" class="text-dark fw-bold">
        <span class="mx-1"> <i class="fa-solid fa-box"></i></span>
        {{ status }}
      </span>
      <span v-if="type == 'successful'" class="text-dark fw-bold">
        <span class="mx-1">
          <i class="fa-solid fa-circle-check"></i>
        </span>
        {{ status }}
      </span>
      <span v-if="type == 'cancelled'" class="text-danger fw-bold">
        <span class="mx-1">
          <i class="fa-solid fa-circle-xmark"></i>
        </span>
        {{ status }}
      </span>
      <NuxtLink
        v-if="type != 'receipts'"
        class="text-dark fw-bold"
        :to="localPath(`/orders/${id}`)"
      >
        {{ $t("layout.view_more") }}
        <img
          src="~/assets/images/ArrowRight.svg"
          alt="arrow"
          class="mx-2 filter-arrow rotateY180"
        />
      </NuxtLink>
      <div v-else class="d-flex justify-content-end w-100">
        <NuxtLink
          class="btn btn-primary fw-bold"
          :to="localPath(`/orders/${id}`)"
        >
          {{ $t("orders.view_order") }}
          <img
            src="~/assets/images/Eye.svg"
            alt="arrow"
            class="mx-2"
            width="22"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// ================================================================================ imports
import { Navigation, Autoplay, Pagination, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
// ================================================================================ data

const localPath = useLocalePath();
const modules = [Navigation, Pagination, Autoplay, FreeMode];
const breakpoints = {
  320: {
    slidesPerView: 2,
  },
  480: {
    slidesPerView: 3,
  },
  767: {
    slidesPerView: 4,
  },
  992: {
    slidesPerView: 7,
  },
};

const props = defineProps({
  orderNum: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "1",
  },
  time: {
    type: String,
    default: "",
  },
  status: {
    type: Number,
    default: 3,
  },
  images: {
    type: Array,
    default: [],
  },
  id: {
    type: String,
    default: "1",
  },
  products: {
    type: Array,
    default: [
      {
        image:
          "https://bondstreet.vip/public/storage/images/products/1707746893_4461.jpg",
      },
    ],
  },
});
</script>

<style lang="scss" scoped></style>
