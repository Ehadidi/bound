<template>
  <div class="home-sections">
    <div class="home-swiper" v-if="home_data.sliders">
      <!-- :autoplay="{
              delay: 5000,
              disableOnInteraction: false,
          }"  -->
      <Swiper
        :autoplay="false"
        :pagination="{
          dynamicBullets: true,
        }"
        :navigation="true"
        :modules="modules"
        class="main-slide"
      >
        <SwiperSlide
          class="main-slide-item"
          v-for="item in home_data.sliders"
          :key="item"
        >
          <img v-if="item.image" :src="item.image" :alt="item.title" />
          <div class="not_found h-100 bg-primary" v-else>
            <p>{{ $t("notFound.Images") }}</p>
          </div>
          <div class="slider-content">
            <!-- <h6>FOR ANY OCCATION</h6> -->
            <h1 class="title">{{ item.title }}</h1>
            <p class="fs-6 w-75 text-center">
              {{ item.description }}
            </p>
            <NuxtLink
              :to="localPath(`/products/categories/${item.category_id}`)"
              class="btn btn-primary arrow-effect"
              >{{ $t("layout.see_more") }}
            </NuxtLink>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div v-else class="home-swiper">
      <Skeleton height="40rem"></Skeleton>
    </div>
    <section class="main-sec">
      <div class="container">
        <div class="sec-title">
          <h2 class="title">{{ $t("layout.categories") }}</h2>
          <div class="text-bg">
            <img src="~/assets/images/categories-text.png" alt="categories" />
          </div>
        </div>
        <div class="grid">
          <div
            class="col-12 md:col-6 lg:col-4"
            v-for="item in categories"
            :key="item"
            :class="
              item.id == 2
                ? 'col-12 md:col-6 lg:col-8'
                : 'col-12 md:col-6 lg:col-4'
            "
          >
            <div class="category-card wide" v-if="item.id == 2">
              <div class="card-info">
                <h5 class="title text-secondary">{{ item.name }}</h5>
                <p class="fs-6 text-center ellipsis w-75">
                  {{ item.description }}
                </p>
                <NuxtLink
                  class="default-link arrow-btn"
                  :to="localPath(`/products/categories/${item.id}`)"
                >
                  <div class="d-flex align-items-center mx-auto">
                    <span>{{ $t("layout.see_more") }}</span>
                    <img src="~/assets/images/ArrowRight.svg" alt="arrow" />
                  </div>
                </NuxtLink>
                <span
                  class="arrow"
                  :class="htlang === 'ar' ? 'left' : 'right'"
                ></span>
              </div>
              <div class="card-img">
                <img :src="item.image" :alt="item.name" />
                <div class="hv-layer">
                  <NuxtLink :to="localPath(`/products/categories/${item.id}`)">
                    <div class="flex align-items-center w-100 h-100">
                      <img
                        class="width40 height40"
                        src="~/assets/images/link-icon.svg"
                        alt="link"
                      />
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div class="category-card" v-else>
              <div class="card-img">
                <img :src="item.image" :alt="item.name" />
                <div class="hv-layer">
                  <NuxtLink :to="localPath(`/products/categories/${item.id}`)">
                    <div
                      class="flex align-items-end justify-content-center w-100 h-100"
                    >
                      <img
                        class="width40 height40"
                        src="~/assets/images/link-icon.svg"
                        alt="link"
                      />
                    </div>
                  </NuxtLink>
                </div>
              </div>
              <div class="card-info">
                <h5 class="title text-secondary">{{ item.name }}</h5>
                <p class="fs-6 text-center p-2 ellipsis">
                  {{ item.description }}
                </p>
                <NuxtLink
                  class="default-link arrow-btn"
                  :to="localPath(`/products/categories/${item.id}`)"
                >
                  <div class="d-flex align-items-center mx-auto">
                    <span>{{ $t("layout.see_more") }}</span>
                    <img src="~/assets/images/ArrowRight.svg" alt="arrow" />
                  </div>
                </NuxtLink>
                <span class="arrow up"></span>
              </div>
            </div>
          </div>

          <!-- <div class="col-12 md:col-6 lg:col-8">
            <div class="category-card wide">
              <div class="card-info">
                <h5 class="title text-secondary ">{{ $t('layout.handbags') }}</h5>
                <p class="fs-6 text-center">{{ $t('layout.handbags_caption') }}</p>
                <NuxtLink class="default-link  arrow-btn" :to="localPath('/products/categories/2')">
                  <div class="d-flex align-items-center">
                    <span>{{ $t('layout.see_more') }}</span>
                    <img src="~/assets/images/ArrowRight.svg" alt="arrow">
                  </div>
                </NuxtLink>
                <span class="arrow" :class="htlang === 'ar' ? 'left' : 'right'"></span>
              </div>
              <div class="card-img">
                <img src="" alt="">
                <div class="hv-layer">
                  <NuxtLink :to="localPath('/products/categories/2')">
                    <div class="flex align-items-center w-100 h-100">
                      <img class="width40 height40" src="~/assets/images/link-icon.svg" alt="link">
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </section>
    <section class="main-sec bg-lightGrayClr">
      <div class="container m-bottom-100">
        <div class="sec-title">
          <h2 class="title">{{ $t("layout.handbags") }}</h2>
          <div class="text-bg">
            <img src="~/assets/images/products-text.png" alt="products" />
          </div>
        </div>
        <swiper
          class="product-slide"
          :slidesPerView="5"
          :breakpoints="breakpoints"
          :navigation="true"
          :pagination="false"
          :spaceBetween="30"
          :freeMode="true"
          :modules="modules"
        >
          <SwiperSlide
            class="product-slide-item"
            v-for="item in home_data.products_1"
            :key="item.id"
          >
            <CategoriesProductCard
              :productImg="item.image"
              :price="item.price"
              :productName="item.name"
              :rate="item.average_rate"
              :id="item.id"
            />
          </SwiperSlide>
        </swiper>
      </div>
      <div class="container">
        <div class="sec-title">
          <h2 class="title">{{ $t("layout.dresses") }}</h2>
        </div>
        <swiper
          class="product-slide"
          :slidesPerView="5"
          :breakpoints="breakpoints"
          :navigation="true"
          :pagination="false"
          :spaceBetween="30"
          :freeMode="true"
          :modules="modules"
        >
          <SwiperSlide
            class="product-slide-item"
            v-for="item in home_data.products_2"
            :key="item.id"
          >
            <CategoriesProductCard
              :productImg="item.image"
              :price="item.price"
              :productName="item.name"
              :rate="item.average_rate"
              :id="item.id"
            />
          </SwiperSlide>
        </swiper>
      </div>
    </section>
    <section class="main-sec" v-if="IsAuth && home_data.offers">
      <div class="container">
        <div class="sec-title">
          <h2 class="title">{{ $t("layout.exclusive_offers") }}</h2>
          <div class="text-bg">
            <img
              src="~/assets/images/Exclusive-text.png"
              alt="Exclusive Offers"
            />
          </div>
        </div>
        <swiper
          class="product-slide"
          :slidesPerView="5"
          :breakpoints="breakpoints"
          :navigation="true"
          :pagination="false"
          :spaceBetween="30"
          :freeMode="true"
          :modules="modules"
        >
          <SwiperSlide
            class="product-slide-item"
            v-for="item in home_data.offers"
            :key="item"
          >
            <CategoriesProductCard
              :productImg="item.product_image"
              :price_before="item.price_before_discount"
              :price="item.price_after_discount"
              :productName="item.product_name"
              :rate="item.product_avg_rate"
              :id="item.product_id"
              :end_date="item.end_date"
            />
          </SwiperSlide>
        </swiper>
      </div>
    </section>
    <SettingsSubscribe v-if="IsAuth" />

    <SettingsContactUs />
  </div>
</template>

<script setup>
// ================================================================================ imports
import { useAuthStore } from "~/stores/auth";
import { Navigation, Autoplay, Pagination, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { toast_handel } from "~/network/ValidTost";
import { response } from "~/network/response";
import { useRoute } from "vue-router";
// ================================================================================ data
const modules = [Navigation, Pagination, Autoplay, FreeMode];
const useRout = useRoute();
const localPath = useLocalePath();
const htlang = ref();
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
    slidesPerView: 4,
  },
};
const authStore = useAuthStore();
const { notify_toast } = toast_handel();
const axios = useNuxtApp().$axios;
const home_data = ref([]);
const IsAuth = ref(false);
const categories = ref([]);
// ================================================================================ methods
//====================================== get lang
const gethtlang = () => {
  let html = document.getElementsByTagName("html")[0];
  let lang = html.getAttribute("lang");
  htlang.value = lang;
};

//  =================================== get home data
const getHomeData = async () => {
  let config = "";
  if (authStore.user) {
    config = {
      headers: { Authorization: `Bearer ${authStore.user.data.token}` },
    };
  }
  const res = await axios.get("home", config);
  let status = response(res).status;
  let data = response(res).data;
  if (status === "success") {
    home_data.value = data;
    categories.value = data.categories;
    console.log(categories.value);
  }
};

const check_token = () => {
  if (authStore.user) {
    const localeToken = authStore.user.data.token;
    console.log(localeToken);
    if (localeToken) {
      IsAuth.value = true;
    } else {
      IsAuth.value = false;
    }
  }
};
// ================================================================================ lifecycle hooks
onMounted(() => {
  getHomeData();
  gethtlang();
  check_token();
});

watch(useRout, () => {
  check_token();
});
</script>

<style lang="scss">
.main-slide {
  .main-slide-item {
    width: 100% !important;
    height: 750px;

    @media (max-width: 992px) {
      height: 400px;
    }

    @media (max-width: 767px) {
      height: 300px;
    }

    @media (max-width: 425px) {
      height: 250px;
    }

    @media (max-width: 375px) {
      height: 200px;
    }

    .slider-content {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      color: #fff;
      gap: 30px;

      h6 {
        position: relative;

        &:before,
        &:after {
          content: "";
          position: absolute;
          right: -80%;
          width: 100px;
          height: 1px;
          top: 50%;
          background-color: #fff;
        }

        &::after {
          left: -80%;
        }
      }

      @media (max-width: 767px) {
        gap: 20px;

        .title {
          font-size: 20px;
        }

        p {
          font-size: 12px !important;
        }

        .btn {
          min-width: 130px;
          font-size: 12px;
          height: 35px;
        }
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.5);
    }
  }
}

.swiper-button-next,
.swiper-button-prev {
  color: #fff;
}

.swiper-pagination-bullet {
  background-color: #fff;
}

html[lang="ar"] {
  .slider-content {
    h6 {
      &:before,
      &:after {
        right: unset !important;
        left: -80% !important;
      }

      &::after {
        right: -80% !important;
        left: unset !important;
      }
    }
  }
}
</style>
