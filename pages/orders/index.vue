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
            <OrdersCard
              v-for="i in 4"
              :key="i"
              :id="i"
              orderNum="#12345"
              time="12 minutes ago"
              :status="$t('orders.wait_approv')"
              type="waiting"
            />
          </TabPanel>
          <TabPanel>
            <OrdersCard
              v-for="i in 1"
              :key="i"
              :id="i"
              orderNum="#1234"
              time="12 minutes ago"
              :status="$t('orders.wait_payment')"
              type="payment"
            />
          </TabPanel>
          <TabPanel>
            <OrdersCard
              v-for="i in 3"
              :key="i"
              :id="i"
              orderNum="#1234"
              time="12 minutes ago"
              :status="$t('orders.active')"
              type="active"
            />
          </TabPanel>
          <TabPanel>
            <OrdersCard
              :id="i"
              orderNum="#1234"
              time="12 minutes ago"
              status="Successful"
              type="successful"
            />
            <OrdersCard
              :id="i"
              orderNum="#1234"
              time="12 minutes ago"
              status="Cancelled"
              type="cancelled"
            />
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>

<script setup>
// ================================================================================ imports
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
// ================================================================================ data

const ActiveTab = ref(0);
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
