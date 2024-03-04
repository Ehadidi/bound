<template>
  <footer>
    <div class="container">
      <div class="grid mt-6">
        <div class="col-12 sm:col-6 md:col-5 lg:col-4">
          <div class="flex flex-column gap-3">
            <img class="logo" src="~/assets/images/logo.png" alt="logo" />
            <p class="fw-bold">
              {{ intro_text }}
            </p>
            <Divider type="solid" align="center" />
            <div class="flex align-items-center flex-wrap gap-4 mt-3">
              <a
                v-for="social in socials"
                :key="social.link"
                :href="social.link"
                target="_blank"
                ><img
                  class="width30 h-auto"
                  :src="social.icon"
                  :alt="social.link"
              /></a>
            </div>
          </div>
        </div>
        <div class="col-12 sm:col-6 md:col-3 lg:col-2">
          <div class="footer-list">
            <h5 class="text-secondary m-bottom-20 montagu">
              {{ $t("footer.quick_links") }}
            </h5>
            <ul>
              <li>
                <NuxtLink class="default-link" :to="localPath('/')">{{
                  $t("header.home")
                }}</NuxtLink>
              </li>
              <li>
                <NuxtLink class="default-link" :to="localPath('/about')">{{
                  $t("header.about")
                }}</NuxtLink>
              </li>
              <li v-if="authStore.user">
                <NuxtLink class="default-link" :to="localPath('/subscribtions')"
                  >{{ $t("header.subscription") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="default-link" :to="localPath('/contact')">{{
                  $t("header.contact_us")
                }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 sm:col-6 md:col-4 lg:col-3">
          <div class="footer-list">
            <h5 class="text-secondary m-bottom-20 montagu">
              {{ $t("footer.contact_us") }}
            </h5>
            <ul>
              <li>
                <span
                  ><img src="~/assets/images/location.svg" alt="location"
                /></span>
                <span class="fw-bold">{{ contact_us[0] }}</span>
              </li>
              <li>
                <span
                  ><img
                    src="~/assets/images/phoneIcon.svg"
                    alt="contact us phone"
                /></span>
                <a
                  :href="`tel:${contact_us[1]}`"
                  class="default-link fw-bold"
                  >{{ contact_us[1] }}</a
                >
              </li>
              <li>
                <span
                  ><img
                    src="~/assets/images/LetterIcon.svg"
                    alt="contact us mail"
                /></span>
                <a href="mailto:Sample.21@g.com" class="default-link fw-bold">{{
                  contact_us[2]
                }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 sm:col-6 md:col-4 lg:col-3">
          <div class="footer-list">
            <h5 class="text-secondary m-bottom-20 montagu">
              {{ $t("footer.Newsletter") }}
            </h5>
            <p class="fw-bold">Sign up for latest updates and offers.</p>
            <form @submit.prevent="newsLetter" ref="news">
              <FormInput
                :placeholder="$t('form_layout.enter_email')"
                InputClass="height40 border-0 bg-lightGrayClr"
                :model="form"
                name="email"
                type="email"
                parentClass="my-3"
                :icon="false"
                :addition="true"
              >
                <template #addition>
                  <button
                    :disabled="!form.email"
                    class="btn btn-primary w-fit min-w-min height40"
                    type="submit"
                  >
                    <img src="~/assets/images/Plain.svg" alt="send" />
                  </button>
                </template>
              </FormInput>
            </form>
            <Divider type="solid" align="center" />
            <div class="flex align-items-center gap-2 mt-3">
              <img
                class="width38 h-auto"
                src="~/assets/images/visa.svg"
                alt="visa"
              />
              <img
                class="width38 h-auto"
                src="~/assets/images/MasterCard.svg"
                alt="Master Card"
              />
              <img
                class="width38 h-auto"
                src="~/assets/images/applepay.svg"
                alt="apple pay"
              />
              <img
                class="width38 h-auto"
                src="~/assets/images/paypal.svg"
                alt="pay pal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>All right reserved 2023 ®</span>
    </div>
  </footer>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
const axios = useNuxtApp().$axios;
const localPath = useLocalePath();
const { notify_toast } = toast_handel();
const authStore = useAuthStore();

const news = ref();
const form = reactive({
  email: "",
});
const socials = ref([]);
const intro_text = ref("");
const contact_us = ref([]);

// ===================================== filter

const newsLetter = async () => {
  const fd = new FormData(news.value);
  axios
    .post("store-newsletter", fd)
    .then((res) => {
      let status = response(res).status;
      if (status === "success") {
        notify_toast(response(res).msg, "success");
      } else {
        notify_toast(response(res).msg, "error");
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

// ===================================== get socials
const getSocials = async () => {
  const res = await axios.get("socials");
  let status = response(res).status;
  let data = response(res).data;
  if (status === "success") {
    socials.value = data;
  }
};
// ===================================== get footer
const get_footer = async () => {
  const res = await axios.get("footer");
  let status = response(res).status;
  let data = response(res).data;
  if (status === "success") {
    contact_us.value = data.contact_us;
    intro_text.value = data.intro_text;
  }
};

onMounted(() => {
  getSocials();
  get_footer();
});
</script>

<style lang="scss" scoped></style>
