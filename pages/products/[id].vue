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
              <Galleria :value="attchements" v-model:activeIndex="activeIndex" :numVisible="5" :circular="true"
                :transitionInterval="3000">
                <template #item="slotProps">
                  <img class="galleria_img" :src="slotProps.item.image" alt="product image"
                    style="max-height: 100%; display: block" />
                  <Image :src="slotProps.item.image" alt="Image" class="fancyImg" preview />
                </template>
                <template #thumbnail="slotProps">
                  <img class="thumbnail_img" :src="slotProps.item.image" alt="thumbnail"
                    style="display: block; max-height: 100%" />
                </template>
              </Galleria>
            </div>

            <div class="not_found galleria" v-else>
              <img class="thumbnail_img w-100 h-100" :src="product.image" alt="thumbnail" />
            </div>
          </div>

          <div class="col-xl-4 col-lg-7">
            <!-- Name -->
            <div class="mb-3">
              <div class="product_bread">
                <div class="product_cat">{{ product.categories_name }}</div>
              </div>

              <div class="product_name c-primary fw-bold mt-1">
                {{ product.name }}
              </div>
            </div>

            <!-- Price -->
            <div class="mb-3">
              <div class="product_bread">{{ $t("product.price") }}</div>

              <div class="fs15 c-primary fw-bold mt-1">
                {{ product.price }} {{ $t("product.currency") }} /
                {{ $t("product.unit") }}
              </div>
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
                  {{ product.rate_count }} {{ $t("layout.review") }}
                </div>
              </div>
            </div>

            <hr class="mb-4" />

            <!-- Description -->
            <p class="mb-4">{{ product.description }}</p>

            <!-- Size -->
            <div class="mb-4">
              <div class="product_bread">{{ $t("product.size") }}</div>

              <div v-if="product.sizes && product.sizes.length" class="pro_filter_btns mt-2">
                <label class="pro_btn" v-for="size in product.sizes" :key="size.id">
                  <input type="radio" name="size" v-model="selectedSize" :value="size.size_id" />
                  {{ size.size }}
                </label>
              </div>
              <div v-else class="c-primary mt-1">
                {{ $t("product.no_size") }}
              </div>
            </div>

            <!-- Color -->
            <div>
              <div class="product_bread">{{ $t("product.color") }}</div>

              <div v-if="product.imagesAndColors && product.imagesAndColors.length" class="pro_filter_btns mt-2">
                <label class="pro_btn" v-for="color in product.imagesAndColors" :key="color.id">
                  <input type="radio" name="color" @change="changeColor(color.color_id)" v-model="selectedColor"
                    :value="color.color_id" />
                  {{ color.color }}
                  <span :style="{ 'background-color': color.color }" class="color"></span>
                </label>
              </div>
              <div v-else class="c-primary mt-1">
                {{ $t("product.no_color") }}
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-5">
            <div class="rent_date">
              <div class="my-2">
                <label class="fw-bold txt_start font12 d-block mb-2">{{
          $t("product.startDate")
        }}</label>
                <div class="form-inputs height50">
                  <Calendar dateFormat="yy-m-d" ref="calender" :minDate="today" v-model="start_date" showIcon
                    icon="pi pi-calendar" :placeholder="$t('product.selectDate')" name="time"
                    :disabledDates="reservedDates" />
                </div>
              </div>
              <div class="mt-4" v-if="start_date">
                <div class="fw-bold text-center font14 d-block mb-2">
                  {{ $t("product.select_duration") }}
                </div>
                <div class="pro_filter_btns justify-content-center mt-2">
                  <label class="pro_btn" v-for="item in durations" :key="item.id">
                    <input type="radio" name="duration" v-model="selectedDuration" :value="item.id" />
                    <span class="fw-bold">{{ item.day }} {{ $t("product.unit") }}</span>
                  </label>
                </div>
                <hr />
                <div class="flex align-items-center justify-content-center">
                  <button @click="add_to_cart" style="min-width: 135px" class="btn btn-primary fw-bold up">
                    {{ $t("product.add_to_cart") }}
                  </button>
                  <button style="min-width: 135px" type="button" class="btn fw-bold ms-2" @click="start_date = null">
                    {{ $t("product.cancel") }}
                  </button>
                </div>
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
        <h4 class="title mb-5">{{ $t("product.another_products") }}</h4>

        <swiper class="product-slide" :slidesPerView="5" :breakpoints="breakpoints" :navigation="true"
          :pagination="false" :spaceBetween="30" :freeMode="true" :modules="modules">
          <SwiperSlide class="product-slide-item" v-for="product in you_may_also_know" :key="product.id">
            <CategoriesProductCard :productImg="product.image" :price="product.price" :productName="product.name"
              :rate="product.rate_average" :id="product.id" />
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
import { Navigation, Autoplay, Pagination, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
import { useI18n } from "vue-i18n";
// ================================================================================ data
const { t } = useI18n({ useScope: "global" });
const modules = [Navigation, Pagination, Autoplay, FreeMode];
const localPath = useLocalePath();
const axios = useNuxtApp().$axios;
const authStore = useAuthStore();
const { notify_toast } = toast_handel();
const route = useRouter();
const { id } = useRoute().params;
const today = new Date();
const loading = ref(false);
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
  },
};
const product = ref({});
const attchements = ref([]);
const reservedDates = ref([]);
const selectedSize = ref(null);
const selectedColor = ref(null);
const selectedDuration = ref(null);
const start_date = ref();
const durations = ref([]);
const calender = ref();
const you_may_also_know = ref([]);
const activeIndex = ref(0);
// ================================================================================ methods
const formatingDate = computed(() => {
  var d = new Date(start_date.value),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
});
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

        reservedDates.value = data.product.reserved_dates.map(
          (dateString) => new Date(dateString)
        );
        if (data.product.sizes.length) {
          selectedSize.value = data.product.sizes[0].size_id;
        }
        durations.value = data.durations;
        if (data.product.imagesAndColors.length) {
          selectedColor.value = data.product.imagesAndColors[0].color_id;
        }
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
    if (attchements.value[i].color_id == colorId) {
      activeIndex.value = i;
      selectedColor.value = colorId;
    }
  }
};
const add_to_cart = async () => {
  const fd = new FormData();
  fd.append("product_id", product.value.id);
  if (selectedColor.value) {
    fd.append("color_id", selectedColor.value);
  } else {
    fd.append("color_id", "");
  }
  if (selectedSize.value) {
    fd.append("size_id", selectedSize.value);
  } else {
    fd.append("size_id", "");
  }
  fd.append("start_date", formatingDate.value);
  fd.append("duration_id", selectedDuration.value);

  if (authStore.user) {
    const config = {
      headers: { Authorization: `Bearer ${authStore.user.data.token}` },
    };
    const res = await axios.post("add-cart-item", fd, config);
    let status = response(res).status;
    let msg = response(res).msg;
    if (status === "success") {
      notify_toast(msg, "success");
      start_date.value = null;
      setTimeout(() => {
        route.push(localPath({ path: `/cart` }));
      });
    } else {
      notify_toast(msg, "error");
    }
  } else {
    notify_toast(t("layout.login_first"), "error");
  }
};

// ================================================================================ lifecycle hooks
onMounted(() => {
  get_detailes();
});
watch(activeIndex, (newVal) => {
  changeColor(attchements.value[newVal].color_id);
});
</script>

<style scoped>
.disabled {
  pointer-events: none;
  user-select: none;
  opacity: 0.5;
  /* Reduce opacity for disabled dates */
}
</style>
