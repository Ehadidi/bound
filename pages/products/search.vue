<template>
  <div class="bg-sectionBg">
    <div class="container">
      <div v-if="productsStore.products.data.length"  class="d-grid product-slide py-4">
        <div
          class="product-slide-item mb-4"
          v-for="product in productsStore.products.data"
          :key="product.id"
        >
          <CategoriesProductCard
            :productImg="product.image"
            :price="product.price"
            :productName="product.name"
            :rate="product.avg_rate"
            :id="product.id"
          />
        </div>
      </div>

      <LayoutNoData v-else />
    </div>
  </div>
</template>

<script setup>
// ========================================================================= imports
import { useProductsSearchStore } from "~/stores/productsSearch";
// ========================================================================= data
const productsStore = useProductsSearchStore();
// ========================================================================= lifecycle hooks

onMounted(() => {
  productsStore.getProducts();
});
</script>
