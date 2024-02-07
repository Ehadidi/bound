
import { createI18n } from 'vue-i18n'
import en from "~/locales/en.json";
import ar from "~/locales/ar.json";
import nuxtStorage from 'nuxt-storage';

export default createI18n({
    locale: nuxtStorage.localStorage.getData('lang') || "ar",
    messages: { en , ar }
})