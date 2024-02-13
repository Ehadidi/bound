import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "https://bondstreet.vip/api/";
  // const authStore = useAuthStore();
  // const i18n_redirected = useCookie("i18n_redirected");
  // const auth = useCookie("auth");
  // const token = authStore.user && authStore.user.data.token ? authStore.user.data.token : "";
  const lang = "en";
  let api = axios.create({
    baseURL: defaultUrl,
    headers: {
      // Authorization: `Bearer ${token}`,
      common: {
        lang: lang,
      },
    },
  });
  return {
    provide: {
      axios: api,
    },
  };
});
