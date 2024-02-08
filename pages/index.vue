<template>
  <div class="home-sections">
    <div class="home-swiper">
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
        <SwiperSlide class="main-slide-item">
          <img src="~/assets/images/background-51.png" alt="" />
          <div class="slider-content">
            <!-- <h6>FOR ANY OCCATION</h6> -->
            <h1 class="title">Dresses For Rent ?</h1>
            <p class="fs-6 w-75 text-center">
              Looking to rent the gorgeous designer dress? Explore our large
              collection and find your favorite one now!
            </p>
            <button class="btn btn-primary arrow-effect">
              {{ $t("layout.see_more") }}
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide class="main-slide-item">
          <img src="~/assets/images/service.png" alt="" />
          <div class="slider-content">
            <!-- <h6>FOR ANY OCCATION</h6> -->
            <h1 class="title">Dresses For Rent ?</h1>
            <p class="fs-6 w-75 text-center">
              Looking to rent the gorgeous designer dress? Explore our large
              collection and find your favorite one now!
            </p>
            <button class="btn btn-primary arrow-effect">
              {{ $t("layout.see_more") }}
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
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
          <div class="col-12 md:col-6 lg:col-4">
            <div class="category-card">
              <div class="card-img">
                <img src="~/assets/images/service-4.png" alt="dresses" />
                <div class="hv-layer">
                  <NuxtLink :to="localPath('/products')">
                    <div
                      class="flex align-items-end justify-content-center w-100 h-100"
                    >
                      <img
                        class="width40 height40"
                        src="~/assets/images/link-icon.svg"
                        alt="link"
                      />
    <div class="home-sections">

        <div class="home-swiper">
            <!-- :autoplay="{
                delay: 5000,
                disableOnInteraction: false,
            }"  -->
            <Swiper :autoplay="false" :pagination="{
                dynamicBullets: true,
            }" :navigation="true" :modules="modules" class="main-slide">
                <SwiperSlide class="main-slide-item">
                    <img src="~/assets/images/background-51.png" alt="">
                    <div class="slider-content">
                        <!-- <h6>FOR ANY OCCATION</h6> -->
                        <h1 class="title">Dresses For Rent ?</h1>
                        <p class="fs-6 w-75 text-center">
                            Looking to rent the gorgeous designer dress? Explore our large collection and find your favorite
                            one now!
                        </p>
                        <button class="btn btn-primary arrow-effect">{{ $t('layout.see_more') }}</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide class="main-slide-item">
                    <img src="~/assets/images/service.png" alt="">
                    <div class="slider-content">
                        <!-- <h6>FOR ANY OCCATION</h6> -->
                        <h1 class="title">Dresses For Rent ?</h1>
                        <p class="fs-6 w-75 text-center">
                            Looking to rent the gorgeous designer dress? Explore our large collection and find your favorite
                            one now!
                        </p>
                        <button class="btn btn-primary arrow-effect">{{ $t('layout.see_more') }}</button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>

        <section class="main-sec">
            <div class="container">
                <div class="sec-title">
                    <h2 class="title">{{ $t('layout.categories') }}</h2>
                    <div class="text-bg"><img src="~/assets/images/categories-text.png" alt="categories"></div>
                </div>
                <div class="grid">
                    <div class="col-12 md:col-6 lg:col-4">
                        <div class="category-card">
                            <div class="card-img">
                                <img src="~/assets/images/service-4.png" alt="dresses">
                                <div class="hv-layer">
                                    <NuxtLink :to="localPath('/')">
                                        <div class="flex align-items-end justify-content-center w-100 h-100">
                                            <img class="width40 height40" src="~/assets/images/link-icon.svg" alt="link">
                                        </div>
                                    </NuxtLink>
                                </div>
                            </div>
                            <div class="card-info">
                                <h5 class="title text-secondary">{{ $t('layout.dresses') }}</h5>
                                <p class="fs-6 text-center p-2">{{ $t('layout.dresses_caption') }}</p>
                                <NuxtLink class="default-link arrow-btn" :to="localPath('/')">
                                    <div class="d-flex align-items-center">
                                        <span>{{ $t('layout.see_more') }}</span>
                                        <img src="~/assets/images/ArrowRight.svg" alt="arrow">
                                    </div>
                                </NuxtLink>
                                <span class="arrow up"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 md:col-6 lg:col-8">
                        <div class="category-card wide">
                            <div class="card-info">
                                <h5 class="title text-secondary ">{{ $t('layout.handbags') }}</h5>
                                <p class="fs-6 text-center">{{ $t('layout.handbags_caption') }}</p>
                                <NuxtLink class="default-link  arrow-btn" :to="localPath('/')">
                                    <div class="d-flex align-items-center">
                                        <span>{{ $t('layout.see_more') }}</span>
                                        <img src="~/assets/images/ArrowRight.svg" alt="arrow">
                                    </div>
                                </NuxtLink>
                                <span class="arrow" :class="htlang === 'ar' ? 'left' : 'right'"></span>
                            </div>
                            <div class="card-img">
                                <img src="~/assets/images/service-4.png" alt="handbags">
                                <div class="hv-layer">
                                    <NuxtLink :to="localPath('/')">
                                        <div class="flex align-items-center w-100 h-100">
                                            <img class="width40 height40" src="~/assets/images/link-icon.svg" alt="link">
                                        </div>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>

                    </div>
                  </NuxtLink>
                </div>
              </div>
              <div class="card-info">
                <h5 class="title text-secondary">{{ $t("layout.dresses") }}</h5>
                <p class="fs-6 text-center p-2">
                  {{ $t("layout.dresses_caption") }}
                </p>
                <NuxtLink class="default-link arrow-btn" :to="localPath('/products')">
                  <div class="d-flex align-items-center">
                    <span>{{ $t("layout.see_more") }}</span>
                    <img src="~/assets/images/ArrowRight.svg" alt="arrow" />
                  </div>
                </NuxtLink>
                <span class="arrow up"></span>
              </div>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-8">
            <div class="category-card wide">
              <div class="card-info">
                <h5 class="title text-secondary">
                  {{ $t("layout.handbags") }}
                </h5>
                <p class="fs-6 text-center">
                  {{ $t("layout.handbags_caption") }}
                </p>
                <NuxtLink class="default-link arrow-btn" :to="localPath('/')">
                  <div class="d-flex align-items-center">
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
                <img src="~/assets/images/service-4.png" alt="handbags" />
                <div class="hv-layer">
                  <NuxtLink :to="localPath('/')">
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
          </div>
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
          <SwiperSlide class="product-slide-item" v-for="i in 10" :key="i">
            <CategoriesProductCard
              productImg="https://www.freepnglogos.com/uploads/women-bag-png/women-bag-png-transparent-images-download-clip-4.png"
              price="250 SAR"
              productName="Handbag"
              rate="4"
              id="1"
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
          <SwiperSlide class="product-slide-item" v-for="i in 10" :key="i">
            <CategoriesProductCard
              productImg="https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png"
              price="250 SAR"
              productName="Handbag"
              rate="4"
              id="1"
            />
          </SwiperSlide>
        </swiper>
      </div>
    </section>
    <section class="main-sec">
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
          <SwiperSlide class="product-slide-item" v-for="i in 10" :key="i">
            <CategoriesProductCard
              productImg="https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png"
              price="250 SAR"
              productName="Handbag"
              rate="4"
              id="1"
            />
          </SwiperSlide>
        </swiper>
      </div>
    </section>
    <SettingsSubscribe />

    <SettingsContactUs />
  </div>

        </section>

        <section class="main-sec bg-lightGrayClr">
            <div class="container m-bottom-100">
                <div class="sec-title">
                    <h2 class="title">{{ $t('layout.handbags') }}</h2>
                    <div class="text-bg"><img src="~/assets/images/products-text.png" alt="products"></div>
                </div>
                <swiper class="product-slide" :slidesPerView="5" :breakpoints="breakpoints" :navigation="true"
                    :pagination="false" :spaceBetween="30" :freeMode="true" :modules="modules">
                    <SwiperSlide class="product-slide-item" v-for="i in 10" :key="i">
                        <CategoriesProductCard
                            productImg="https://www.freepnglogos.com/uploads/women-bag-png/women-bag-png-transparent-images-download-clip-4.png"
                            price="250 SAR" productName="Handbag" rate="4" id="1" />
                    </SwiperSlide>
                </swiper>
            </div>
            <div class="container">
                <div class="sec-title">
                    <h2 class="title">{{ $t('layout.dresses') }}</h2>
                </div>
                <swiper class="product-slide" :slidesPerView="5" :breakpoints="breakpoints" :navigation="true"
                    :pagination="false" :spaceBetween="30" :freeMode="true" :modules="modules">
                    <SwiperSlide class="product-slide-item" v-for="i in 10" :key="i">
                        <CategoriesProductCard
                            productImg="https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png"
                            price="250 SAR" productName="Handbag" rate="4" id="1" />
                    </SwiperSlide>
                </swiper>
            </div>
        </section>

        <section class="main-sec">
            <div class="container">
                <div class="sec-title">
                    <h2 class="title">{{ $t('layout.exclusive_offers') }}</h2>
                    <div class="text-bg"><img src="~/assets/images/Exclusive-text.png" alt="Exclusive Offers"></div>
                </div>
                <swiper class="product-slide" :slidesPerView="5" :breakpoints="breakpoints" :navigation="true"
                    :pagination="false" :spaceBetween="30" :freeMode="true" :modules="modules">
                    <SwiperSlide class="product-slide-item" v-for="i in 10" :key="i">
                        <CategoriesProductCard
                            productImg="https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png"
                            price="250 SAR" productName="Handbag" rate="4" id="1" />
                    </SwiperSlide>
                </swiper>
            </div>
        </section>

        <SettingsSubscribe />

        <SettingsContactUs />

    </div>
</template>

<script setup>
// ================================================================================ imports
import { Navigation, Autoplay, Pagination, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
// ================================================================================ data
const modules = [Navigation, Pagination, Autoplay, FreeMode];
const localPath = useLocalePath();
const htlang = ref();
const gethtlang = () => {
  let html = document.getElementsByTagName("html")[0];
  let lang = html.getAttribute("lang");
  htlang.value = lang;
};
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


// ================================================================================ methods

// ================================================================================ lifecycle hooks
onMounted(() => {
  gethtlang();
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

}
</style>
