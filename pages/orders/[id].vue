<template>
  <section class="bg-sectionBg">
    <ClientOnly>
      <div class="overlay-loader" :class="loading ? 'd-flex' : 'd-none'">
        <div class="spinner-border spinner-border-sm" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div class="container">
        <div class="py-5">
          <div class="d-flex align-items-center justify-content-between flex-wrap">
            <div class="status-progress d-flex align-items-center flex-wrap" v-if="order_status < 8">
              <div v-for="(item, index) in items" :key="index"
                class="status-progress-item mb-3 d-flex align-items-center"
                :class="{ active: isActiveState(item.states) }">
                <div class="status d-flex align-items-center justify-content-center">
                  <i class="fa-solid fa-circle-check" v-if="isActiveState(item.states)"></i>
                </div>
                <div v-if="item.content">
                  <span class="fw-bold">{{ item.content }}</span>

                  <span class="fw-bold d-block mt-1" v-if="status.state === 'preparing' && index == 2">{{
        $t("orders.preparing") }}</span>

                  <span class="fw-bold d-block mt-1" v-if="status.state === 'out_for_delivery' && index == 2">{{
        $t("orders.out_delivery") }}</span>

                  <span class="fw-bold d-block mt-1" v-if="status.state === 'delivered' && index == 2">{{
        $t("orders.delivered") }}</span>

                  <span class="fw-bold d-block mt-1" v-if="status.state === 'Retrieving' && index == 2">{{
        $t("orders.Retrieving") }}</span>
                </div>
              </div>
            </div>

            <button v-if="order_status == 2" @click="procees_pay" class="btn btn-primary arrow-effect mb-3">
              {{ $t("orders.procees_pay") }}
            </button>
            <button @click="recieved_order" v-if="order_status == 4" class="btn btn-primary arrow-effect mb-3">
              {{ $t("orders.received") }}
            </button>
            <NuxtLink :to="localPath(`/orders/rate/${route.params.id}`)" v-if="order_status == 7"
              class="btn btn-primary arrow-effect mb-3">
              {{ $t("orders.rate_products") }}
            </NuxtLink>
          </div>

          <div class="row">
            <div class="col-md-3 col-lg-5">
              <div class="mb-4">
                <h6 class="fs-14px mb-3">
                  {{ $t("cart.details") }}
                </h6>
                <div class="bg-white p-3 main_shadow">
                  <div class="d-flex align-items-center justify-content-between flex-wrap">
                    <div class="mb-3">
                      <div class="product_bread">
                        {{ $t("orders.order_num") }}
                      </div>
                      <div class="fw-bold mt-1 fs-13px">
                        {{ order_data.number }}
                      </div>
                    </div>
                    <div class="mb-3 mx-3">
                      <div class="product_bread">{{ $t("layout.date") }}</div>
                      <div class="fw-bold mt-1 fs-13px">
                        {{ order_data.date }}
                      </div>
                    </div>
                    <div v-if="order_status == 9" class="text-danger">
                      {{ $t("orders.this_order_canceled") }}
                    </div>
                    <button v-if="order_status < 3" @click="cancelModal = true"
                      class="btn btn-outline-danger up fw-bold min-w-unset mb-3 h-40px">
                      {{ $t("orders.cancel_order") }}
                    </button>
                    <button v-if="order_status < 6 && order_status > 2"
                      class="btn btn-outline-danger up fw-bold min-w-unset mb-3 h-40px" @click="report_modal = true">
                      {{ $t("layout.report") }}
                      <img src="~/assets/images/flag.svg" alt="report" class="mx-1" />
                    </button>
                  </div>

                  <div class="mb-3">
                    <div class="product_bread">{{ $t("cart.location") }}</div>
                    <div class="fw-bold mt-1 fs-13px">
                      <img src="~/assets/images/gps.svg" class="mx-1" alt="location" />
                      {{ order_data.location }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="product_bread">{{ $t("cart.other") }}</div>
                    <div class="fw-bold mt-1 fs-13px">
                      {{
        order_data.notes
          ? order_data.notes
          : $t("orders.no_notes")
      }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <h6 class="fs-14px mb-3">
                  {{ $t("cart.paymentDetails") }}
                </h6>
                <div class="bg-white p-3 main_shadow">
                  <div class="cart_text mb-2">
                    <span>{{ $t("cart.rentingCost") }}: </span>
                    <span>{{ payment_details.renting_cost }}
                      {{ $t("product.currency") }}</span>
                  </div>

                  <div class="cart_text mb-2">
                    <div class="d-flex align-items-center gap-2">
                      <span>{{ $t("cart.deposit") }}: </span>
                      <img src="~/assets/images/info.png" v-tooltip.bottom="refundable_text" alt="info" class="icon" />
                    </div>
                    <span>{{ payment_details.refundable_deposit }}
                      {{ $t("product.currency") }}</span>
                  </div>

                  <div class="cart_text mb-2">
                    <span>{{ $t("cart.delivery") }}: </span>
                    <span>{{ payment_details.delivery_price }}
                      {{ $t("product.currency") }}</span>
                  </div>

                  <hr />

                  <div class="cart_text total mb-3">
                    <span>{{ $t("cart.total") }}: </span>
                    <span>{{ payment_details.final_price }}
                      {{ $t("product.currency") }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-9 col-lg-7">
              <div class="mb-4">
                <h6 class="fs-14px mb-3">
                  {{ $t("layout.products") }}
                </h6>
                <div class="bg-white p-3 main_shadow">
                  <div class="scroll_y">
                    <div class="cart_item" v-for="item in productsItems" :key="item.id">
                      <div class="left">
                        <img :src="item.image" :alt="item.name" class="cart_pro_img" />

                        <div class="product_info">
                          <h6 class="name">{{ item.name }}</h6>
                          <span class="info">{{ item.price_per_day }}</span>
                          <span class="info">{{ item.date }}</span>
                          <div class="flex align-items-center gap5" v-if="item.size || item.color">
                            <span class="info">{{ item.size }}</span>,
                            <span class="info">{{ item.color }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="right">
                        <div class="cart_text mb-2">
                          <span>{{ $t("cart.rentingCost") }}: </span>

                          <span>{{ item.price }} {{ $t("product.currency") }}</span>
                        </div>
                        <div class="cart_text">
                          <span>{{ $t("cart.deposit") }}: </span>

                          <div class="d-flex align-items-center gap-2">
                            <span>{{ item.refundable_deposit }}</span>
                            <img src="~/assets/images/info.png" v-tooltip.bottom="refundable_text" alt="info"
                              class="icon" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- report Modal -->
      <Dialog class="site-modal none-header" v-model:visible="report_modal" modal :style="{ width: '30rem' }">
        <div class="container">
          <div class="flex justify-content-center align-items-center flex-column pb-5 gap30">
            <h5 class="text-center fw-bold text-primary fw-bold fs-6 border-bottom w-100 py-3">
              {{ $t("layout.send_report") }}
            </h5>
            <div class="text-center">
              {{ $t("layout.enter_reason") }}
            </div>
            <form class="w-100" @submit.prevent="report_order" ref="report_form">
              <FormInput :textarea="true" :label2="$t('layout.reason')" :placeholder="$t('layout.enter_reason')"
                :model="form" name="reason" InputClass="height120" type="text">
              </FormInput>

              <div class="d-flex justify-content-between gap-2 w-100 mt-4">
                <button type="button" class="btn sm transparent btn-primary flex-1"
                  @click.prevent="report_modal = false">
                  {{ $t("form_layout.back") }}
                </button>
                <button class="btn sm btn-primary flex-1">
                  {{ $t("layout.send") }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      <!-- cancel Modal -->
      <Dialog class="site-modal none-header" v-model:visible="cancelModal" modal :style="{ width: '30rem' }">
        <div class="container">
          <div class="flex justify-content-center align-items-center flex-column pb-5 gap30">
            <h5 class="text-center fw-bold text-primary fw-bold fs-6 border-bottom w-100 py-3">
              {{ $t("orders.cancel_order") }}
            </h5>
            <div class="text-center">
              {{ $t("orders.cancel_order_caption") }}
            </div>
            <div class="d-flex justify-content-between gap-2 w-100">
              <button :loading="loading" :disabled="loading === true" class="btn sm btn-primary flex-1 up"
                @click="cancel_order">
                <div class="d-flex align-items-center justify-content-center gap5">
                  <span>{{ $t("form_layout.confirm") }}</span>
                  <div class="spinner-border spinner-border-sm" :class="loading ? 'd-block' : 'd-none'" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </button>
              <button class="btn sm btn-danger flex-1 up" @click="cancelModal = false">
                {{ $t("product.cancel") }}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </ClientOnly>
  </section>
</template>

<script setup>
// ================================================================================ imports
import { useAuthStore } from "~/stores/auth";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
import { useI18n } from "vue-i18n";
// ================================================================================ data
const localPath = useLocalePath();
const authStore = useAuthStore();
const { t } = useI18n();
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
const route = useRoute();
const cancelModal = ref(false);
const order_data = ref({});
const payment_details = ref({});
const report_modal = ref(false);
const order_status = ref();
const report_form = ref();
const form = ref({
  reason: "",
});
// productsItems
const productsItems = ref([]);
const items = [
  {
    states: [
      "wait_approv",
      "payment",
      "preparing",
      "out_for_delivery",
      "delivered",
      "Retrieving",
      "completed",
    ],
    checkState: "wait_approv",
    content: t("orders.wait_approv"),
  },
  {
    states: [
      "payment",
      "preparing",
      "out_for_delivery",
      "delivered",
      "Retrieving",
      "completed",
    ],
    checkState: "payment",
    content: t("orders.payment"),
  },
  {
    states: [
      "preparing",
      "out_for_delivery",
      "delivered",
      "Retrieving",
      "completed",
    ],
    checkState: "active_order",
    content: t("orders.active_order"),
  },
  {
    states: ["completed"],
    checkState: "completed",
    content: t("orders.completed"),
  },
];
const loading = ref(false); // loading
const refundable_text = ref("");
// ================================================================================ methods
//  ============================================== get order details
const get_order_details = async () => {
  const res = await axios.get(`order-details/${route.params.id}`);
  let status = response(res).status;
  let data = response(res).data;
  let msg = response(res).msg;
  if (status === "success") {
    order_data.value = data.order;
    order_status.value = Number(data.order.status);
    payment_details.value = data.order.payment_details;
    productsItems.value = data.products;
  } else {
    notify_toast(msg, "error");
  }
};
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
//  ================================ order status computed
const status = computed(() => {
  const orderStatusValue = order_status.value;

  if (orderStatusValue === 1) {
    return {
      state: "wait_approv",
    };
  } else if (orderStatusValue === 2) {
    return {
      state: "payment",
    };
  } else if (orderStatusValue === 3) {
    return {
      state: "preparing",
    };
  } else if (orderStatusValue === 4) {
    return {
      state: "out_for_delivery",
    };
  } else if (orderStatusValue === 5) {
    return {
      state: "delivered",
    };
  } else if (orderStatusValue === 6) {
    return {
      state: "Retrieving",
    };
  } else if (orderStatusValue === 7) {
    return {
      state: "completed",
    };
  } else {
    return {
      state: "canceled",
    };
  }
});
const isActiveState = (states) => {
  return states.includes(status.value.state);
};

// ================================================== cancel order
const cancel_order = async () => {
  loading.value = true;
  const res = await axios.post(`cancel-order/${route.params.id}`);
  let status = response(res).status;
  let msg = response(res).msg;
  if (status === "success") {
    loading.value = false;
    notify_toast(msg, "success");
    get_order_details();
    cancelModal.value = false;
  } else {
    loading.value = false;
    notify_toast(msg, "error");
  }
};
// ================================================== report order
const report_order = async () => {
  loading.value = true;
  const fd = new FormData(report_form.value);
  fd.append("order_id", route.params.id);
  const res = await axios.post(`add-report`, fd);
  let status = response(res).status;
  let msg = response(res).msg;
  if (status === "success") {
    loading.value = false;
    notify_toast(msg, "success");
    report_modal.value = false;
    get_order_details();
  } else {
    loading.value = false;
    notify_toast(msg, "error");
  }
};

// ================================================== recieve order
const recieved_order = async () => {
  loading.value = true;
  const res = await axios.post(`recieved-order/${route.params.id}`);
  let status = response(res).status;
  let msg = response(res).msg;
  if (status === "success") {
    loading.value = false;
    notify_toast(msg, "success");
    get_order_details();
  } else {
    loading.value = false;
    notify_toast(msg, "error");
  }
};

const procees_pay = async () => {
  loading.value = true;
  const res = await axios.post(`payment-order/${route.params.id}`);
  let status = response(res).status;
  let msg = response(res).msg;
  if (status === "success") {
    loading.value = false;
    notify_toast(msg, "success");
    get_order_details();
  } else {
    loading.value = false;
    notify_toast(msg, "error");
  }
};
// ================================================================================ lifecycle hooks
onMounted(() => {
  get_order_details();
  get_refundable_text();
});
</script>

<style lang="scss">
.h-40px {
  height: 40px;
}

.status-progress {
  .status-progress-item {
    margin-inline-end: 45px;
    opacity: 0.5;
    font-size: 12px;

    .status {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 4px solid #505050;
      margin-inline-end: 8px;
      color: #505050;
    }

    &.active {
      opacity: 1;
      font-size: 14px;

      .status {
        width: 30px;
        height: 30px;
        font-size: 17px;
        padding-top: 0.4px;
      }
    }
  }
}
</style>
