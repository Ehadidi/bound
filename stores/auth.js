import { defineStore } from "pinia";
import axios from "~/plugins/axios";
const $axios = axios().provide.axios;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
    token: "",
    logoutRes: null,
    isNavigatingToLogin: false,
    lang: useNuxtApp().$i18n.locale._value,
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
      $axios.defaults.headers.common["lang"] = this.lang;
      const response = await $axios.post("sign-up", form);
      this.authUser = response.data;
    },

    async handelVerification(form) {
      $axios.defaults.headers.common["lang"] = this.lang;
      const response = await $axios.post("activate?_method=patch", form);
      console.log("response", response);
      this.authUser = response.data;
      if (response.key == "success") {
        this.token = response.data.data.token;
      }
    },

    async handelLogin(form) {
      $axios.defaults.headers.common["lang"] = this.lang;
      const response = await $axios.post("sign-in?count_notifications=", form);
      this.authUser = response.data;
    },
    async logout(token) {
      $axios.defaults.headers.common["lang"] = this.lang;
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
