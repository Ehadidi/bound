<template>
    <header class="bg-white p-3">
        <div class="top-head">
            <div class="container">
                <div class="d-flex align-items-center justify-content-between">
                    <div v-if="!auth" class="d-flex items-start gap-2">
                        <span class="pi pi-user"></span>
                        <button @click="auth_modal = true" class="btn p-0 w-fit min-w-min h-fit">{{ $t('header.auth')
                        }}</button>
                    </div>
                    <div v-else class="d-flex align-items-center flex-wrap side-btns">
                        <div v-if="user_auth" class="dropdown" ref="target">
                            <button class="btn p-0 dropdownToggle min-w-min h-fit" @click="dropShown = !dropShown"
                                type="button">
                                <div class="d-flex align-items-center">
                                    <img src="~/assets/images/user.svg" alt="user profile">
                                    <span class="mx-2 fw-bold">{{ user_auth.name }}</span>
                                    <i class="fa-solid fa-chevron-down text-dark fs-10px"></i>
                                </div>
                            </button>
                            <Transition name="dropShow">
                                <ul v-if="dropShown" class="dropdown-menu">
                                    <li>
                                        <NuxtLink class="dropdown-item defualt-link" @click="dropShown = !dropShown"
                                            :to="localPath('/')">
                                            <div class="d-flex align-items-center">
                                                <img class="user-icon me-2" src="~/assets/images/settings.svg"
                                                    alt="settings" />
                                                <span class="user-txt">{{ $t("layout.settings") }}</span>
                                            </div>
                                        </NuxtLink>
                                    </li>
                                    <li>
                                        <NuxtLink class="dropdown-item defualt-link" @click="dropShown = !dropShown"
                                            :to="localPath('/')">
                                            <div class="d-flex align-items-center">
                                                <img class="user-icon me-2" src="~/assets/images/wallet.svg" alt="wallet" />
                                                <span class="user-txt">{{ $t("layout.wallet") }}</span>
                                            </div>
                                        </NuxtLink>
                                    </li>
                                    <li>
                                        <NuxtLink class="dropdown-item defualt-link" @click="dropShown = !dropShown"
                                            :to="localPath('/')">
                                            <div class="d-flex align-items-center">
                                                <img class="user-icon me-2" src="~/assets/images/GPS.svg" alt="GPS" />
                                                <span class="user-txt">{{ $t("layout.my_addresses") }}</span>
                                            </div>
                                        </NuxtLink>
                                    </li>
                                    <li>
                                        <NuxtLink class="dropdown-item defualt-link" @click="dropShown = !dropShown"
                                            :to="localPath('/')">
                                            <div class="d-flex align-items-center">
                                                <img class="user-icon me-2" src="~/assets/images/Phone.svg" alt="Phone" />
                                                <span class="user-txt">{{ $t("header.contact_us") }}</span>
                                            </div>
                                        </NuxtLink>
                                    </li>
                                    <li>
                                        <NuxtLink class="dropdown-item defualt-link" @click="dropShown = !dropShown"
                                            :to="localPath('/')">
                                            <div class="d-flex align-items-center">
                                                <img class="user-icon me-2" src="~/assets/images/Shield.svg" alt="Shield" />
                                                <span class="user-txt">{{ $t("layout.suggestions") }}</span>
                                            </div>
                                        </NuxtLink>
                                    </li>
                                    <li>
                                        <NuxtLink class="dropdown-item defualt-link" @click="dropShown = !dropShown"
                                            :to="localPath('/')">
                                            <div class="d-flex align-items-center">
                                                <img class="user-icon me-2" src="~/assets/images/settings.svg"
                                                    alt="profile" />
                                                <span class="user-txt">{{ $t("layout.settings") }}</span>
                                            </div>
                                        </NuxtLink>
                                    </li>
                                    <li>
                                        <NuxtLink class="dropdown-item defualt-link" @click="dropShown = !dropShown"
                                            :to="localPath('/')">
                                            <div class="d-flex align-items-center">
                                                <img class="user-icon me-2" src="~/assets/images/document.svg"
                                                    alt="Receipts" />
                                                <span class="user-txt">{{ $t("layout.receipts") }}</span>
                                            </div>
                                        </NuxtLink>
                                    </li>
                                    <li>
                                        <NuxtLink class="dropdown-item defualt-link" @click="dropShown = !dropShown"
                                            :to="localPath('/')">
                                            <div class="d-flex align-items-center">
                                                <img class="user-icon me-2" src="~/assets/images/box.svg"
                                                    alt="product box" />
                                                <span class="user-txt">{{ $t("layout.AddMyProduct") }}</span>
                                            </div>
                                        </NuxtLink>
                                    </li>
                                    <li>
                                        <NuxtLink class="dropdown-item defualt-link" @click="dropShown = !dropShown"
                                            :to="localPath('/')">
                                            <div class="d-flex align-items-center">
                                                <img class="user-icon me-2" src="~/assets/images/pen.svg"
                                                    alt="terms and conditions" />
                                                <span class="user-txt">{{ $t("layout.terms") }}</span>
                                            </div>
                                        </NuxtLink>
                                    </li>
                                    <li>
                                        <button class="dropdown-item defualt-link" @click="logout">
                                            <div class="d-flex align-items-center gap18">
                                                <img class="user-icon me-2" src="~/assets/images/logout.svg" alt="logout" />
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
                                <NuxtLink class="nav_link" @click="closeSideMenu" :to="localPath('/')">{{ $t('header.home')
                                }}</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="nav_link" @click="closeSideMenu" :to="localPath('/about')">{{
                                    $t('header.about') }}</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="nav_link" @click="closeSideMenu" :to="localPath('/about')">{{
                                    $t('header.subscription') }}
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="nav_link" @click="closeSideMenu" :to="localPath('/about')">{{
                                    $t('header.my_orders') }}</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="nav_link" @click="closeSideMenu" :to="localPath('/about')">{{
                                    $t('header.contact_us') }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div class="user_list">
                        <ul>
                            <li>
                                <NuxtLink :to="localPath('/')"><img src="~/assets/images/BellBing.svg" alt="notification">
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="localPath('/')"><img src="~/assets/images/Cart.svg" alt="cart"></NuxtLink>
                            </li>
                            <li>
                                <button @click="search = true" class="btn-unstyed">
                                    <img class="width18" src="~/assets/images/Magnifer.svg">
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
        <Dialog class="search-box" v-model:visible="search" modal :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="">
                <input type="text" class="default px-3 w-100" placeholder="Search">
            </div>
        </Dialog>
        <Dialog class="site-modal none-header" v-model:visible="auth_modal" modal :style="{ width: '615px' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="container">
                <TabView>
                    <TabPanel :header="$t('form_layout.login')">
                        <AuthLogin @modal-changed="forgetPassword" @login_success="login_success" />
                    </TabPanel>
                    <TabPanel :header="$t('form_layout.sign_up')">
                        <AuthSignUp @activation-signup="Verification_signup" @terms-modal="TermsModal" />
                    </TabPanel>
                </TabView>
            </div>
        </Dialog>
        <Dialog class="site-modal" v-model:visible="Verification" modal :style="{ width: '615px' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
                <div class="border-bottom w-100 pt-2 pb-3">
                    <h6 class="text-center fw-bold text-primary">{{ $t('layout.Verification') }}</h6>
                </div>
            </template>
            <div class="container">
                <AuthVerification @on-complete="activation_code" :user_data="user_data" @returnToLogin="backToLogin"
                    @returnmsg="returnmsg" />
            </div>
        </Dialog>
        <Dialog class="site-modal" v-model:visible="forget_password" modal :style="{ width: '615px' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
                <div class="border-bottom w-100 pt-2 pb-3">
                    <h6 class="text-center fw-bold text-primary">{{ $t('layout.forgetPassword') }}</h6>
                </div>
            </template>
            <div class="container">
                <AuthForgetVerification @backToLogin="backToLogin" />
            </div>
        </Dialog>
        <Dialog class="site-modal none-header" v-model:visible="success_modal" modal :style="{ width: '25rem' }">
            <div class="container">
                <div class="flex justify-content-center align-items-center flex-column py-4 gap30">
                    <img src="~/assets/images/success.svg" class="w-25 h-auto" alt="">
                    <h5 class="text-center fw-bold text-primary fw-bold">
                        {{ active_msg }}
                    </h5>
                    <button class="btn btn-primary w-100" @click="success_modal = false">{{ $t('form_layout.continue')
                    }}</button>
                </div>
            </div>
        </Dialog>
    </header>
</template>

<script setup>
// ========================================================================= imports
import TabView from 'primevue/tabview';
import { useAuthStore } from "~/stores/auth";
import { useRoute } from "vue-router";
import TabPanel from 'primevue/tabpanel';
import { onClickOutside } from "@vueuse/core";
import { toast_handel } from "~/network/ValidTost";
// ========================================================================= data
const localPath = useLocalePath();
const { notify_toast } = toast_handel();
const route = useRouter()
const useRout = useRoute()
const auth = ref(false)
const authStore = useAuthStore();
const search = ref(false)
const phoneMedia = ref(null)
const auth_modal = ref(false)
const forget_password = ref(false)
const Verification = ref(false)
const active_msg = ref()
const user_data = ref()
const user_auth = ref({})
const success_modal = ref(false)
const dropShown = ref(false);
const target = ref(null);
onClickOutside(target, (event) => (dropShown.value = false));
// ========================================================================= methods
// ============================= mediaHandller
if (window) {
    const mediaHandller = (media) => {
        if (media.matches) {
            phoneMedia.value = true
        } else {
            phoneMedia.value = false
        }
    }
    var media = window.matchMedia("(max-width: 992px)")
    mediaHandller(media)
    media.addListener(mediaHandller)
}
// ============================= toggleSideMenu Handller
const toggleSideMenu = () => {
    document.querySelector('.overlay').classList.toggle('active')
    document.querySelector('.navbar').classList.toggle('open')
}
const closeSideMenu = () => {
    let nav_state = document.querySelector('.navbar.open')
    if (nav_state) {
        document.querySelector('.overlay').classList.remove('active')
        document.querySelector('.navbar').classList.remove('open')
    }
}
//  ============================ modal emits
const forgetPassword = () => {
    auth_modal.value = false
    forget_password.value = true
}
const backToLogin = () => {
    auth_modal.value = true
    forget_password.value = false
    if (Verification.value) {
        Verification.value = false
    }
}
const returnmsg = (msg) => {
    Verification.value = false
    success_modal.value = true
    active_msg.value = msg
}
const Verification_signup = (user) => {
    Verification.value = true
    setTimeout(() => {
        auth_modal.value = false
    }, 500);
    user_data.value = user
    user_auth.value = authStore.user.data
    route.push(localPath({ path: "/" }));
}
const login_success = () => {
    auth_modal.value = false
    user_auth.value = authStore.user.data
    route.push(localPath({ path: "/" }));
}
//========================================== log out handler 
const logout = async () => {
    dropShown.value = !dropShown.value
    await authStore.logout(authStore.user.data.token)
    if (authStore.logedout.data.key == 'success') {
        notify_toast(authStore.logedout.data.msg, "success");
        route.push(localPath({ path: "/" }));

    } else {
        notify_toast(authStore.logedout.data.msg, "error");
    }

}
// ========================================================================= lifecycle hooks
onMounted(() => {
    if (authStore.user) {
        user_auth.value = authStore.user.data
        const localeToken = authStore.user.data.token;
        if (localeToken) {
            auth.value = true;
        } else {
            auth.value = false;
            user_auth.value = null
        }
    }
})
// watch route auth
watch(useRout, () => {
    if (authStore.user) {
        const localeToken = authStore.user.data.token;
        if (localeToken) {
            auth.value = true;
        } else {
            auth.value = false;
            user_auth.value = null
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
</style>