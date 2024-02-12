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
          <SwiperSlide v-for="i in 10" :key="i">
            <div class="px-3">
              <img
                src="https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png"
                alt="product name"
                class="mw-100"
              />
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
      <NuxtLink class="text-dark fw-bold">
        {{ $t("layout.view_more") }}
        <img
          src="~/assets/images/ArrowRight.svg"
          alt="arrow"
          class="mx-2 filter-arrow"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// ================================================================================ imports
import { Navigation, Autoplay, Pagination, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
// ================================================================================ data

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
});
</script>

<style lang="scss" scoped></style>
