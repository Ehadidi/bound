import axios from "axios";
import Cookies from "js-cookie";
export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "https://bondstreet.vip/api/";
  const i18n_redirected = Cookies.get("i18n_redirected");
  let lang;
  if (nuxtApp) {
    // console.log("nuxtApp.payload.path", nuxtApp.payload.path);
    // console.log("bool", nuxtApp.payload.path.startsWith("/ar"));
    lang = nuxtApp.payload.path.startsWith("/ar") ? "ar" : "en";
  }

  // Get the JSON string from the "auth" cookie
  const authCookie = Cookies.get("auth");

  // Parse the JSON string into a JavaScript object if the cookie and its value exist
  const authData = authCookie ? JSON.parse(authCookie) : null;

  // Access the authUser property from the parsed object if it exists
  const authUser = authData ? authData.authUser : null;

  // Log the token if authUser exists and has the data property
  let token = "";
  if (authUser && authUser.data && authUser.data.token) {
    token = authUser.data.token;
    // console.log("authUser.data.token", authUser.data.token);
  }

  // console.log("lang", lang);
  let api = axios.create({
    baseURL: defaultUrl,
    headers: {
      Authorization: `Bearer ${token}`,
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
