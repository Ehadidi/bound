<template>
    <div class="flex flex-column align-items-center justify-content-center">
        <img class="width163 height108" src="~/assets/images/auth-logo.png" alt="logo">
        <div class="flex align-items-center text-primary font12 fw-bold gap5 my-4">
            <span>{{ $t('form_layout.login_problem') }}</span>
            <NuxtLink class="underline" to="">{{ $t('header.contact_us') }}</NuxtLink>
        </div>
    </div>
    <form @submit.prevent="login" ref="loginForm">
        <FormInput :label="$t('form_layout.phone')" InputClass="validated" @change="change_valid"
            :placeholder="$t('form_layout.enter_phone')" :model="form" name="phone" type="number" parentClass="my-3" 
            :icon="true" :addition="true">
            <template #icon>
                <img class="width20" src="~/assets/images/phone.svg" alt="phone">
            </template>
            <template #addition>
                <div class="flex align-items-center gap5 height50 px-2">
                    <input style="background-color: transparent;" class="width40 height50 border-0 font13" readonly
                        type="text" name="country_code" value="966">
                    <img class="width20" src="~/assets/images/soud_flag.svg" alt="flag ksa">
                </div>
            </template>
        </FormInput>
        <FormInput InputClass="validated" @change="change_valid" :label="$t('form_layout.password')"
            :placeholder="$t('form_layout.enter_password')" :model="form" name="password" type="password" parentClass="my-3"
            :icon="true">
            <template #icon>
                <img class="width20" src="~/assets/images/Lock.svg" alt="Lock password">
            </template>
        </FormInput>
        <div class="flex justify-content-end my-3">
            <button type="button" @click="toggleModalForhotPassword"
                class="btn p-0 w-fit h-fit min-w-min underline fw-bold font13">{{ $t('form_layout.forgot_password')
                }}</button>
        </div>
        <div class="my-5">
            <!-- <button class="btn w-100 btn-primary">
                <div class="flex align-items-baseline justify-content-center">
                    <span class="font14">{{ $t('form_layout.login') }}</span>
                    <span><img class="width25 height26" src="~/assets/images/login-arrow.svg" alt="login arrow"></span>
                </div>
            </button> -->
            <button class="btn w-100 btn-primary mb-4 mt-3" :loading="loading" :disabled="loading === true">
                <div class="d-flex align-items-center justify-content-center gap5">
                    <span>{{ $t('form_layout.login') }}</span>
                    <div class="spinner-border spinner-border-sm" :class="loading ? 'd-block' : 'd-none'" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <span><img class="width25 height26" src="~/assets/images/login-arrow.svg" alt="login arrow"></span>
                </div>
            </button>
        </div>
    </form>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: 'global' });
import { useAuthStore } from "~/stores/auth";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
import { validate, change_valid } from "~/validation/validation";
// ========================================================================= data
const emit = defineEmits(['modal-changed' , 'login_success'])
const form = reactive({
    phone: '',
    password: ''
})
const i18n_redirected = useCookie("i18n_redirected");
const lang = i18n_redirected.value == "en-US" ? "en" : "ar";
const axios = useNuxtApp().$axios;
// const localePath = useLocalePath();
const { notify_toast } = toast_handel();
// const router = useRouter();
const authStore = useAuthStore();
const loading = ref(null);
const loginForm = ref()

// ========================================================================= methods
const toggleModalForhotPassword = () => {
    emit('modal-changed')
}
const login = async () => {
    loading.value = true;
    const fd = new FormData(loginForm.value);
    fd.append("device_id", "1");
    fd.append("device_type", "web");
    let valid = validate(loginForm.value).valid;
    let valid_ruls = valid === "isValid"
    if (valid_ruls) {
        await authStore.handelLogin(fd);
        if (authStore.user.key == "success") {
            loading.value = false;
            notify_toast(authStore.user.msg, "success");
            loginForm.value.reset();
            emit('login_success')

        } else {
            loading.value = false;
            notify_toast(authStore.user.msg, "error");
        }
    } else {
        notify_toast(t(`validate_msg.uncomplete`), "error");
        loading.value = false;
    }
}
// ========================================================================= lifecycle hooks
</script>

<style lang="scss" scoped></style>