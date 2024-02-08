<template>
    <form @submit.prevent="forget_verification" class="flex flex-column align-items-center">
        <div class="my-4 text-center font13">Please, enter the code sent on your phone</div>
        <img class="w-6rem h-auto my-4" src="~/assets/images/phone-active.png" alt="phone active">
        <div class="mt-5 mx-auto flex flex-column align-items-center">
            <v-otp-input dir="ltr" class="otp-inputs" ref="otpInput" v-model:value="bindModal" input-classes="otp-input"
                separator="" :num-inputs="4" :should-auto-focus="true" input-type="letter-numeric"
                :conditionalClass="['one', 'two', 'three', 'four']" @on-complete="handleOnComplete" />
            <div class="flex align-items-center justify-content-between w-100">
                <button type="button" class="btn p-0 underline fw-bold font13 w-fit min-w-min">
                    <span>{{ $t('form_layout.reSend') }}</span>
                    <div class="spinner-border spinner-border-sm d-none" :class="{ 'd-block': LoadBtn }" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </button>
                <span class="timer" id="timer-expire">{{ Count_txt }}</span>
            </div>
        </div>
        <div class="grid w-100">
            <div class="col-12 md:col-6">
                <button type="button" class="btn btn-outline-primary up w-100" @click="back_to_login">{{
                    $t('form_layout.back') }}</button>
            </div>
            <div class="col-12 md:col-6">
                <!-- <button class="btn btn-primary up w-100" @click="reset_password = true">{{ $t('form_layout.continue')
                }}</button> -->
                <button class="btn btn-primary up w-100" :loading="loading" :disabled="loading === true">
                    <div class="d-flex align-items-center justify-content-center gap5">
                        <span>{{ $t('form_layout.continue') }}</span>
                        <div class="spinner-border spinner-border-sm" :class="loading ? 'd-block' : 'd-none'" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </button>
                <Dialog class="site-modal" v-model:visible="reset_password" modal :style="{ width: '615px' }"
                    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                    <template #header>
                        <div class="border-bottom w-100 pt-2 pb-3">
                            <h6 class="text-center fw-bold text-primary">{{ $t('layout.forgetPassword') }}</h6>
                        </div>
                    </template>
                    <div class="container">
                        <AuthResetPassword @return_response="return_response_from_reset" :phone_number="phone_number"
                            :country_code="country_code" :bindModal="bindModal" />
                    </div>
                </Dialog>
            </div>
        </div>
    </form>
</template>

<script setup>
// ========================================================================== imports
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
import VOtpInput from "vue3-otp-input";
// ========================================================================== data
const props = defineProps({
    country_code: {
        type: [Number]
    },
    phone_number: {
        type: [Number]
    },
    forget_opened: {
        type: [Boolean],
    }
})
const otpInput = ref(null);
const bindModal = ref("");
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
const reset_password = ref(false);
const LoadBtn = ref(false);
const handleOnComplete = (value) => {
    return value
};
const emit = defineEmits(['backToLogin', 'backToLogin_from_reset']);
const Count_txt = ref()
const loading = ref(false)
//  ========================================================================== methods
const return_response_from_reset = (res) => {
    emit('backToLogin_from_reset', res)
}
//  ======================== clear otp
const clearInput = () => {
    otpInput.value?.clearInput();
};

const forget_verification = async () => {
    loading.value = true;
    const fd = new FormData();
    fd.append('code', bindModal.value)
    fd.append("phone", props.phone_number);
    fd.append("country_code", props.country_code);
    const res = await axios.post('forget-password-check-code', fd)
    let status = response(res).status
    let msg = response(res).msg
    if (status === 'success') {
        loading.value = false;
        notify_toast(msg, "success");
        reset_password.value = true
    } else {
        loading.value = false;
        notify_toast(msg, "error");
    }
}

// ====================== back to login
const back_to_login = () => {
    emit('backToLogin')
}

// ============================================================================= lifecycle
onMounted(() => {
    Count_txt.value = "00:00";
})
</script>

<style lang="scss" scoped></style>