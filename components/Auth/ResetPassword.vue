<template>
  <div class="flex flex-column align-items-center">
    <img
      class="w-6rem h-auto my-4"
      src="~/assets/images/phoneLock.png"
      alt="phone active"
    />
    <form
      @submit.prevent="change_password"
      class="w-100"
      ref="change_password_form"
    >
      <FormInput
        InputClass="validated"
        @change="handleChange"
        :label="$t('form_layout.password')"
        :placeholder="$t('form_layout.enter_password')"
        :model="form"
        name="password"
        type="password"
        parentClass="my-3"
        :icon="true"
      >
        <template #icon>
          <img
            class="width20"
            src="~/assets/images/Lock.svg"
            alt="Lock password"
          />
        </template>
      </FormInput>
      <FormInput
        InputClass="validated"
        @change="handleChange"
        :label="$t('form_layout.password')"
        :placeholder="$t('form_layout.re_enter_password')"
        :model="form"
        name="password_confirmation"
        type="password"
        parentClass="my-3"
        :icon="true"
      >
        <template #icon>
          <img
            class="width20"
            src="~/assets/images/Lock.svg"
            alt="Lock password"
          />
        </template>
      </FormInput>
      <div class="mt-4 mb-3">
        <button
          class="btn w-100 btn-primary"
          :loading="loading"
          :disabled="loading === true"
        >
          <div class="d-flex align-items-center justify-content-center gap5">
            <span>{{ $t("form_layout.change_password") }}</span>
            <div
              class="spinner-border spinner-border-sm"
              :class="loading ? 'd-block' : 'd-none'"
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// ========================================================================== imports
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
import { validate, change_valid } from "~/utils/validation";
// ========================================================================== data
const emit = defineEmits(["return_response"]);
const form = reactive({
  Password: "",
  password_confirmation: "",
});
const props = defineProps({
  country_code: {
    type: [Number],
  },
  phone_number: {
    type: [Number],
  },
  bindModal: {
    type: [String],
  },
});
const loading = ref(false);
const change_password_form = ref(null);
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
//  ========================================================================== methods
// handel change validation
const handleChange = (e) => {
  change_valid(e, t);
};
const change_password = async () => {
  loading.value = true;
  const fd = new FormData(change_password_form.value);
//   console.log(props.bindModal);
  fd.append("code", props.bindModal);
  fd.append("phone", props.phone_number);
  fd.append("country_code", props.country_code);
  let valid = validate(change_password_form.value, t).valid;
  let valid_ruls = valid === "isValid";
  if (valid_ruls) {
    const res = await axios.post("reset-password", fd);
    let status = response(res).status;
    let msg = response(res).msg;
    if (status === "success") {
      notify_toast(msg, "success");
      emit("return_response", res);
      loading.value = false;
    } else {
      notify_toast(msg, "error");
      loading.value = false;
    }
  } else {
    notify_toast(t(`validate_msg.uncomplete`), "error");
    loading.value = false;
  }
};

// ============================================================================= lifecycle
</script>

<style lang="scss" scoped></style>
