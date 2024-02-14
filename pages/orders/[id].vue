<template>
  <div class="bg-sectionBg">
    <div class="container">
      <div class="py-5">
        <div
          class="d-flex align-items-center justify-content-between flex-wrap"
        >
          <div class="status-progress d-flex align-items-center flex-wrap">
            <div
              class="status-progress-item mb-3 d-flex align-items-center active"
            >
              <div
                class="status d-flex align-items-center justify-content-center"
              >
                <i class="fa-solid fa-circle-check"></i>
              </div>
              <span class="fw-bold">{{ $t("orders.wait_approv") }}</span>
            </div>
            <div class="status-progress-item mb-3 d-flex align-items-center">
              <div
                class="status d-flex align-items-center justify-content-center"
              ></div>
              <span class="fw-bold">{{ $t("orders.payment") }}</span>
            </div>
            <div class="status-progress-item mb-3 d-flex align-items-center">
              <div
                class="status d-flex align-items-center justify-content-center"
              ></div>
              <div>
                <span class="fw-bold">{{ $t("orders.active_order") }}</span>
                <!-- <span class="fw-bold d-block mt-1">{{ $t("orders.preparing") }}</span> -->
                <!-- <span class="fw-bold d-block mt-1">{{
                $t("orders.out_delivery")
              }}</span> -->
              </div>
            </div>
            <div class="status-progress-item mb-3 d-flex align-items-center">
              <div
                class="status d-flex align-items-center justify-content-center"
              ></div>
              <span class="fw-bold">{{ $t("orders.completed") }}</span>
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
                <div
                  class="d-flex align-items-center justify-content-between flex-wrap"
                >
                  <div class="mb-3">
                    <div class="product_bread">
                      {{ $t("orders.order_num") }}
                    </div>
                    <div class="fw-bold mt-1 fs-13px">#123456</div>
                  </div>
                  <div class="mb-3 mx-3">
                    <div class="product_bread">{{ $t("layout.date") }}</div>
                    <div class="fw-bold mt-1 fs-13px">11/11/2023</div>
                  </div>
                  <!-- <button
                    class="btn btn-outline-danger up fw-bold min-w-unset mb-3 h-40px"
                  >
                    {{ $t("orders.cancel_order") }}
                  </button> -->
                  <button
                    class="btn btn-outline-danger up fw-bold min-w-unset mb-3 h-40px"
                    @click="success_modal = true"
                  >
                    {{ $t("layout.report") }}
                    <img
                      src="~/assets/images/flag.svg"
                      alt="report"
                      class="mx-1"
                    />
                  </button>
                </div>

                <div class="mb-3">
                  <div class="product_bread">{{ $t("cart.location") }}</div>
                  <div class="fw-bold mt-1 fs-13px">
                    <img
                      src="~/assets/images/gps.svg"
                      class="mx-1"
                      alt="location"
                    />
                    Saudi Arabia, Riyadh, St. Name
                  </div>
                </div>
                <div class="mb-3">
                  <div class="product_bread">{{ $t("cart.other") }}</div>
                  <div class="fw-bold mt-1 fs-13px">
                    Lorem ipsum dolor sit met consectetur. vel dial frangula
                    nullar orcin incidents. Lorem ipsum dolor sit met
                    consectetur. vel dial frangula nullar orcin incidents.
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
                  <span>750 SAR</span>
                </div>

                <div class="cart_text mb-2">
                  <div class="d-flex align-items-center gap-2">
                    <span>{{ $t("cart.deposit") }}: </span>
                    <img
                      src="~/assets/images/info.png"
                      v-tooltip.bottom="
                        'will be Refunded after we retrieve the product'
                      "
                      alt=""
                      class="icon"
                    />
                  </div>
                  <span>250 SAR</span>
                </div>

                <div class="cart_text mb-2">
                  <span>{{ $t("cart.delivery") }}: </span>
                  <span>250 SAR</span>
                </div>

                <hr />

                <div class="cart_text total mb-3">
                  <span>{{ $t("cart.total") }}: </span>
                  <span>1000 SAR</span>
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
                  <div
                    class="cart_item"
                    v-for="item in productsItems"
                    :key="item.id"
                  >
                    <div class="left">
                      <img :src="item.image" alt="" class="cart_pro_img" />

                      <div class="product_info">
                        <h6 class="name">{{ item.name }}</h6>
                        <span class="info">{{ item.price }}</span>
                        <span class="info">{{ item.date }}</span>
                        <span class="info">{{ item.size }}</span>
                      </div>
                    </div>

                    <div class="right">
                      <div class="cart_text mb-2">
                        <span>{{ $t("cart.rentingCost") }}: </span>

                        <span>750 SAR</span>
                      </div>
                      <div class="cart_text">
                        <span>{{ $t("cart.deposit") }}: </span>

                        <div class="d-flex align-items-center gap-2">
                          <span>250 SAR</span>
                          <img
                            src="~/assets/images/info.png"
                            v-tooltip.bottom="$t('cart.depositInfo')"
                            alt=""
                            class="icon"
                          />
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
  </div>

  <!-- report Modal -->
  <Dialog
    class="site-modal none-header"
    v-model:visible="success_modal"
    modal
    :style="{ width: '30rem' }"
  >
    <div class="container">
      <div
        class="flex justify-content-center align-items-center flex-column pb-5 gap30"
      >
        <h5
          class="text-center fw-bold text-primary fw-bold fs-6 border-bottom w-100 py-3"
        >
          {{ $t("layout.send_report") }}
        </h5>
        <div class="text-center">
          {{ $t("layout.enter_reason") }}
        </div>
        <form class="w-100">
          <FormInput
            :textarea="true"
            :label2="$t('layout.reason')"
            :placeholder="$t('layout.enter_reason')"
            :model="form"
            name="reason"
            InputClass="height120"
            type="text"
          >
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
</template>

<script setup>
// ================================================================================ imports

// ================================================================================ data

const success_modal = ref(false);
const form = ref({
  reason: "",
});
// productsItems
const productsItems = ref([
  {
    id: 1,
    image:
      "https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png",
    name: "Product Name Goes Here",
    price: "250 / Day",
    date: "20 November 2023  To  23 November (3 Days)",
    size: "XL , Red",
  },
  {
    id: 1,
    image:
      "https://www.freepnglogos.com/uploads/women-bag-png/women-bag-png-transparent-images-download-clip-4.png",
    name: "Product Name Goes Here",
    price: "250 / Day",
    date: "20 November 2023  To  23 November (3 Days)",
    size: "XL , Red",
  },
  {
    id: 1,
    image:
      "https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png",
    name: "Product Name Goes Here",
    price: "250 / Day",
    date: "20 November 2023  To  23 November (3 Days)",
    size: "XL , Red",
  },
  {
    id: 1,
    image:
      "https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png",
    name: "Product Name Goes Here",
    price: "250 / Day",
    date: "20 November 2023  To  23 November (3 Days)",
    size: "XL , Red",
  },
  {
    id: 1,
    image:
      "https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png",
    name: "Product Name Goes Here",
    price: "250 / Day",
    date: "20 November 2023  To  23 November (3 Days)",
    size: "XL , Red",
  },
]);
// ================================================================================ methods

// ================================================================================ lifecycle hooks
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
