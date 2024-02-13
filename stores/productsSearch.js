import { defineStore } from "pinia";
import axios from "~/plugins/axios";
const $axios = axios().provide.axios;

export const useProductsSearchStore = defineStore("products", {
  state: () => ({
    products: [],
    keyword: "",
    isLoading: false,
  }),
  getters: {},
  actions: {
    async getProducts() {
      this.isLoading = true;
      const response = await $axios.post("search", { search: this.keyword });
      this.products = response.data;
      this.isLoading = false;
    },
  },
  persist: {
    storage: persistedState.cookiesWithOptions(),
  },
});
