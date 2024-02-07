<template>
  <div class="row mx-0">
    <div class="col-md-4 col-lg-3 bg-lightGrayClr py-3 px-0">
      <form action="">
        <div class="px-lg-5 border-bottom border-white mb-3 pb-3">
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
        <div class="px-lg-5 border-bottom border-white mb-3">
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
        <div class="px-lg-5 border-bottom border-white mb-3 pb-3">
          <FormCheckbox
            name="best_selling"
            :model="filterForm"
            :label="$t('layout.best_selling')"
          />
        </div>
        <div class="px-lg-5 mb-3 pb-3">
          <button class="btn btn-primary arrow-effect">
            {{ $t("layout.apply") }}
          </button>
        </div>
      </form>
    </div>
    <div class="col-md-8 col-lg-9 py-3 bg-light-cardBg">
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
          <button class="btn btn-secondary min-w-unset px-3">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </template>
      </FormInput>

      <div class="row product-slide">
        <div class="col-md-3 product-slide-item" v-for="i in 10" :key="i">
          <CategoriesProductCard
            productImg="https://www.freepnglogos.com/uploads/women-bag-png/women-bag-png-transparent-images-download-clip-4.png"
            price="250 SAR"
            productName="Handbag"
            rate="4"
            id="1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const filterForm = ref({
  selectedCat: "",
  price: "",
  from: "",
  to: "",
  best_selling: false,
  search: "",
});
const categories = ref([]);
const priceOptions = [
  { label: t("layout.high_low"), name: "h-t-l" },
  { label: t("layout.low_high"), name: "l-t-h" },
];
</script>

<style lang="scss" scoped></style>
