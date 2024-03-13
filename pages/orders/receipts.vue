<template>
  <div class="bg-sectionBg py-5">
    <div class="container">
      <h1 class="title text-center mb-4 fs-3 fw-bold">
        {{ $t("orders.my_orders_Receipts") }}
      </h1>

      <div class="w-75 mx-auto orders">
        <div v-if="loading_data">
          <div class="mb-3 mx-1" v-for="i in 3" :key="i">
            <Skeleton height="9rem"></Skeleton>
          </div>
        </div>
        <OrdersCard
          v-else
          v-for="item in receipts_orders"
          :key="item.id"
          :orderNum="item.number"
          :id="item.id"
          :time="item.created_at"
          :status="item.order_status"
          type="receipts"
          :products="item.product"
        />
        <LayoutNoData v-if="!receipts_orders.length" />
      </div>
    </div>
  </div>
</template>

<script setup>
// ================================================================================ imports
import Skeleton from "primevue/skeleton";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";

// ================================================================================ data
const axios = useNuxtApp().$axios;
const receipts_orders = ref([]);
const loading_data = ref(true);

// ================================================================================ methods
//  ======================================== get receipts orders

const get_receipts_orders = async () => {
  const res = await axios.get("my-receipts");
  let status = response(res).status;
  let data = response(res).data;
  let msg = response(res).msg;

  if (status === "success") {
    loading_data.value = false;
    receipts_orders.value = data.order;
  } else {
    notify_toast(msg, "error");
    loading_data.value = false;
  }
};
// ================================================================================ onMounted
onMounted(() => {
  get_receipts_orders();
});
</script>

<style lang="scss" scoped></style>
