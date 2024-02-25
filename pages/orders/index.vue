<template>
  <div class="bg-sectionBg py-5">
    <div class="container">
      <h1 class="title text-center mb-4 fs-3 fw-bold">
        {{ $t("header.my_orders") }}
      </h1>

      <div class="w-75 mx-auto orders">
        <div class="tab-buttons mx-auto">
          <button
            class="btn tab-btn"
            :class="{ act: ActiveTab == 0 }"
            @click="ActiveTab = 0"
          >
            {{ $t("orders.wait_approv") }}
          </button>
          <button
            class="btn tab-btn"
            :class="{ act: ActiveTab == 1 }"
            @click="ActiveTab = 1"
          >
            {{ $t("orders.payment") }}
          </button>
          <button
            class="btn tab-btn"
            :class="{ act: ActiveTab == 2 }"
            @click="ActiveTab = 2"
          >
            {{ $t("orders.active_orders") }}
          </button>
          <button
            class="btn tab-btn"
            :class="{ act: ActiveTab == 3 }"
            @click="ActiveTab = 3"
          >
            {{ $t("orders.completed_orders") }}
          </button>
        </div>
        <TabView v-model:activeIndex="ActiveTab" lazy>
          <TabPanel>
            <div v-if="loading_data">
              <div class="mb-3 mx-1" v-for="i in 3" :key="i">
                <Skeleton height="9rem"></Skeleton>
              </div>
            </div>
            <OrdersCard
              v-else
              v-for="item in pending_orders"
              :key="item"
              :orderNum="item.order_num"
              :id="item.order_id"
              :time="item.order_date"
              :status="item.order_status"
              type="waiting"
              :products="item.products"
            />
            <LayoutNoData v-if="!pending_orders.length" />
          </TabPanel>
          <TabPanel>
            <div v-if="loading_data">
              <div class="mb-3 mx-1" v-for="i in 3" :key="i">
                <Skeleton height="9rem"></Skeleton>
              </div>
            </div>
            <OrdersCard
              v-else
              v-for="item in payment_orders"
              :key="item"
              :orderNum="item.order_num"
              :id="item.order_id"
              :time="item.order_date"
              :status="item.order_status"
              type="waiting"
              :products="item.products"
            />

            <LayoutNoData v-if="!payment_orders.length" />
          </TabPanel>
          <TabPanel>
            <div v-if="loading_data">
              <div class="mb-3 mx-1" v-for="i in 3" :key="i">
                <Skeleton height="9rem"></Skeleton>
              </div>
            </div>
            <OrdersCard
              v-else
              v-for="item in active_orders"
              :key="item"
              :orderNum="item.order_num"
              :id="item.order_id"
              :time="item.order_date"
              :status="item.order_status"
              type="waiting"
              :products="item.products"
            />
            <LayoutNoData v-if="!active_orders.length" />
          </TabPanel>
          <TabPanel>
            <div v-if="loading_data">
              <div class="mb-3 mx-1" v-for="i in 3" :key="i">
                <Skeleton height="9rem"></Skeleton>
              </div>
            </div>
            <OrdersCard
              v-else
              v-for="item in completed_orders"
              :key="item"
              :orderNum="item.order_num"
              :id="item.order_id"
              :time="item.order_date"
              :status="item.order_status"
              type="waiting"
              :products="item.products"
            />
            <LayoutNoData v-if="!completed_orders.length" />
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>

<script setup>
// ================================================================================ imports
import Skeleton from "primevue/skeleton";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { useAuthStore } from "~/stores/auth";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
// ================================================================================ data
const authStore = useAuthStore();
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
const ActiveTab = ref(0);
const pending_orders = ref([]);
const payment_orders = ref([]);
const active_orders = ref([]);
const completed_orders = ref([]);
const loading_data = ref(true);
// ================================================================================ methods
//  ======================================== get pending orders
const get_pending_orders = async () => {
  const config = {
    headers: { Authorization: `Bearer ${authStore.user.data.token}` },
  };
  const res = await axios.get("pending-orders", config);
  let status = response(res).status;
  let data = response(res).data;
  let msg = response(res).msg;

  if (status === "success") {
    loading_data.value = false;
    pending_orders.value = data.orders;
  } else {
    notify_toast(msg, "error");
    loading_data.value = false;
  }
};
//  ======================================== get payment orders
const get_payment_orders = async () => {
  const config = {
    headers: { Authorization: `Bearer ${authStore.user.data.token}` },
  };
  const res = await axios.get("payment-orders", config);
  let status = response(res).status;
  let data = response(res).data;
  let msg = response(res).msg;

  if (status === "success") {
    loading_data.value = false;
    payment_orders.value = data.orders;
  } else {
    notify_toast(msg, "error");
    loading_data.value = false;
  }
};
//  ======================================== get active orders
const get_active_orders = async () => {
  const config = {
    headers: { Authorization: `Bearer ${authStore.user.data.token}` },
  };
  const res = await axios.get("active-orders", config);
  let status = response(res).status;
  let data = response(res).data;
  let msg = response(res).msg;

  if (status === "success") {
    loading_data.value = false;
    active_orders.value = data.orders;
  } else {
    notify_toast(msg, "error");
    loading_data.value = false;
  }
};
//  ======================================== get completed orders
const get_completed_orders = async () => {
  const config = {
    headers: { Authorization: `Bearer ${authStore.user.data.token}` },
  };
  const res = await axios.get("completed-orders", config);
  let status = response(res).status;
  let data = response(res).data;
  let msg = response(res).msg;

  if (status === "success") {
    loading_data.value = false;
    completed_orders.value = data.orders;
  } else {
    notify_toast(msg, "error");
    loading_data.value = false;
  }
};
// ================================================================================ onMounted
onMounted(() => {
  get_pending_orders();
  get_payment_orders();
  get_active_orders();
  get_completed_orders();
});
</script>

<style lang="scss">
.circle-shape {
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}

.filter-arrow {
  filter: brightness(0);
  width: 20px;
}

.p-component {
  font-size: 15px;
}

.orders {
  .tab-buttons {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    border-bottom: 1px solid #ddd;

    .tab-btn {
      border-color: transparent !important;
      color: #aaaaaa;
      font-size: 14px;
      border-bottom: 3px solid transparent !important;

      &.act {
        color: #505050;
        border-bottom-color: #505050 !important;
        padding-bottom: 10px;
        margin-bottom: -1px;
        font-weight: bold;
      }
    }
  }

  .p-tabview {
    .p-tabview-nav-container {
      display: none;
    }

    .p-tabview-nav {
      background: transparent;
      margin-bottom: 10px;

      li {
        .p-tabview-nav-link {
          background: transparent;
        }

        &.p-highlight {
          .p-tabview-nav-link {
            background: transparent;
          }
        }
      }
    }

    .p-tabview-panels {
      background: transparent;
      padding: 0;
    }
  }
}
</style>
