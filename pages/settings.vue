<template>
  <section class="bg-lightGrayClr py-5">
    <div class="container">
      <div class="grig">
        <div class="col-12 md:col-8 lg:col-7 mx-auto">
          <h5 class="fw-bold text-start py-3">
            {{ $t("layout.profile_settings") }}
          </h5>
        </div>
        <div class="col-12 md:col-8 lg:col-7 mx-auto bg-white main_shadow">
          <form
            @submit.prevent="edit_profile"
            ref="edit_form"
            style="max-width: 90%"
            class="mx-auto py-3"
          >
            <FormInput
              :label="$t('form_layout.user_name')"
              :placeholder="$t('form_layout.enter_user_name')"
              :model="form"
              name="name"
              type="text"
              parentClass="w-100 my-3"
              :icon="true"
            >
              <template #icon>
                <img
                  class="width20"
                  src="~/assets/images/User.svg"
                  alt="user name"
                />
              </template>
            </FormInput>
            <FormInput
              :label="$t('form_layout.email')"
              :placeholder="$t('form_layout.enter_email')"
              :model="form"
              name="email"
              type="email"
              parentClass="w-100 my-3"
              :icon="true"
            >
              <template #icon>
                <img
                  class="width20"
                  src="~/assets/images/Letter.svg"
                  alt="e-mail"
                />
              </template>
            </FormInput>
            <div class="w-100 my-3">
              <label class="fw-bold txt_start d-block mb-2">{{
                $t("form_layout.City")
              }}</label>
              <div class="form-inputs">
                <Dropdown
                  filter
                  @change="city_check"
                  v-model="selectedCity"
                  :emptyFilterMessage="$t('validate_msg.emptyFilterMessage')"
                  :emptyMessage="$t('validate_msg.emptyFilterMessage')"
                  :options="cities"
                  optionLabel="name"
                  :placeholder="$t('form_layout.ChooseCity')"
                  class="w-full"
                />
                <span class="form-icon">
                  <img src="~/assets/images/GPS.svg" alt="location" />
                </span>
                <div class="feedback city_feedback"></div>
              </div>
            </div>
            <button
              class="btn w-100 btn-primary my-3"
              :loading="loading"
              :disabled="loading === true"
            >
              <div
                class="d-flex align-items-center justify-content-center gap5"
              >
                <span>{{ $t("form_layout.save_changes") }}</span>
                <div
                  class="spinner-border spinner-border-sm"
                  :class="loading ? 'd-block' : 'd-none'"
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </button>
            <div class="grid">
              <div class="col-12 md:col-6">
                <button
                  type="button"
                  class="btn btn-outline-primary up w-100"
                  @click="check_password = true"
                >
                  {{ $t("form_layout.change_phone") }}
                </button>
              </div>
              <div class="col-12 md:col-6">
                <button
                  type="button"
                  class="btn btn-outline-primary up w-100"
                  @click="change_password_modal = true"
                >
                  {{ $t("form_layout.change_password") }}
                </button>
              </div>
              <div class="col-12">
                <button
                  type="button"
                  class="btn text-danger fw-bold w-100 flex gap3 align-items-center"
                  @click="delete_account"
                >
                  <i class="pi pi-trash"></i>
                  <span>{{ $t("form_layout.delete_account") }}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Dialog
      class="site-modal"
      v-model:visible="check_password"
      modal
      :style="{ width: '615px' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #header>
        <div class="border-bottom w-100 pt-2 pb-3">
          <h6 class="text-center fw-bold text-primary">
            {{ $t("form_layout.change_phone") }}
          </h6>
        </div>
      </template>
      <div class="container">
        <form
          @submit.prevent="comfirm_password"
          class="flex flex-column align-items-center w-75 mx-auto"
        >
          <div class="my-4 text-center font13">
            {{ $t("layout.check_password_caption") }}
          </div>
          <img
            class="w-6rem h-auto my-4"
            src="~/assets/images/phoneLock.png"
            alt="phone active"
          />

          <FormInput
            :label="$t('form_layout.password')"
            :placeholder="$t('form_layout.enter_password')"
            :model="form"
            name="password"
            type="password"
            parentClass="my-3 w-100"
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
      </div>
    </Dialog>
    <Dialog
      class="site-modal"
      v-model:visible="check_phone"
      modal
      :style="{ width: '615px' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #header>
        <div class="border-bottom w-100 pt-2 pb-3">
          <h6 class="text-center fw-bold text-primary">
            {{ $t("form_layout.change_phone") }}
          </h6>
        </div>
      </template>
      <div class="container">
        <form
          @submit.prevent="check_phone_send_code"
          class="flex flex-column align-items-center w-75 mx-auto"
          ref="check_phone_form"
        >
          <div class="my-4 text-center font13">
            {{ $t("layout.enter_phone_caption") }}
          </div>
          <FormInput
            :label="$t('form_layout.phone')"
            :placeholder="$t('form_layout.enter_phone')"
            :model="form"
            name="phone"
            type="number"
            parentClass="w-100"
            :icon="true"
            :addition="true"
          >
            <template #icon>
              <img
                class="width20"
                src="~/assets/images/phone.svg"
                alt="phone"
              />
            </template>
            <template #addition>
              <div class="flex align-items-center gap5 height50 px-2">
                <input
                  style="background-color: transparent"
                  class="width40 height50 border-0 font13"
                  readonly
                  type="text"
                  name="country_code"
                  value="966"
                />
                <img
                  class="width20"
                  src="~/assets/images/soud_flag.svg"
                  alt="flag ksa"
                />
              </div>
            </template>
          </FormInput>
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
      </div>
    </Dialog>
    <Dialog
      class="site-modal"
      v-model:visible="change_avtivation"
      modal
      :style="{ width: '615px' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #header>
        <div class="border-bottom w-100 pt-2 pb-3">
          <h6 class="text-center fw-bold text-primary">
            {{ $t("form_layout.change_phone") }}
          </h6>
        </div>
      </template>
      <div class="container">
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
          <img
            src="~/assets/images/success.svg"
            class="w-25 h-auto"
            alt="success message"
          />
          <h5 class="text-center fw-bold text-primary fw-bold">
            {{ t("form_layout.success_update") }}
          </h5>
          <button class="btn btn-primary w-100" @click="success_modal = false">
            {{ $t("form_layout.continue") }}
          </button>
        </div>
      </div>
    </Dialog>
    <Dialog
      class="site-modal"
      v-model:visible="change_password_modal"
      modal
      :style="{ width: '615px' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #header>
        <div class="border-bottom w-100 pt-2 pb-3">
          <h6 class="text-center fw-bold text-primary">
            {{ $t("form_layout.change_password") }}
          </h6>
        </div>
      </template>
      <div class="container">
        <form
          @submit.prevent="change_password"
          class="flex flex-column align-items-center w-75 mx-auto"
          ref="change_password_fornm"
        >
          <div class="my-4 text-center font13">
            {{ $t("layout.check_password_caption") }}
          </div>
          <img
            class="w-6rem h-auto my-4"
            src="~/assets/images/phoneLock.png"
            alt="phone active"
          />

          <FormInput
            InputClass="validated"
            @change="handleChange"
            :label="$t('form_layout.current_password')"
            :placeholder="$t('form_layout.enter_current_password')"
            :model="form"
            name="old_password"
            type="password"
            parentClass="w-100"
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
            :label="$t('form_layout.new_password')"
            :placeholder="$t('form_layout.enter_new_password')"
            :model="form"
            name="password"
            type="password"
            parentClass="w-100"
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
            :label="$t('form_layout.new_password')"
            :placeholder="$t('form_layout.re_enter_new_password')"
            :model="form"
            name="password_confirmation"
            type="password"
            parentClass="w-100"
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
      </div>
    </Dialog>
  </section>
</template>

<script setup>
// ============================================================================== imports
import VOtpInput from "vue3-otp-input";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
import { useAuthStore } from "~/stores/auth";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
import { validate, change_valid } from "~/utils/validation";
// ============================================================================== data
const authStore = useAuthStore();
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
const edit_form = ref();
const form = reactive({
  name: "",
  email: "",
  password: "",
  old_password: "",
  password_confirmation: "",
  phone: "",
});
const otpInput = ref(null);
const bindModal = ref("");
const activ_code = ref();
const selectedCity = ref();
const cities = ref([]);
const loading = ref(false);
const check_password = ref(false);
const check_phone = ref(false);
const change_avtivation = ref(false);
const success_modal = ref(false);
const check_phone_form = ref(null);
const Count_txt = ref("01:00");
const change_password_modal = ref(false);
const change_password_fornm = ref();
// ============================================================================== methods
// handel change validation
const handleChange = (e) => {
  change_valid(e, t);
};
// ===================================== get cities
const get_cities = async () => {
  const res = await axios.get("cities");
  let status = response(res).status;
  let data = response(res).data;
  if (status === "success") {
    cities.value = data;
  }
};
//  ================================= get profile data
const get_profile = async () => {
  const res = await axios.get("profile");
  let status = response(res).status;
  let data = response(res).data;
  if (status === "success") {
    form.name = data.name;
    form.email = data.email;
    selectedCity.value = { id: data.city_id, name: `${data.city}` };
  }
};
//  ================================= edit profile
const edit_profile = async () => {
  loading.value = true;
  const fd = new FormData(edit_form.value);
  fd.append("city_id", selectedCity.value.id);
  const res = await axios.post("update-profile?_method=put", fd);
  let status = response(res).status;
  let msg = response(res).msg;
  if (status === "success") {
    loading.value = false;
    notify_toast(msg, "success");
    get_profile();
  } else {
    loading.value = false;
    notify_toast(msg, "error");
  }
};
//  ======================================================== change password
const change_password = async () => {
  const fd = new FormData(change_password_fornm.value);
  let valid = validate(change_password_fornm.value, t).valid;
  let valid_ruls = valid === "isValid";
  if (valid_ruls) {
    const res = await axios.post("update-passward?_method=patch", fd);
    let status = response(res).status;
    let msg = response(res).msg;
    if (status === "success") {
      notify_toast(msg, "success");
      loading.value = false;
      form.old_password = "";
      form.password = "";
      form.password_confirmation = "";
      change_password_modal.value = false;
      success_modal.value = true;
    } else {
      notify_toast(msg, "error");
      loading.value = false;
    }
  } else {
    loading.value = false;
  }
};
//  ======================================================== change phone
// ===================================== check password
const comfirm_password = async () => {
  loading.value = true;
  const fd = new FormData();
  fd.append("password", form.password);
  const res = await axios.post("check-password", fd);
  let status = response(res).status;
  let msg = response(res).msg;
  if (status === "success") {
    loading.value = false;
    notify_toast(msg, "success");
    check_phone.value = true;
    check_password.value = false;
  } else {
    loading.value = false;
    notify_toast(msg, "error");
  }
};

// ===================================== check phone
const check_phone_send_code = async () => {
  loading.value = true;
  const fd = new FormData(check_phone_form.value);
  fd.append("password", form.password);
  const res = await axios.post("change-phone-send-code", fd);
  let status = response(res).status;
  let msg = response(res).msg;
  if (status === "success") {
    loading.value = false;
    notify_toast(msg, "success");
    check_phone.value = false;
    change_avtivation.value = true;
  } else {
    loading.value = false;
    notify_toast(msg, "error");
  }
};
// ===================================== verification phone number
//  ======================== clear otp
const clearInput = () => {
  otpInput.value?.clearInput();
};
const handleOnComplete = async (value) => {
  activ_code.value = value;
};

const verification = async () => {
  loading.value = true;
  const fd = new FormData();
  fd.append("code", activ_code.value);
  fd.append("phone", form.phone);
  fd.append("country_code", "966");
  const res = await axios.post("change-phone-check-code", fd);
  let status = response(res).status;
  let msg = response(res).msg;
  if (status === "success") {
    loading.value = false;
    notify_toast(msg, "success");
    change_avtivation.value = false;
    success_modal.value = true;
    clearInput();
  } else {
    clearInput();
    loading.value = false;
    notify_toast(msg, "error");
  }
};

//  ======================== resend code
const resend_code = async () => {
  const fd = new FormData();
  fd.append("code", activ_code.value);
  fd.append("phone", form.phone);
  fd.append("country_code", "966");
  const res = await axios.get(`change-phone-resend-code`, fd);
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

// ============================================================================== lifecycle
onMounted(() => {
  count_down();
  get_profile();
  get_cities();
});
</script>

<style lang="scss" scoped></style>
