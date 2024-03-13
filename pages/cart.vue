<template>
  <div class="bg-sectionBg">
    <div class="py-6">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-7">
            <h6 class="mb-3 fs-6">{{ $t("cart.items") }}</h6>

            <div class="bg-white py-4 px-3 main_shadow">
              <LayoutNoData v-if="!cartItems.length" :msg="$t('cart.no_items')" />

              <div class="scroll_y">
                <div class="cart_item" v-for="item in cartItems" :key="item.id">
                  <div class="left">
                    <button type="button" class="btn_remove" @click="remove_from_cart(item.id, $event)">
                      <img src="~/assets/images/Trash.png" alt="cart" class="ic" />
                    </button>
                    <img :src="item.product_image" :alt="item.product_name" class="cart_pro_img" />

                    <div class="product_info">
                      <h6 class="name">{{ item.product_name }}</h6>
                      <span class="info">{{ item.price_per_day }} /
                        {{ $t("product.unit") }}</span>
                      <div class="info">
                        <span>{{ item.date }}</span>
                        <span>({{ item.duration }}{{ $t("product.unit") }})</span>
                        <button class="btn p-0 border-0 min-w-min h-fit bg-transparent" @click="update_modal(item.id)">
                          <span class="pi pi-pencil font13"></span>
                        </button>
                      </div>
                      <span class="info">{{ item.size }} {{ item.color }}</span>
                    </div>
                  </div>

                  <div class="right">
                    <div class="cart_text mb-2">
                      <span>{{ $t("cart.rentingCost") }}: </span>

                      <div class="flex align-items-center gap-1">
                        <span>{{ item.renting_cost }}</span>
                        <span>{{ $t("product.currency") }}</span>
                      </div>
                    </div>
                    <div class="cart_text">
                      <span>{{ $t("cart.deposit") }}: </span>

                      <div class="d-flex align-items-center gap-2">
                        <div class="flex align-items-center gap-1">
                          <span>{{ item.refundable_value }}</span>
                          <span>{{ $t("product.currency") }}</span>
                        </div>
                        <img src="~/assets/images/info.png" v-tooltip.bottom="refundable_text" alt="info"
                          class="icon" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form class="col-xl-4 col-lg-5">
            <h6 class="mb-3 fs-6">{{ $t("cart.details") }}</h6>

            <div class="bg-white py-4 px-3 main_shadow mb-4">
              <div class="mb-3">
                <label class="d-block mb-2 font13 text-label">{{
              $t("cart.paymentMethod")
            }}</label>

                <div class="payment-items">
                  <label :for="`payment${i}`" class="payment-item" v-for="(pay, i) in paymentItems" :key="pay.id">
                    <input type="radio" name="pay_type" :value="pay.id" v-model="payment" :id="`payment${i}`"
                      class="payment-input" />
                    <div class="payment-label">
                      <img :src="pay.icon" alt="pay method icon" class="ic" />
                      <div class="name">{{ pay.name }}</div>

                      <i class="fa-solid fa-circle-check circle"></i>
                    </div>
                  </label>
                </div>
              </div>

              <FormInput :label2="$t('cart.location')" :placeholder="$t('cart.location')" :model="form" readonly
                name="location" type="text" parentClass="my-3" :icon="true" :addition="true">
                <template #icon>
                  <img class="width20" src="~/assets/images/GPS.svg" alt="location" />
                </template>
                <template #addition>
                  <button class="btn border-0 min-w-min h-100 bg-transparent underline" type="button"
                    @click="address_modal = true">
                    <span class="fw-bold text-primary font15">{{
              $t("cart.change")
            }}</span>
                  </button>
                </template>
              </FormInput>

              <FormInput :textarea="true" :label2="$t('cart.other')" :placeholder="$t('cart.other')" :model="form"
                name="detailes" InputClass="height120" type="text">
              </FormInput>
            </div>

            <h6 class="mb-3 fs-6">{{ $t("cart.paymentDetails") }}</h6>

            <div class="bg-white p-4 main_shadow">
              <div class="cart_text mb-2">
                <span>{{ $t("cart.rentingCost") }}: </span>
                <span>{{ cartSummary.total_products }}
                  {{ $t("product.currency") }}</span>
              </div>

              <div class="cart_text mb-2">
                <div class="d-flex align-items-center gap-2">
                  <span>{{ $t("cart.deposit") }}: </span>
                  <img src="~/assets/images/info.png" v-tooltip.bottom="refundable_text" alt="info" class="icon" />
                </div>
                <span>{{ cartSummary.total_refundable_value }}
                  {{ $t("product.currency") }}</span>
              </div>

              <div class="cart_text mb-2">
                <span>{{ $t("cart.delivery") }}: </span>
                <span>{{ cartSummary.delivery_price }}
                  {{ $t("product.currency") }}</span>
              </div>

              <hr />

              <div class="cart_text total mb-3">
                <span>{{ $t("cart.total") }}: </span>
                <span>{{ cartSummary.final_price }}
                  {{ $t("product.currency") }}</span>
              </div>

              <button type="button" class="btn btn-primary arrow-effect ms-auto" @click="confirm_order">
                {{ $t("cart.sendOrder") }}
                <!-- <img src="~/assets/images/ArrowRight.svg" class="ic" alt="arrow"> -->
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- change address modal -->
    <Dialog class="site-modal none-header" v-model:visible="address_modal" modal :style="{ width: '767px' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div class="container" v-if="address_modal">
        <!-- @change="update_location" @modal_changed="update_location" -->
        <LayoutAddresses />
        <div class="flex align-items-center justify-content-center my-4 gap20">
          <button class="btn btn-primary up" @click="update_location">
            {{ $t("cart.save_changes") }}
          </button>
          <button class="btn btn-outline-primary up" @click="address_modal = false">
            {{ $t("cart.cancel") }}
          </button>
        </div>
      </div>
      <div class="container" v-else></div>
    </Dialog>
    <!-- edit duration modal -->
    <Dialog class="site-modal none-header" v-model:visible="edit_modal" modal :style="{ width: '30rem' }">
      <div class="container">
        <div class="rent_date">
          <div class="my-2">
            <label class="fw-bold txt_start font12 d-block mb-2">{{
              $t("product.startDate")
            }}</label>
            <div class="form-inputs height50">
              <Calendar dateFormat="yy-m-d" ref="calender" :minDate="today" v-model="start_date" showIcon
                icon="pi pi-calendar" :placeholder="$t('product.selectDate')" name="time" />
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
              <button @click="update_cart()" style="min-width: 135px" class="btn btn-primary fw-bold up">
                {{ $t("product.save") }}
              </button>
              <button style="min-width: 135px" type="button" class="btn fw-bold ms-2" @click="start_date = null">
                {{ $t("product.cancel") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
    <!-- Success Modal -->
    <Dialog class="site-modal none-header" v-model:visible="success_modal" modal :style="{ width: '20rem' }">
      <div class="container">
        <div class="flex justify-content-center align-items-center flex-column py-5 gap30">
          <img src="~/assets/images/success.svg" class="w-25 h-auto" alt="success message" />
          <h5 class="text-center fw-bold text-primary fw-bold fs-6">
            {{ $t("cart.done.text") }}
          </h5>

          <div class="d-flex gap-2">
            <NuxtLink :to="localPath('/')" class="btn sm transparent btn-primary">
              {{ $t("cart.done.home") }}
            </NuxtLink>
            <NuxtLink :to="localPath('/orders')" class="btn sm btn-primary">
              {{ $t("cart.done.myOrders") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
// ================================================================================ imports
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
import { useAuthStore } from "~/stores/auth";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";

// ================================================================================ data
const localPath = useLocalePath();
const today = new Date();
const route = useRouter();
// pay Icons
import pay1 from "~/assets/images/payment.png";
import pay2 from "~/assets/images/wallet.png";
const address_modal = ref(false);
// success_modal
const success_modal = ref(false);

// form
const form = reactive({
  location: "",
  detailes: "",
});

// PayMent
const payment = ref(1);
const paymentItems = ref([
  {
    id: 1,
    icon: pay2,
    name: t("cart.payment.wallet"),
  },
  {
    id: 2,
    icon: pay1,
    name: t("cart.payment.online"),
  },
]);

// cartItems
const cartItems = ref([]);
const cartSummary = ref({});
const edit_modal = ref(false);
const authStore = useAuthStore();
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
const durations = ref([]);
const start_date = ref();
const selectedDuration = ref();
const editable_id = ref();
const refundable_text = ref("");
// ================================================================================ methods
//  ============================================== get refundable text
const get_refundable_text = async () => {
  const res = await axios.get(`refundable_deposit_text`);
  let status = response(res).status;
  let data = response(res).data;
  let msg = response(res).msg;
  if (status === "success") {
    refundable_text.value = data;
  } else {
    notify_toast(msg, "error");
  }
};
// ========================================== formating Date
const formatingDate = computed(() => {
  var d = new Date(start_date.value),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
});
//  =========================================== handell update modal
const update_modal = (id) => {
  edit_modal.value = true;
  editable_id.value = id;
};
//  =========================================== get durations
const get_durations = async () => {
  const res = await axios.get("durations");
  let status = response(res).status;
  let data = response(res).data;
  if (status === "success") {
    durations.value = data;
  } else {
    notify_toast(data, "error");
  }
};
//  =========================================== get cart items
const get_cart_items = async () => {
  const res = await axios.get("get-cart-items");
  let status = response(res).status;
  let data = response(res).data;
  if (status === "success") {
    cartItems.value = data.cart;
    form.location = data.location;
  } else {
    notify_toast(data, "error");
  }
};
//  ===================================== update duration
const update_cart = async () => {
  const fd = new FormData();
  fd.append("start_date", formatingDate.value);
  fd.append("duration_id", selectedDuration.value);
  const res = await axios.post(`update-cart-item/${editable_id.value}`, fd);
  let status = response(res).status;
  let msg = response(res).msg;
  if (status === "success") {
    notify_toast(msg, "success");
    get_cart_items();
    start_date.value = null;
    setTimeout(() => {
      edit_modal.value = false;
    }, 300);
  } else {
    notify_toast(msg, "error");
  }
};
// ============================================ get cart summary
const get_cart_summary = async () => {
  const res = await axios.get("get-cart-summary");
  let status = response(res).status;
  let data = response(res).data;
  if (status === "success") {
    cartSummary.value = data;
  } else {
    notify_toast(data, "error");
  }
};
//  ===================================== remove item from cart
const remove_from_cart = async (id) => {
  const res = await axios.delete(`delete-cart-item/${id}`);
  let status = response(res).status;
  let msg = response(res).msg;
  if (status === "success") {
    notify_toast(msg, "success");
    setTimeout(() => {
      get_cart_items();
      get_cart_summary();
    }, 1000);
  } else {
    notify_toast(msg, "error");
  }
};
// ====================================== handel confirm order
const confirm_order = async () => {
  const fd = new FormData();
  fd.append("notes", form.detailes);
  fd.append("pay_type", payment.value);
  const res = await axios.post("confirm-order", fd);
  let status = response(res).status;
  let msg = response(res).msg;
  // let data = response(res).data
  if (status === "success") {
    notify_toast(msg, "success");
    get_cart_items();
    get_cart_summary();
    success_modal.value = true;
    // setTimeout(() => {
    //     route.push(localPath({ path: `/orders/${data.id}` }));
    // })
  } else {
    notify_toast(msg, "error");
  }
};
//  ===================================== update location
const update_location = () => {
  form.location = "";
  setTimeout(() => {
    get_cart_items();
    address_modal.value = false;
  }, 300);
};
// ================================================================================ lifecycle hooks
onMounted(() => {
  get_cart_items();
  get_durations();
  get_cart_summary();
  get_refundable_text();
});
</script>

<style scoped></style>
