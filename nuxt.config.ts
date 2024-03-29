// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    head: {
      title: "Bound street",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content: "nuxt 3 app",
        },
        {
          charset: "utf-8",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;600&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montagu+Slab:opsz,wght@16..144,400;16..144,500&display=swap",
        },
      ],
    },
  },
  modules: ["@nuxtjs/i18n", "nuxt-swiper", "nuxt-primevue", "@vueuse/nuxt", "@pinia/nuxt" , '@pinia-plugin-persistedstate/nuxt'],
  css: [
    "bootstrap/dist/css/bootstrap.css",
    "/node_modules/primeflex/primeflex.css",
    "primevue/resources/themes/lara-light-indigo/theme.css",
    "assets/style/style.scss",
  ],
  plugins: [
    "@/plugins/vue-google-maps",
    "~/plugins/toast.js",
  ],
  i18n: {
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    locales: [
      {
        code: "en-US",
        iso: "en-US",
        name: "English",
        file: "en.json",
      },
      {
        code: "ar-EG",
        iso: "ar-EG",
        name: "arabic",
        file: "ar.json",
      },
    ],
    defaultLocale: "en",
  },
});