<template>
  <div class="bg-sectionBg py-5">
    <div class="container">
      <h1 class="title text-center mb-4 fs-3 fw-bold">
        {{ $t("layout.AddMyProduct") }}
      </h1>

      <div class="w-50 mx-auto">
        <h6 class="fs-14px mb-3">
          {{ $t("layout.product_details") }}
        </h6>
        <form class="bg-white p-3 main_shadow">
          <FormInput
            :label="$t('layout.product_name')"
            :placeholder="$t('layout.product_name')"
            :model="addForm"
            name="product_name"
            type="text"
            parentClass="w-100 mb-3"
            :icon="false"
          >
          </FormInput>
          <div>
            <label class="fw-bold txt_start d-block mb-2">{{
              $t("layout.categories")
            }}</label>
            <div class="form-inputs">
              <Dropdown
                filter
                @change="category_check"
                v-model="addForm.category"
                :options="categories"
                optionLabel="name"
                :placeholder="$t('layout.categories')"
                class="w-full ps-1"
              />
              <div class="feedback city_feedback"></div>
            </div>
          </div>
          <div>
            <label class="fw-bold txt_start d-block mb-2">{{
              $t("layout.sub_category")
            }}</label>
            <div class="form-inputs">
              <Dropdown
                filter
                v-model="addForm.sub_category"
                :options="sub_categories"
                optionLabel="name"
                :placeholder="$t('layout.sub_category')"
                class="w-full ps-1"
              />
              <div class="feedback city_feedback"></div>
            </div>
          </div>

          <div class="w-100 mb-3">
            <FormFileUploader
              name="image"
              :icon="false"
              :label="$t('layout.product_image')"
              :placeholder="$t('layout.product_image')"
            >
            </FormFileUploader>
          </div>

          <FormInput
            :textarea="true"
            :label="$t('layout.product_description')"
            :placeholder="$t('layout.product_description')"
            :model="addForm"
            name="description"
            InputClass="height120 w-100 mb-3"
            type="text"
          >
          </FormInput>

          <FormInput
            :label="$t('layout.product_price')"
            :placeholder="$t('layout.product_price')"
            :model="addForm"
            name="product_price"
            type="text"
            parentClass="w-100 mb-3"
            :icon="false"
          >
          </FormInput>
          <div>
            <label class="fw-bold txt_start d-block mb-2">{{
              $t("product.brand")
            }}</label>
            <div class="form-inputs">
              <Dropdown
                filter
                v-model="addForm.brand"
                :options="brands"
                optionLabel="name"
                :placeholder="$t('product.brand')"
                class="w-full ps-1"
              />
              <div class="feedback city_feedback"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// ================================================================================ imports

import { response } from "~/network/response";
// ================================================================================ data

const axios = useNuxtApp().$axios;
const categories = ref([]);
const sub_categories = ref([]);
const addForm = ref({
  product_name: "",
  category: "",
  sub_category: "",
  description: "",
  product_price: "",
  brand: "",
});
const brands = ref([
    { name: 'brand 1', code: 'NY' },
    { name: 'brand 2', code: 'RM' },
]);
// ================================================================================ methods

// ===================================== get categories & sub categories
const get_categories = async () => {
  axios
    .get(`categories`)
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

const get_sub_categories = async () => {
  axios
    .get(`categories/${addForm.value.category.id}`)
    .then((res) => {
      let status = response(res).status;
      let data = response(res).data;
      if (status === "success") {
        sub_categories.value = data;
      }
    })
    .catch((e) => {
      console.error(e);
    });
};
const category_check = () => {
  get_sub_categories();
};

// ================================================================================ lifecycle hooks
onMounted(() => {
  get_categories();
});
</script>

<style scoped></style>
