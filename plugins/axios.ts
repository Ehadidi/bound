import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "https://bondstreet.vip/api/";
  // const i18n_redirected = useCookie("i18n_redirected");
//   const auth = useCookie("auth");
//   const token = auth.value && auth.value.token ? auth.value.token : "";
  // const lang = i18n_redirected.value == "ar-EG" ? "ar" : "en";
  let api = axios.create({
    baseURL: defaultUrl,
    headers: {
    //   Authorization: `Bearer ${token}`,
      common: {
        // lang: lang,
        lang: 'en',
      },
    },
  });
  return {
    provide: {
      axios: api,
    },
  };
});
