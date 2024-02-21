<template>
  <header class="bg-white px-3">
    <div class="top-head">
      <div class="container">
        <div class="d-flex align-items-center justify-content-between">
          <div v-if="!IsAuth" class="d-flex items-start gap-2">
            <span class="pi pi-user"></span>
            <button
              @click="auth_modal = true"
              class="btn p-0 w-fit min-w-min h-fit"
            >
              {{ $t("header.auth") }}
            </button>
          </div>
          <div
            v-if="IsAuth"
            class="d-flex align-items-center flex-wrap side-btns"
          >
            <div class="dropdown" ref="target">
              <button
                class="btn p-0 dropdownToggle min-w-min h-fit"
                @click="dropShown = !dropShown"
                type="button"
              >
                <div class="d-flex align-items-center">
                  <img src="~/assets/images/user.svg" alt="user profile" />
                  <span v-if="user_auth.name" class="mx-2 fw-bold">{{
                    user_auth.name
                  }}</span>
                  <i class="fa-solid fa-chevron-down text-dark fs-10px"></i>
                </div>
              </button>
              <Transition name="dropShow">
                <ul v-if="dropShown" class="dropdown-menu">
                  <li>
                    <NuxtLink
                      class="dropdown-item defualt-link"
                      @click="dropShown = !dropShown"
                      :to="localPath('/settings')"
                    >
                      <div class="d-flex align-items-center">
                        <img
                          class="user-icon me-2"
                          src="~/assets/images/settings.svg"
                          alt="settings"
                        />
                        <span class="user-txt">{{
                          $t("layout.settings")
                        }}</span>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item defualt-link"
                      @click="dropShown = !dropShown"
                      :to="localPath('/wallet')"
                    >
                      <div class="d-flex align-items-center">
                        <img
                          class="user-icon me-2"
                          src="~/assets/images/wallet.svg"
                          alt="wallet"
                        />
                        <span class="user-txt">{{ $t("layout.wallet") }}</span>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item defualt-link"
                      @click="dropShown = !dropShown"
                      :to="localPath('/addresses')"
                    >
                      <div class="d-flex align-items-center">
                        <img
                          class="user-icon me-2"
                          src="~/assets/images/GPS.svg"
                          alt="GPS"
                        />
                        <span class="user-txt">{{
                          $t("layout.my_addresses")
                        }}</span>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item defualt-link"
                      @click="dropShown = !dropShown"
                      :to="localPath('/')"
                    >
                      <div class="d-flex align-items-center">
                        <img
                          class="user-icon me-2"
                          src="~/assets/images/Phone.svg"
                          alt="Phone"
                        />
                        <span class="user-txt">{{
                          $t("header.contact_us")
                        }}</span>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item defualt-link"
                      @click="dropShown = !dropShown"
                      :to="localPath('/suggestions')"
                    >
                      <div class="d-flex align-items-center">
                        <img
                          class="user-icon me-2"
                          src="~/assets/images/Shield.svg"
                          alt="Shield"
                        />
                        <span class="user-txt">{{
                          $t("layout.suggestions")
                        }}</span>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item defualt-link"
                      @click="dropShown = !dropShown"
                      :to="localPath('/')"
                    >
                      <div class="d-flex align-items-center">
                        <img
                          class="user-icon me-2"
                          src="~/assets/images/settings.svg"
                          alt="profile"
                        />
                        <span class="user-txt">{{
                          $t("layout.settings")
                        }}</span>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item defualt-link"
                      @click="dropShown = !dropShown"
                      :to="localPath('/')"
                    >
                      <div class="d-flex align-items-center">
                        <img
                          class="user-icon me-2"
                          src="~/assets/images/document.svg"
                          alt="Receipts"
                        />
                        <span class="user-txt">{{
                          $t("layout.receipts")
                        }}</span>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item defualt-link"
                      @click="dropShown = !dropShown"
                      :to="localPath('/products/add')"
                    >
                      <div class="d-flex align-items-center">
                        <img
                          class="user-icon me-2"
                          src="~/assets/images/box.svg"
                          alt="product box"
                        />
                        <span class="user-txt">{{
                          $t("layout.AddMyProduct")
                        }}</span>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item defualt-link"
                      @click="
                        dropShown = !dropShown;
                        terms_conditions = true;
                      "
                    >
                      <div class="d-flex align-items-center">
                        <img
                          class="user-icon me-2"
                          src="~/assets/images/pen.svg"
                          alt="terms and conditions"
                        />
                        <span class="user-txt">{{ $t("layout.terms") }}</span>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <button class="dropdown-item defualt-link" @click="logout">
                      <div class="d-flex align-items-center gap18">
                        <img
                          class="user-icon me-2"
                          src="~/assets/images/logout.svg"
                          alt="logout"
                        />
                        <span class="user-txt text-danger">{{
                          $t("layout.logout")
                        }}</span>
                      </div>
                    </button>
                  </li>
                </ul>
              </Transition>
            </div>
          </div>
          <LayoutLangSwitcher />
        </div>
      </div>
    </div>
    <div class="main-head">
      <div class="container">
        <div class="d-flex align-items-center justify-content-between">
          <div class="main-logo">
            <NuxtLink :to="localPath('/')">
              <img class="logo" src="~/assets/images/logo.png" alt="logo" />
            </NuxtLink>
          </div>
          <div class="overlay" @click="toggleSideMenu"></div>
          <div class="navbar">
            <ul>
              <li>
                <NuxtLink
                  class="nav_link"
                  @click="closeSideMenu"
                  :to="localPath('/')"
                  >{{ $t("header.home") }}</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  class="nav_link"
                  @click="closeSideMenu"
                  :to="localPath('/about')"
                >
                  {{ $t("header.about") }}</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  class="nav_link"
                  @click="closeSideMenu"
                  :to="localPath('/subscribtions')"
                >
                  {{ $t("header.subscription") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  class="nav_link"
                  @click="closeSideMenu"
                  :to="localPath('/orders')"
                  >{{ $t("header.my_orders") }}</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  class="nav_link"
                  @click="closeSideMenu"
                  :to="localPath('/contact')"
                  >{{ $t("header.contact_us") }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="user_list">
            <ul>
              <li class="dropdown" ref="noti_target">
                <NuxtLink
                  class="cursor-pointer position-relative"
                  @click="get_all_noti()"
                >
                  <span v-if="noti_count" class="count">
                    {{ noti_count }}
                  </span>
                  <img src="~/assets/images/BellBing.svg" alt="notification" />
                </NuxtLink>

                <Transition name="dropShow">
                  <ul
                    v-if="noti_dropShown"
                    class="dropdown-menu flex-column fs-13px p-2 noti-dropdown"
                  >
                    <li v-for="noti in notifications" :key="noti.id">
                      <div class="d-flex">
                        <div class="flex-shrink-0">
                          <img
                            src="~/assets/images/noti.svg"
                            alt="notifications"
                            width="30"
                          />
                        </div>
                        <div
                          class="flex-grow-1 justify-content-between mx-2 d-flex align-items-baseline"
                        >
                          <div class="d-flex flex-column">
                            {{ noti.body }}
                            <span class="text-gray-500 fs-10px">
                              {{ noti.created_at }}
                            </span>
                          </div>
                          <i
                            @click="delete_notification(noti.id)"
                            class="fa-solid fa-trash-can text-danger mx-2 cursor-pointer"
                          ></i>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Transition>
              </li>
              <li>
                <NuxtLink :to="localPath('/cart')" class="position-relative">
                  <span class="count"> 4 </span
                  ><img src="~/assets/images/Cart.svg" alt="cart" />
                </NuxtLink>
              </li>
              <li>
                <button @click="search = true" class="btn-unstyed">
                  <img class="width18" src="~/assets/images/Magnifer.svg" />
                </button>
              </li>
              <li>
                <div class="toggle" @click="toggleSideMenu">
                  <i class="fa-solid fa-bars"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <Dialog
      class="site-modal none-header"
      v-model:visible="terms_conditions"
      modal
      :style="{ width: '50vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div class="container p-5">
        <h5 class="fw-bold mb-3 text-primary">{{ $t("layout.terms") }}</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur. Vestibulum odio eu duis eget
          congue semper. Egestas in eget lectus sed consectetur lacus facilisis.
          Blandit eu in adipiscing at amet. Laoreet purus dui nibh laoreet
          commodo adipiscing quam lobortis consectetur. Lorem ipsum dolor sit
          amet consectetur. Vestibulum odio eu duis eget congue semper. Egestas
          in eget lectus sed consectetur lacus facilisis. Blandit eu in
          adipiscing at amet. Laoreet purus dui nibh laoreet commodo adipiscing
          quam lobortis consectetur.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur. Vestibulum odio eu duis eget
          congue semper. Egestas in eget lectus sed consectetur lacus facilisis.
          Blandit eu in adipiscing at amet. Laoreet purus dui nibh laoreet
          commodo adipiscing quam lobortis consectetur. Lorem ipsum dolor sit
          amet consectetur. Vestibulum odio eu duis eget congue semper. Egestas
          in eget lectus sed consectetur lacus facilisis. Blandit eu in
          adipiscing at amet. Laoreet purus dui nibh laoreet commodo adipiscing
          quam lobortis consectetur.
        </p>
      </div>
    </Dialog>
    <Dialog
      class="site-modal search-box"
      v-model:visible="search"
      modal
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <form @submit.prevent="handelSearch">
        <div class="input-group">
          <input
            type="text"
            v-model="productsStore.keyword"
            class="default px-3 w-100"
            placeholder="Search"
          />
          <button
            class="btn btn-primary search-btn"
            :disabled="!productsStore.keyword"
          >
            search
          </button>
        </div>
      </form>
    </Dialog>
    <Dialog
      class="site-modal none-header"
      v-model:visible="auth_modal"
      modal
      :style="{ width: '615px' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div class="container">
        <TabView>
          <TabPanel :header="$t('form_layout.login')">
            <AuthLogin
              @login-toForgetPassword="forgetPassword"
              @login_success="login_success"
            />
          </TabPanel>
          <TabPanel :header="$t('form_layout.sign_up')">
            <AuthSignUp
              @activation-signup="Verification_signup"
              @terms-modal="TermsModal"
            />
          </TabPanel>
        </TabView>
      </div>
    </Dialog>
    <Dialog
      class="site-modal"
      v-model:visible="Verification"
      modal
      :style="{ width: '615px' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #header>
        <div class="border-bottom w-100 pt-2 pb-3">
          <h6 class="text-center fw-bold text-primary">
            {{ $t("layout.Verification") }}
          </h6>
        </div>
      </template>
      <div class="container">
        <AuthVerification
          @on-complete="activation_code"
          :user_auth="user_auth"
          @returnToLogin="backToLogin"
          @returnmsg="returnmsg"
        />
      </div>
    </Dialog>
    <Dialog
      class="site-modal"
      v-model:visible="forget_password"
      modal
      :style="{ width: '615px' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #header>
        <div class="border-bottom w-100 pt-2 pb-3">
          <h6 class="text-center fw-bold text-primary">
            {{ $t("layout.forgetPassword") }}
          </h6>
        </div>
      </template>
      <div class="container">
        <AuthForgetVerification
          @backToLogin_from_reset="backToLogin_from_reset"
          @backToLogin="backToLogin"
          :phone_number="phone_number"
          :country_code="country_code"
        />
      </div>
    </Dialog>
    <Dialog
      class="site-modal none-header"
      v-model:visible="success_modal"
      modal
      :style="{ width: '25rem' }"
    >
      <div class="container">
        <div
          class="flex justify-content-center align-items-center flex-column py-4 gap30"
        >
          <img src="~/assets/images/success.svg" class="w-25 h-auto" alt="" />
          <h5 class="text-center fw-bold text-primary fw-bold">
            {{ active_msg }}
          </h5>
          <button class="btn btn-primary w-100" @click="success_modal = false">
            {{ $t("form_layout.continue") }}
          </button>
        </div>
      </div>
    </Dialog>
    <Dialog
      class="site-modal none-header"
      v-model:visible="success_modal_from_reset"
      modal
      :style="{ width: '25rem' }"
    >
      <div class="container">
        <div
          class="flex justify-content-center align-items-center flex-column py-4 gap30"
        >
          <img src="~/assets/images/success.svg" class="w-25 h-auto" alt="" />
          <h5 class="text-center fw-bold text-primary fw-bold">
            {{ active_msg }}
          </h5>
          <button class="btn btn-primary w-100" @click="reset_password_success">
            {{ $t("form_layout.login") }}
          </button>
        </div>
      </div>
    </Dialog>
  </header>
</template>

<script setup>
// ========================================================================= imports
import TabView from "primevue/tabview";
import { useAuthStore } from "~/stores/auth";
import { useRoute } from "vue-router";
import TabPanel from "primevue/tabpanel";
import { onClickOutside } from "@vueuse/core";
import { toast_handel } from "~/network/ValidTost";
import { response } from "~/network/response";
import { useProductsSearchStore } from "~/stores/productsSearch";
// ========================================================================= data
const axios = useNuxtApp().$axios;
const localPath = useLocalePath();
const { notify_toast } = toast_handel();
const route = useRouter();
const useRout = useRoute();
const IsAuth = ref(false);
const authStore = useAuthStore();
const terms_conditions = ref(false);
const search = ref(false);
const phoneMedia = ref(null);
const auth_modal = ref(false);
const forget_password = ref(false);
const Verification = ref(false);
const active_msg = ref();
const user_auth = ref({});
const success_modal = ref(false);
const success_modal_from_reset = ref(false);
const dropShown = ref(false);
const target = ref(null);
const noti_dropShown = ref(false);
const noti_target = ref(null);
onClickOutside(target, (event) => (dropShown.value = false));
onClickOutside(noti_target, (event) => (noti_dropShown.value = false));
const phone_number = ref();
const country_code = ref();
const productsStore = useProductsSearchStore();
const notifications = ref([]);
const noti_count = ref("");
// ========================================================================= methods
// ============================= mediaHandller
if (window) {
  const mediaHandller = (media) => {
    if (media.matches) {
      phoneMedia.value = true;
    } else {
      phoneMedia.value = false;
    }
  };
  var media = window.matchMedia("(max-width: 992px)");
  mediaHandller(media);
  media.addListener(mediaHandller);
}
// ============================= toggleSideMenu Handller
const toggleSideMenu = () => {
  document.querySelector(".overlay").classList.toggle("active");
  document.querySelector(".navbar").classList.toggle("open");
};
const closeSideMenu = () => {
  let nav_state = document.querySelector(".navbar.open");
  if (nav_state) {
    document.querySelector(".overlay").classList.remove("active");
    document.querySelector(".navbar").classList.remove("open");
  }
};
//  ================================================================= modal emits
// ================== close auth modal open forget password modal
const forgetPassword = (phone, code) => {
  auth_modal.value = false;
  forget_password.value = true;
  phone_number.value = phone;
  country_code.value = code;
};
// ================== backToLogin from forget password modal
const backToLogin = () => {
  auth_modal.value = true;
  forget_password.value = false;
  if (Verification.value) {
    Verification.value = false;
  }
};
// ================== backToLogin from reset password modal
const backToLogin_from_reset = (res) => {
  console.log(res);
  success_modal_from_reset.value = true;
  forget_password.value = false;
  active_msg.value = res.data.msg;
};
// ================== return msg from sign up verification
const returnmsg = (msg) => {
  Verification.value = false;
  success_modal.value = true;
  active_msg.value = msg;
  setTimeout(() => {
    success_modal.value = false;
    get_profile();
  }, 1000);
};
// ================== verification after signup
const Verification_signup = () => {
  Verification.value = true;
  setTimeout(() => {
    auth_modal.value = false;
  }, 500);
  user_auth.value = authStore.user.data;
};
// ================== login success
const login_success = () => {
  auth_modal.value = false;
  user_auth.value = authStore.user.data;
  get_profile();
};
// ================== reset password success
const reset_password_success = () => {
  auth_modal.value = true;
  success_modal_from_reset.value = false;
};
//========================================== log out handler
const logout = async () => {
  dropShown.value = !dropShown.value;
  await authStore.logout(authStore.user.data.token);
  if (authStore.logedout.data.key == "success") {
    IsAuth.value = false;
    notify_toast(authStore.logedout.data.msg, "success");
    route.push(localPath({ path: "/" }));
  } else {
    notify_toast(authStore.logedout.data.msg, "error");
  }
};
// ==================================== get profile
const get_profile = async () => {
  IsAuth.value = true;
  const res = await axios.get("profile");
  let status = response(res).status;
  if (status === "success") {
    user_auth.value = response(res).data;
    // window.location.reload()
    // IsAuth.value = true
  }
};

// ================== search
const handelSearch = () => {
  search.value = false;
  route.push(localPath({ path: "/products/search" }));
};

// ===================================== notifications
const get_all_noti = async () => {
  get_notifications();
  noti_dropShown.value = !noti_dropShown.value;
};
const get_notifications = async () => {
  axios
    .get(`notifications`)
    .then((res) => {
      let status = response(res).status;
      let data = response(res).data;
      if (status === "success") {
        notifications.value = data.notifications.data;
        // noti_count.value = data.notifications.pagination.total_items;
      }
    })
    .catch((e) => {
      console.error(e);
    });
};
const get_notifications_count = async () => {
  axios
    .get(`count-notifications`)
    .then((res) => {
      let status = response(res).status;
      let data = response(res).data;
      if (status === "success") {
        noti_count.value = data.count;
      }
    })
    .catch((e) => {
      console.error(e);
    });
};
const delete_notification = async (id) => {
  axios
    .delete(`delete-notification/${id}`)
    .then((res) => {
      let status = response(res).status;
      let msg = response(res).msg;
      if (status === "success") {
        notify_toast(msg, "success");
        get_notifications();
      } else {
        notify_toast(msg, "error");
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

// ========================================================================= lifecycle hooks

watchEffect(() => {
  productsStore.getProducts(productsStore.keyword);
});

onMounted(() => {
  productsStore.getProducts();
  if (authStore.user) {
    get_notifications_count();
    user_auth.value = authStore.user.data;
    const localeToken = authStore.user.data.token;
    console.log(localeToken);
    if (localeToken) {
      IsAuth.value = true;
    } else {
      IsAuth.value = false;
      user_auth.value = null;
    }
  }
});
// watch(user_auth.value, async () => {}, {immediate: true})
// watch route auth
watch(useRout, () => {
  if (authStore.user) {
    const localeToken = authStore.user.data.token;
    console.log(localeToken);
    if (localeToken) {
      IsAuth.value = true;
      get_notifications_count();
      get_notifications();
    } else {
      IsAuth.value = false;
      user_auth.value = null;
    }
  }
});
</script>

<style lang="scss">
.router-link-exact-active {
  font-weight: 600;

  &.nav_link {
    position: relative;

    &:after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 7px;
      height: 7px;
      background: #000;
      border-radius: 50%;
      margin: 0 auto;
      right: 0;
    }
  }
}

.input-group {
  input {
    padding-inline-end: 100px;
  }
}

.search-btn {
  position: absolute !important;
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 5px !important;
  min-width: 100px;
  height: 35px;
}
</style>