<script setup>
// const route = useRoute()
// const switchLocalePath = useSwitchLocalePath()
// const switch_dir = (lang) => {
//   let html = document.getElementsByTagName("html")[0];
//   html.setAttribute("lang", lang);
// }
// const set_dir = () => {
//   if (route.path.includes('ar-EG')) {
//     let html = document.getElementsByTagName("html")[0];
//     html.setAttribute("lang", 'ar');
//   } else {
//     let html = document.getElementsByTagName("html")[0];
//     html.setAttribute("lang", 'en');
//   }
// }
// onMounted(() => {
//   set_dir()
// })

import nuxtStorage from "nuxt-storage";
// set html dir
const route = useRoute();
const checkLang = () => {
  const lang = route.path.startsWith("/en-US") ? "en" : "ar";
  let html = document.getElementsByTagName("html")[0];
  html.setAttribute("lang", lang);
};
const switch_dir = (lang) => {
  nuxtStorage.localStorage.setData("lang", lang, 123456789, "d");
  checkLang();
  setTimeout(() => {
    window.location.reload();
  }, 500);
};
onMounted(() => {
  checkLang();
});
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});


</script>

<template>
  <div class="">
    <!-- <NuxtLink v-if="route.path.includes('ar-EG')" @click="switch_dir('en')" :to="switchLocalePath('en-US')">
      <div class="d-flex items-center gap-1">
        <span class="pi pi-globe"></span>
        <span>Eng</span>
      </div>
    </NuxtLink>
    <NuxtLink v-else @click="switch_dir('ar')" :to="switchLocalePath('ar-EG')">
      <div class="d-flex items-center gap-1">
        <span class="pi pi-globe"></span>
        <span class="ar-font">عربي</span>
      </div>
    </NuxtLink> -->
    <NuxtLink v-for="locale in availableLocales" :key="locale.code"
      @click="switch_dir(locale.code == 'ar-EG' ? 'ar' : 'en')" :to="switchLocalePath(locale.code)">{{ locale.name }} <i
        class="fa-solid fa-globe mx-2"></i></NuxtLink>


  </div>
</template>