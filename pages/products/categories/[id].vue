<template>
  <div class="bg-sectionBg">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-5 py-3 px-0">
          <form action="">
            <div class="px-3 px-lg-5 border-bottom border-white mb-3 pb-3">
              <label class="fw-bold txt_start d-block mb-2">{{
                $t("layout.sub_category")
              }}</label>
              <div class="form-inputs">
                <Dropdown
                  filter
                  v-model="filterForm.selectedCat"
                  :options="categories"
                  optionLabel="name"
                  :placeholder="$t('layout.choose_category')"
                  class="w-full ps-1"
                />
                <div class="feedback city_feedback"></div>
              </div>
            </div>
            <div class="px-3 px-lg-5 border-bottom border-white mb-3">
              <label class="fw-bold txt_start d-block mb-2">{{
                $t("layout.price")
              }}</label>

              <form-radio-group
                :options="priceOptions"
                :model="filterForm"
                name="price"
                isColumn
              >
              </form-radio-group>

              <div class="d-flex flex-wrap">
                <FormInput
                  :placeholder="$t('layout.from')"
                  :model="filterForm"
                  name="from"
                  type="text"
                  parentClass="col-12 lg:col-6"
                  :icon="false"
                >
                </FormInput>
                <FormInput
                  :placeholder="$t('layout.to')"
                  :model="filterForm"
                  name="to"
                  type="text"
                  parentClass="col-12 lg:col-6"
                  :icon="false"
                >
                </FormInput>
              </div>
            </div>
            <div class="px-3 px-lg-5 border-bottom border-white mb-3 pb-3">
              <FormCheckbox
                name="best_selling"
                :model="filterForm"
                :label="$t('layout.best_selling')"
              />
            </div>
            <div class="px-3 px-lg-5 mb-3 pb-3">
              <button class="btn btn-primary arrow-effect">
                {{ $t("layout.apply") }}
              </button>
            </div>
          </form>
        </div>
        <div class="col-lg-9 col-md-8 col-sm-7 py-3">
          <FormInput
            :placeholder="$t('layout.search_products')"
            :model="filterForm"
            name="search"
            type="text"
            parentClass="col-12 lg:col-6"
            :icon="false"
            :addition="true"
          >
            <template #addition>
              <button class="btn btn-secondary min-w-unset px-3 h-100">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </template>
          </FormInput>

          <div class="d-grid product-slide">
            <div
              v-if="loading"
              class="product-slide-item mb-3 mx-1"
              v-for="i in 17"
            >
              <Skeleton class="product-item" height="9rem"></Skeleton>
            </div>
            <div
              v-else
              class="product-slide-item mb-3"
              v-for="product in products"
              :key="product.id"
            >
              <CategoriesProductCard
                :productImg="product.image"
                :price="product.price"
                :productName="product.name"
                :rate="product.average_rate"
                :id="product.id"
              />
            </div>
          </div>

          <div v-if="showPaginate">
            <Paginator
              :rows="pageLimit"
              @page="onPaginate"
              :totalRecords="totalPage"
              class="mt-5 bg-transparent"
              dir="ltr"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ========================================================================= imports
import Skeleton from "primevue/skeleton";
import Paginator from "primevue/paginator";
import { response } from "~/network/response";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

// ========================================================================= data
const axios = useNuxtApp().$axios;
const { t } = useI18n();
const filterForm = ref({
  selectedCat: "",
  price: "",
  from: "",
  to: "",
  best_selling: false,
  search: "",
});
const loading = ref(true);
const categories = ref([]);
const products = ref([]);
const priceOptions = [
  { label: t("layout.high_low"), name: "desc" },
  { label: t("layout.low_high"), name: "asc" },
];

const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

// ========================================================================= methods

const onPaginate = (e) => {
  loading.value = true;
  currentPage.value = e.page + 1;
  window.scrollTo(0, 0);
  getData();
};

let showPaginate = computed(() => {
  return totalPage.value > pageLimit.value;
});

// ===================================== get categories
const get_categories = async () => {
  axios
    .get(`categories/${id}`)
    .then((res) => {
      let status = response(res).status;
      let data = response(res).data;
      if (status === "success") {
        categories.value = data;
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

// ===================================== get products// route Id
const { id } = useRoute().params;
const get_products = async () => {
  axios
    .get(`get-category-products/${id}?page=${currentPage.value}`)
    .then((res) => {
      let status = response(res).status;
      let data = response(res).data;
      if (status === "success") {
        products.value = data.products;
        totalPage.value = data.pagination.total_items;
        pageLimit.value = data.pagination.per_page;
        loading.value = false;
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

// ========================================================================= lifecycle hooks
onMounted(() => {
  get_categories();
  get_products();
});
</script>

<style lang="scss" scoped></style>
