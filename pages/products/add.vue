<template>
  <section class="bg-lightGrayClr py-5">
    <div class="container">
      <div class="grid">
        <div class="col-12 md:col-8 lg:col-7 mx-auto">
          <h3 class="fw-bold text-center py-3">
            {{ $t("layout.AddMyProduct") }}
          </h3>
        </div>
        <div class="col-12 md:col-8 lg:col-7 mx-auto">
          <h6 class="fw-bold text-start">
            {{ $t("layout.product_details") }}
          </h6>
        </div>
        <div class="col-12 md:col-8 lg:col-7 mx-auto bg-white main_shadow">
          <form style="max-width: 90%" class="mx-auto py-3" @submit.prevent="handelAddProduct" ref="addProoduct">
            <FormInput :label="$t('layout.product_name') + ' (Ar)'" :placeholder="$t('layout.product_name') + ' (Ar)'"
              :model="addForm.name" name="name_ar" type="text" parentClass="w-100 mb-3" :icon="false"
              InputClass="validated" @change="change_valid">
            </FormInput>
            <FormInput :label="$t('layout.product_name') + ' (En)'" :placeholder="$t('layout.product_name') + ' (En)'"
              :model="addForm.name" name="name_en" type="text" parentClass="w-100 mb-3" :icon="false"
              InputClass="validated" @change="change_valid">
            </FormInput>
            <div class="mb-3">
              <label class="fw-bold txt_start d-block mb-2">{{
                $t("layout.categories")
              }}</label>
              <div class="form-inputs">
                <Dropdown filter @change="category_check" v-model="addForm.category"
                  :emptyFilterMessage="$t('validate_msg.emptyFilterMessage')"
                  :emptyMessage="$t('validate_msg.emptyFilterMessage')" :options="categories" optionLabel="name"
                  :placeholder="$t('layout.categories')" class="w-full ps-1" />
                <div class="feedback category_feedback"></div>
              </div>
            </div>
            <div class="mb-3">
              <label class="fw-bold txt_start d-block mb-2">{{
                $t("layout.sub_category")
              }}</label>
              <div class="form-inputs">
                <Dropdown filter @change="subCategory_check" v-model="addForm.sub_category"
                  :emptyFilterMessage="$t('validate_msg.emptyFilterMessage')"
                  :emptyMessage="$t('validate_msg.emptyFilterMessage')" :options="sub_categories" optionLabel="name"
                  :placeholder="$t('layout.sub_category')" class="w-full ps-1" />
                <div class="feedback subCategory_feedback"></div>
              </div>
            </div>

            <div class="w-100 mb-3">
              <FormFileUploader @update:fileUrl="handleFileUrlUpdate" name="image" id="product-image" :icon="false"
                :label="$t('layout.product_image')" :placeholder="$t('layout.product_image')">
              </FormFileUploader>
              <div class="feedback product_image_feedback"></div>
            </div>

            <div class="mb-3">
              <FormInput :textarea="true" :label="$t('layout.product_description') + ' (Ar)'"
                :placeholder="$t('layout.product_description') + ' (Ar)'" :model="addForm.description"
                name="description_ar" InputClass="height120 w-100 validated" type="text" @change="change_valid">
              </FormInput>
            </div>
            <div class="mb-3">
              <FormInput :textarea="true" :label="$t('layout.product_description') + ' (En)'"
                :placeholder="$t('layout.product_description') + ' (En)'" :model="addForm.description"
                name="description_en" InputClass="height120 w-100 validated" type="text" @change="change_valid">
              </FormInput>
            </div>
            <FormInput :label="$t('layout.product_price')" :placeholder="$t('layout.product_price')" :model="addForm"
              name="price" type="text" parentClass="w-100 mb-3" :icon="false" InputClass="validated"
              @change="change_valid">
            </FormInput>
            <div class="mb-3">
              <label class="fw-bold txt_start d-block mb-2">{{
                $t("product.brand")
              }}</label>
              <div class="form-inputs">
                <Dropdown filter @change="brand_check" v-model="addForm.brand"
                  :emptyFilterMessage="$t('validate_msg.emptyFilterMessage')"
                  :emptyMessage="$t('validate_msg.emptyFilterMessage')" :options="brands" optionLabel="name"
                  :placeholder="$t('product.brand')" class="w-full ps-1" />
                <div class="feedback brand_feedback"></div>
              </div>
            </div>
            <div class="mb-3">
              <label class="fw-bold txt_start d-block mb-2">{{
                $t("layout.product_type")
              }}</label>
              <div class="form-inputs">
                <Dropdown filter @change="productType_check" v-model="addForm.product_type"
                  :emptyFilterMessage="$t('validate_msg.emptyFilterMessage')"
                  :emptyMessage="$t('validate_msg.emptyFilterMessage')" :options="types" optionLabel="name"
                  :placeholder="$t('layout.product_type')" class="w-full ps-1" />
                <div class="feedback product_type_feedback"></div>
              </div>
            </div>

            <div class="mb-3" v-for="(row, index) in addForm.features_rows" :key="index">
              <div class="bg-gray-200 mb-3 p-3">
                <div v-if="!featureExist">
                  <label class="fw-bold txt_start d-block mb-2">{{
                    $t("layout.features")
                  }}</label>
                  <div class="form-inputs">
                    <Dropdown filter v-model="addForm.features_rows[index].feature" :options="features" optionLabel="name"
                      :placeholder="$t('layout.features')" class="w-full ps-1" />
                    <div class="feedback city_feedback"></div>
                  </div>
                </div>
                <div v-if="addForm.features_rows[index].feature.id == 'color'">
                  <label class="fw-bold txt_start d-block mb-2">{{
                    $t("product.select_colors")
                  }}</label>
                  <div class="form-inputs mb-3">
                    <MultiSelect v-model="addForm.features_rows[index].colors" @change="getSelectedcolor()"
                      :options="colors" optionLabel="color" :placeholder="$t('product.color')" class="w-full ps-1" />
                  </div>

                  <div v-for="(color, colorIndex) in addForm.features_rows[index]
                    .colors" :key="colorIndex" class="w-100 mb-3">
                    <FormFileUploader :name="`colors.${colorIndex}.image`" @update:fileUrl="
                      handleColorUrlUpdate(
                        $event,
                        color.id,
                        addForm.features_rows[index].colors
                      )
                      " :id="color.id" :icon="false" :label="color.color" :placeholder="color.color">
                    </FormFileUploader>
                    <div class="feedback" :class="`color_image${color.id}_feedback`"></div>
                  </div>
                </div>
                <div v-if="addForm.features_rows[index].feature.id == 'size'">
                  <label class="fw-bold txt_start d-block mb-2">{{
                    $t("product.select_sizes")
                  }}</label>
                  <div class="form-inputs">
                    <MultiSelect v-model="addForm.features_rows[index].sizes" @change="getSelectedSize()" :options="sizes"
                      optionLabel="size" :placeholder="$t('product.size')" class="w-full ps-1" />
                  </div>
                </div>
              </div>
            </div>

            <button v-if="(addForm.product_type.id == 'various') &
              !bothColorAndSizeSelected
              " @click="addFeatureRow" type="button" class="btn w-100 transparent btn-primary fw-bold">
              {{ $t("layout.add_feature") }}
              <i class="fa-solid fa-circle-plus mx-1 fs-5 text-gray-600"></i>
            </button>

            <button class="btn btn-primary w-100 mt-3" :loading="loading" :disabled="loading === true">
              <div class="d-flex align-items-center justify-content-center gap5">
                <span>{{ $t("layout.send") }}</span>
                <div class="spinner-border spinner-border-sm" :class="loading ? 'd-block' : 'd-none'" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>

    <Dialog class="site-modal none-header" v-model:visible="success_modal" modal :style="{ width: '25rem' }">
      <div class="container">
        <div class="flex justify-content-center align-items-center flex-column py-4 gap30">
          <img src="~/assets/images/success.svg" class="w-25 h-auto" alt="success message" />
          <h5 class="text-center fw-bold text-primary">
            {{ $t("layout.product_sent") }}
          </h5>
          <h6 class="text-center text-primary">
            {{ $t("layout.contact_soon") }}
          </h6>
          <NuxtLink class="btn btn-primary w-100" @click="success_modal = false" :to="localPath('/')">
            {{ $t("cart.done.home") }}
          </NuxtLink>
        </div>
      </div>
    </Dialog>
  </section>
</template>

<script setup>
// ================================================================================ imports

import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
import { validate, change_valid } from "~/validation/validation";
// ================================================================================ data

const success_modal = ref(false);
const localPath = useLocalePath();
const { t } = useI18n();
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
const loading = ref(false);
const categories = ref([]);
const sub_categories = ref([]);
const sizes = ref([]);
const brands = ref([]);
const colors = ref([]);
const featureExist = ref(false);
const addProoduct = ref();
const addForm = ref({
  name: {},
  product_image: "",
  category: "",
  sub_category: "",
  description: {},
  price: "",
  brand: "",
  product_type: "",
  features_rows: [],
});
const types = ref([
  { name: t("layout.simple"), id: "simple" },
  { name: t("layout.various_features"), id: "various" },
]);
const features = ref([
  { name: t("product.color"), id: "color" },
  { name: t("product.size"), id: "size" },
]);

const selectedSizes = ref([]);
const selectedColors = ref([]);
const selectedColorsIds = ref([]);

// ================================================================================ methods

// get selected size
const getSelectedSize = () => {
  selectedSizes.value = [];
  addForm.value.features_rows.forEach((row) => {
    if (row.feature && row.feature.id === "size") {
      row.sizes.forEach((size) => {
        selectedSizes.value.push(size.id);
      });
    }
  });
};
// get selected color Ids
const getSelectedcolor = () => {
  selectedColorsIds.value = [];
  addForm.value.features_rows.forEach((row) => {
    if (row.feature && row.feature.id === "color") {
      row.colors.forEach((color) => {
        selectedColorsIds.value.push(color.id);
      });
    }
  });
};

// handel product image
function handleFileUrlUpdate(fileUrl) {
  addForm.value.product_image = fileUrl;
  productImage_check();
}

// append image for each selected color
function handleColorUrlUpdate(fileUrl, id, myColors) {
  myColors = myColors.map((color) => {
    if (color.id == id) {
      color.image = fileUrl;
      const index = selectedColors.value.findIndex(
        (color) => color.color_id === id
      );
      if (index !== -1) {
        selectedColors.value[index].image = fileUrl;
      } else {
        selectedColors.value.push({
          image: fileUrl,
          color_id: id,
        });
      }
      colorImage_check();
    }
  });
}

// Computed property to check if both color and size are selected
const bothColorAndSizeSelected = computed(() => {
  const colorSelected = addForm.value.features_rows.some(
    (row) => row.feature && row.feature.id === "color"
  );
  const sizeSelected = addForm.value.features_rows.some(
    (row) => row.feature && row.feature.id === "size"
  );
  return colorSelected && sizeSelected;
});

// add feature
const addFeatureRow = () => {
  const colorSelected = addForm.value.features_rows.some(
    (row) => row.feature && row.feature.id === "color"
  );
  const sizeSelected = addForm.value.features_rows.some(
    (row) => row.feature && row.feature.id === "size"
  );

  const featureSelected = addForm.value.features_rows.some(
    (row) => row.feature
  );

  // If color and size both not selected yet, add it
  if (!colorSelected && !sizeSelected) {
    addForm.value.features_rows.push({
      feature: "",
    });
    return;
  }

  // If color is not selected yet, add it
  if (!colorSelected) {
    addForm.value.features_rows.push({
      feature: { id: "color" },
    });
    if (featureSelected) {
      featureExist.value = true;
    }
    return;
  }

  // If size is not selected yet, add it
  if (!sizeSelected) {
    addForm.value.features_rows.push({
      feature: { id: "size" },
    });
    if (featureSelected) {
      featureExist.value = true;
    }
  }
};

// ===================================== brands
const get_brands = async () => {
  axios
    .get(`brands`)
    .then((res) => {
      let status = response(res).status;
      let data = response(res).data;
      if (status === "success") {
        brands.value = data;
      }
    })
    .catch((e) => {
      console.error(e);
    });
};
// ===================================== colors
const get_colors = async () => {
  axios
    .get(`colors`)
    .then((res) => {
      let status = response(res).status;
      let data = response(res).data;
      if (status === "success") {
        colors.value = data;
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

// ===================================== sizes
const get_sizes = async () => {
  axios
    .get(`sizes`)
    .then((res) => {
      let status = response(res).status;
      let data = response(res).data;
      if (status === "success") {
        sizes.value = data;
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

// ===================================== get categories
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

// ===================================== sub categories
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

// validate category
const category_check = () => {
  let category_feedback =
    document.getElementsByClassName("category_feedback")[0];
  if (!addForm.value.category.id) {
    category_feedback.classList.add("valid");
    category_feedback.innerHTML = `<span>${t(
      `validate_msg.select_category`
    )}</span>`;
    return false;
  } else {
    get_sub_categories();
    category_feedback.classList.remove("valid");
    category_feedback.innerHTML = "";
    return true;
  }
};

// validate sub category
const subCategory_check = () => {
  let subCategory_feedback = document.getElementsByClassName(
    "subCategory_feedback"
  )[0];
  if (!addForm.value.sub_category.id) {
    subCategory_feedback.classList.add("valid");
    subCategory_feedback.innerHTML = `<span>${t(
      `validate_msg.select_subcategory`
    )}</span>`;
    return false;
  } else {
    subCategory_feedback.classList.remove("valid");
    subCategory_feedback.innerHTML = "";
    return true;
  }
};

// validate brand
const brand_check = () => {
  let brand_feedback = document.getElementsByClassName("brand_feedback")[0];
  if (!addForm.value.brand.id) {
    brand_feedback.classList.add("valid");
    brand_feedback.innerHTML = `<span>${t(`validate_msg.select_brand`)}</span>`;
    return false;
  } else {
    brand_feedback.classList.remove("valid");
    brand_feedback.innerHTML = "";
    return true;
  }
};
// validate product type
const productType_check = () => {
  let product_type_feedback = document.getElementsByClassName(
    "product_type_feedback"
  )[0];
  if (!addForm.value.product_type.id) {
    product_type_feedback.classList.add("valid");
    product_type_feedback.innerHTML = `<span>${t(
      `validate_msg.select_product_type`
    )}</span>`;
    return false;
  } else {
    product_type_feedback.classList.remove("valid");
    product_type_feedback.innerHTML = "";
    return true;
  }
};
// validate product image
const productImage_check = () => {
  let product_image_feedback = document.getElementsByClassName(
    "product_image_feedback"
  )[0];
  if (!addForm.value.product_image) {
    product_image_feedback.classList.add("valid");
    product_image_feedback.innerHTML = `<span>${t(
      `validate_msg.select_product_image`
    )}</span>`;
    return false;
  } else {
    product_image_feedback.classList.remove("valid");
    product_image_feedback.innerHTML = "";
    return true;
  }
};
// validate color image
const colorImage_check = () => {
  return selectedColorsIds.value.every((id, index) => {
    let color_image_feedback = document.getElementsByClassName(
      `color_image${id}_feedback`
    )[0];
    const colorExist = selectedColors.value.findIndex(
      (color) => color.color_id === id
    );
    if (colorExist == -1) {
      color_image_feedback.classList.add("valid");
      color_image_feedback.innerHTML = `<span>${t(
        `validate_msg.select_color_image`
      )}</span>`;
      return false;
    } else {
      color_image_feedback.classList.remove("valid");
      color_image_feedback.innerHTML = "";
      return true;
    }
  });
};

// ===================================== filter

const handelAddProduct = async () => {
  const fd = new FormData(addProoduct.value);

  category_check();
  subCategory_check();
  brand_check();
  productType_check();
  productImage_check();
  colorImage_check();

  let valid = validate(addProoduct.value).valid;
  let valid_ruls = valid === "isValid";
  if (
    valid_ruls &&
    category_check() &&
    subCategory_check() &&
    brand_check() &&
    productType_check() &&
    productImage_check() &&
    colorImage_check()
  ) {
    loading.value = true;
    fd.append("name[ar]", addForm.value.name.name_ar);
    fd.append("name[en]", addForm.value.name.name_en);
    fd.append("description[ar]", addForm.value.description.description_ar);
    fd.append("description[en]", addForm.value.description.description_en);
    fd.append("category_id", addForm.value.category.id);
    fd.append("sub_category_id", addForm.value.sub_category.id);
    fd.append("brand_id", addForm.value.brand.id);
    fd.append("type", addForm.value.product_type.id);
    fd.append("size_id", JSON.stringify(selectedSizes.value));
    selectedColors.value.forEach(({ color_id, image }, index) => {
      fd.append(`colors[${index}][color_id]`, color_id);
      fd.append(`colors[${index}][image]`, image);
    });

    axios
      .post("store-product", fd)
      .then((res) => {
        let status = response(res).status;
        let msg = response(res).msg;
        if (status === "success") {
          notify_toast(msg, "success");
          loading.value = false;
          addProoduct.value.reset();
          addForm.value.category = "";
          addForm.value.sub_category = "";
          addForm.value.brand = "";
          addForm.value.product_type = "";
          addForm.value.features_rows = [];
          featureExist.value = false;
          document.querySelector(".file-browse-txt").textContent = "";
          success_modal.value = true;
        } else {
          notify_toast(msg, "error");
          loading.value = false;
        }
      })
      .catch((e) => {
        console.error(e);
      });
  } else {
    notify_toast(t(`validate_msg.uncomplete`), "error");
    loading.value = false;
  }
};

// ================================================================================ lifecycle hooks
onMounted(() => {
  get_categories();
  get_brands();
  get_colors();
  get_sizes();
});
</script>

<style lang="scss">
.p-checkbox {
  &.p-highlight {
    .p-checkbox-box {
      border-color: #505050;
      background: #505050;
    }
  }
}
</style>
