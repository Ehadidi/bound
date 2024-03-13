<template>
  <form
    @submit.prevent="verification"
    class="flex flex-column align-items-center"
  >
    <div class="my-4 text-center font13">
      {{ $t("layout.verification_caption") }}
    </div>
    <img
      class="w-6rem h-auto my-4"
      src="~/assets/images/phoneLock.png"
      alt="phone active"
    />
    <div class="mt-5 mx-auto flex flex-column align-items-center">
      <v-otp-input
        dir="ltr"
        class="otp-inputs"
        ref="otpInput"
        v-model:value="bindModal"
        input-classes="otp-input"
        separator="   "
        :num-inputs="4"
        :should-auto-focus="true"
        input-type="letter-numeric"
        :conditionalClass="['one', 'two', 'three', 'four']"
        @on-complete="handleOnComplete"
      />
      <div class="flex align-items-center justify-content-between w-100">
        <button
          type="button"
          class="btn p-0 underline fw-bold font13 w-fit min-w-min"
          @click="resend_code"
          :disabled="Count_txt != '00:00'"
        >
          <span>{{ $t("form_layout.reSend") }}</span>
          <div
            class="spinner-border spinner-border-sm d-none"
            :class="{ 'd-block': LoadBtn }"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </button>
        <span class="timer" id="timer-expire">{{ Count_txt }}</span>
      </div>
    </div>
    <button
      class="btn w-100 btn-primary mb-4 mt-3"
      :loading="loading"
      :disabled="loading === true"
    >
      <div class="d-flex align-items-center justify-content-center gap5">
        <span>{{ $t("form_layout.continue") }}</span>
        <div
          class="spinner-border spinner-border-sm"
          :class="loading ? 'd-block' : 'd-none'"
          role="status"
        >
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
import { response } from "~/network/response";
// ========================================================================== data
const emit = defineEmits(["returnmsg"]);
const axios = useNuxtApp().$axios;
const props = defineProps({
  user_auth: {
    type: [Object],
  },
});
const otpInput = ref(null);
const bindModal = ref("");
const LoadBtn = ref(false);
const { notify_toast } = toast_handel();
const loading = ref(false);
const authStore = useAuthStore();
const activ_code = ref();
const Count_txt = ref("01:00");
const loading_resend = ref(false);
// ========================================================================== methods
//  ======================== clear otp
const clearInput = () => {
  otpInput.value?.clearInput();
};
const handleOnComplete = async (value) => {
  activ_code.value = value;
};
// ========================= handelVerification
const verification = async () => {
  loading.value = true;
  const fd = new FormData();

  if (
    (activ_code.value && props.user_auth.phone, props.user_auth.country_code)
  ) {
    fd.append("code", activ_code.value);
    fd.append("phone", props.user_auth.phone);
    fd.append("country_code", props.user_auth.country_code);
  } else if (authStore.user.data.user) {
    fd.append("code", authStore.user.data.user.code);
    fd.append("phone", authStore.user.data.user.phone);
    fd.append("country_code", authStore.user.data.user.country_code);
  }

  fd.append("device_id", "1");
  fd.append("device_type", "web");
  await authStore.handelVerification(fd);
  if (authStore.user.key == "success") {
    loading.value = false;
    notify_toast(authStore.user.msg, "success");
    clearInput();
    emit("returnmsg", authStore.user.msg);
  } else {
    loading.value = false;
    notify_toast(authStore.user.msg, "error");
  }
};
//  ======================== resend code
const resend_code = async () => {
  const res = await axios.get(
    `resend-code?phone=${
      props.user_auth.phone
        ? props.user_auth.phone
        : authStore.user.data.user.phone
    }&country_code=${
      props.user_auth.country_code
        ? props.user_auth.country_code
        : authStore.user.data.user.country_code
    }`
  );
  let status = response(res).status;
  let msg = response(res).msg;
  if (status === "success") {
    notify_toast(msg, "success");
    count_down();
  } else {
    notify_toast(msg, "error");
  }
};

//  ========================  count down
const count_down = async () => {
  let secondsLeft = 60; // 1 minute

  const timerId = setInterval(() => {
    secondsLeft--;

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    Count_txt.value = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    if (secondsLeft === 0) {
      clearInterval(timerId);
      Count_txt.value = "00:00";
    }
  }, 1000);
};

//  ========================================================================== lifecycle
onMounted(() => {
  count_down();
});
</script>

<style lang="scss" scoped></style>
