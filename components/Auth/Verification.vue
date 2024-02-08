<template>
    <form @submit.prevent="verification" class="flex flex-column align-items-center">
        <div class="my-4 text-center font13">{{ $t('layout.verification_caption') }}</div>
        <img class="w-6rem h-auto my-4" src="~/assets/images/phoneLock.png" alt="phone active">
        <div class="mt-5 mx-auto flex flex-column align-items-center">
            <v-otp-input dir="ltr" class="otp-inputs" ref="otpInput" v-model:value="bindModal" input-classes="otp-input"
                separator="   " :num-inputs="4" :should-auto-focus="true" input-type="letter-numeric"
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
        <button class="btn w-100 btn-primary mb-4 mt-3" :loading="loading" :disabled="loading === true">
            <div class="d-flex align-items-center justify-content-center gap5">
                <span>{{ $t('form_layout.continue') }}</span>
                <div class="spinner-border spinner-border-sm" :class="loading ? 'd-block' : 'd-none'" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </button>
    </form>
</template>

<script setup>
// ========================================================================== imports
import VOtpInput from "vue3-otp-input";
import { useAuthStore } from "~/stores/auth";
import { toast_handel } from "~/network/ValidTost";
// ========================================================================== data
const emit = defineEmits(["returnmsg"]);
const props = defineProps({
    user_auth: {
        type: [Object]
    },
})
const otpInput = ref(null);
const bindModal = ref("");
const LoadBtn = ref(false);
const { notify_toast } = toast_handel();
const loading = ref(false)
const authStore = useAuthStore();
const activ_code = ref()
const Count_txt = ref()

// ========================================================================== methods
//  ======================== clear otp
const clearInput = () => {
    otpInput.value?.clearInput();
};
const handleOnComplete = async (value) => {
    activ_code.value = value
};
// ========================= handelVerification
const verification = async () => {
    loading.value = true;
    const fd = new FormData();
    fd.append('code', activ_code.value)
    fd.append("phone", props.user_auth.phone);
    fd.append("country_code", props.user_auth.country_code);
    fd.append("device_id", '1');
    fd.append("device_type", 'web');
    await authStore.handelVerification(fd);
    if (authStore.user.key == "success") {
        loading.value = false;
        notify_toast(authStore.user.msg, "success");
        clearInput()
        emit("returnmsg", authStore.user.msg);

    } else {
        loading.value = false;
        notify_toast(authStore.user.msg, "error");
    }
}
//  ========================================================================== lifecycle
onMounted(() => {
    Count_txt.value = "00:00";
})

</script>

<style lang="scss" scoped></style>