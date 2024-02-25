import { defineStore } from "pinia";
import axios from "~/plugins/axios";
const $axios = axios().provide.axios;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
    token: "",
    logoutRes: null,
    isNavigatingToLogin: false,
  }),
  getters: {
    user: (state) => state.authUser,
    logedout: (state) => state.logoutRes,
  },
  actions: {
    setIsNavigatingToLogin(value) {
      this.isNavigatingToLogin = value;
    },
    async handelSignUp(form) {
      const response = await $axios.post("sign-up", form);
      this.authUser = response.data;
    },

    async handelVerification(form) {
      const response = await $axios.post("activate?_method=patch", form);
      this.authUser = response.data;
      this.token = response.data.data.token;
    },

    async handelLogin(form) {
      const response = await $axios.post("sign-in?count_notifications=", form);
      this.authUser = response.data;
    },
    async logout(token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await $axios.delete("sign-out?device_id=1", config);
      this.logoutRes = response;
      if (response.status == 200) {
        this.authUser = null;
        this.token = "";
        // this.router.push({ name: "home" });
      }
    },
  },
  persist: {
    storage: persistedState.cookiesWithOptions(),
  },
});
