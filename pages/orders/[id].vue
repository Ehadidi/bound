<template>
  <section class="bg-sectionBg">
    <div class="container">
      <div class="py-5">
        <div class="d-flex align-items-center justify-content-between flex-wrap">
          <div class="status-progress d-flex align-items-center flex-wrap">
            <div v-for="(item, index) in items" :key="index" class="status-progress-item mb-3 d-flex align-items-center"
              :class="{ active: isActiveState(item.states) }">
              <div class="status d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-circle-check" v-if="isActiveState(item.states)"></i>
              </div>
              <div v-if="item.content">
                <span class="fw-bold">{{ item.content }}</span>
                <span class="fw-bold d-block mt-1" v-if="status.state === 'preparing' && index == 2">{{ $t("orders.preparing") }}</span>
                <span class="fw-bold d-block mt-1" v-if="status.state === 'delivered' && index == 2">{{ $t("orders.out_delivery")
                }}</span>
              </div>
            </div>
          </div>

          <button class="btn btn-primary arrow-effect mb-3">
            {{ $t("orders.procees_pay") }}
          </button>
          <!-- <button class="btn btn-primary arrow-effect mb-3">
          {{ $t("orders.received") }}
        </button> -->
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
                    <div class="fw-bold mt-1 fs-13px">{{ order_data.number }}</div>
                  </div>
                  <div class="mb-3 mx-3">
                    <div class="product_bread">{{ $t("layout.date") }}</div>
                    <div class="fw-bold mt-1 fs-13px">{{ order_data.date }}</div>
                  </div>
                  <!-- <button
                    class="btn btn-outline-danger up fw-bold min-w-unset mb-3 h-40px"
                  >
                    {{ $t("orders.cancel_order") }}
                  </button> -->
                  <button class="btn btn-outline-danger up fw-bold min-w-unset mb-3 h-40px" @click="success_modal = true">
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
                    {{ order_data.notes }}
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
                  <span>{{ payment_details.renting_cost }}</span>
                </div>

                <div class="cart_text mb-2">
                  <div class="d-flex align-items-center gap-2">
                    <span>{{ $t("cart.deposit") }}: </span>
                    <img src="~/assets/images/info.png" v-tooltip.bottom="'will be Refunded after we retrieve the product'
                      " alt="" class="icon" />
                  </div>
                  <span>{{ payment_details.refundable_deposit }}</span>
                </div>

                <div class="cart_text mb-2">
                  <span>{{ $t("cart.delivery") }}: </span>
                  <span>{{ payment_details.delivery_price }}</span>
                </div>

                <hr />

                <div class="cart_text total mb-3">
                  <span>{{ $t("cart.total") }}: </span>
                  <span>{{ payment_details.final_price }}</span>
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
                      <img :src="item.image" alt="" class="cart_pro_img" />

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

                        <span>{{ item.price }}</span>
                      </div>
                      <div class="cart_text">
                        <span>{{ $t("cart.deposit") }}: </span>

                        <div class="d-flex align-items-center gap-2">
                          <span>{{ item.refundable_deposit }}</span>
                          <img src="~/assets/images/info.png" v-tooltip.bottom="$t('cart.depositInfo')" alt=""
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
    <Dialog class="site-modal none-header" v-model:visible="success_modal" modal :style="{ width: '30rem' }">
      <div class="container">
        <div class="flex justify-content-center align-items-center flex-column pb-5 gap30">
          <h5 class="text-center fw-bold text-primary fw-bold fs-6 border-bottom w-100 py-3">
            {{ $t("layout.send_report") }}
          </h5>
          <div class="text-center">
            {{ $t("layout.enter_reason") }}
          </div>
          <form class="w-100">
            <FormInput :textarea="true" :label2="$t('layout.reason')" :placeholder="$t('layout.enter_reason')"
              :model="form" name="reason" InputClass="height120" type="text">
            </FormInput>

            <div class="d-flex justify-content-between gap-2 w-100 mt-4">
              <button type="button" class="btn sm transparent btn-primary flex-1" @click.prevent="success_modal = false">
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
  </section>
</template>

<script setup>
// ================================================================================ imports
import { useAuthStore } from "~/stores/auth";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
import { useI18n } from "vue-i18n";
// ================================================================================ data
const authStore = useAuthStore();
const { t } = useI18n();
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
const route = useRoute();
const order_data = ref({});
const payment_details = ref({});
const success_modal = ref(false);
const order_status = ref();
const form = ref({
  reason: "",
});
// productsItems
const productsItems = ref([]);
// ================================================================================ methods
//  ============================================== get order details
const get_order_details = async () => {
  const config = {
    headers: { Authorization: `Bearer ${authStore.user.data.token}` }
  }
  const res = await axios.get(`order-details/${route.params.id}`, config);
  let status = response(res).status;
  let data = response(res).data;
  let msg = response(res).msg;
  if (status === "success") {
    order_data.value = data.order;
    order_status.value = Number(data.order.status)
    payment_details.value = data.order.payment_details;
    productsItems.value = data.products
  } else {
    notify_toast(msg, "error");
  }
}


const items = [
  { states: ['wait_approv', 'payment', 'active_order' ,'preparing', 'delivered' , 'completed'], checkState: 'wait_approv', content: t("orders.wait_approv") },
  { states: ['payment', 'active_order' ,'preparing', 'delivered' , 'completed'], checkState: 'payment', content: t("orders.payment") },
  { states: ['active_order' ,'preparing', 'delivered' , 'completed'], checkState: 'active_order', content: t("orders.active_order") },
  { states: ['completed'], checkState: 'completed', content: t("orders.completed") }
];

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
      state: "active_order",
    };
  } else if (orderStatusValue === 4) {
    return {
      state: "preparing",
    };
  } else if (orderStatusValue === 5) {
    return {
      state: "delivered",
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
// ================================================================================ lifecycle hooks
onMounted(() => {
  get_order_details()
})
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
