<template>
  <form @submit.prevent="handelSignUp" ref="signUp_form">
    <div class="grid w-100">
      <FormInput
        :label="$t('form_layout.user_name')"
        InputClass="validated"
        @change="handleChange"
        :placeholder="$t('form_layout.enter_user_name')"
        :model="form"
        name="name"
        type="text"
        parentClass="col-12 lg:col-6"
        :icon="true"
      >
        <template #icon>
          <img class="width20" src="~/assets/images/User.svg" alt="user name" />
        </template>
      </FormInput>
      <FormInput
        :label="$t('form_layout.phone')"
        InputClass="validated"
        @change="handleChange"
        :placeholder="$t('form_layout.enter_phone')"
        :model="form"
        name="phone"
        type="number"
        parentClass="col-12 lg:col-6"
        :icon="true"
        :addition="true"
      >
        <template #icon>
          <img class="width20" src="~/assets/images/phone.svg" alt="phone" />
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
      <FormInput
        InputClass="validated"
        @change="handleChange"
        :label="$t('form_layout.email')"
        :placeholder="$t('form_layout.enter_email')"
        :model="form"
        name="email"
        type="email"
        parentClass="col-12"
        :icon="true"
      >
        <template #icon>
          <img class="width20" src="~/assets/images/Letter.svg" alt="e-mail" />
        </template>
      </FormInput>
      <div class="col-12">
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
      <FormInput
        InputClass="validated"
        @change="handleChange"
        :label="$t('form_layout.password')"
        :placeholder="$t('form_layout.enter_password')"
        :model="form"
        name="password"
        type="password"
        parentClass="col-12"
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
        parentClass="col-12"
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
      <div class="col-12">
        <div class="flex align-items-center gap5 font13">
          <FormCheckbox
            InputClass="check_valid"
            @change="handleChange($event)"
            name="is_terms"
            :model="form"
          />
          <span>{{ $t("layout.i_agree") }}</span>
          <button
            type="button"
            class="btn underline p-0 h-fit min-w-min w-fit"
            @click="
              terms_conditions = true;
              get_terms();
            "
          >
            {{ $t("layout.terms") }}
          </button>
        </div>
        <Dialog
          class="site-modal none-header"
          v-model:visible="terms_conditions"
          modal
          :style="{ width: '50vw' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        >
          <div class="container p-5">
            <div class="flex justify-content-end">
              <button class="btn btn-primary" @click="terms_conditions = false">
                {{ $t("layout.IAgree") }}
              </button>
            </div>
            <h5 class="fw-bold mb-3 text-primary">{{ $t("layout.terms") }}</h5>
            <div v-html="terms"></div>
          </div>
        </Dialog>
      </div>
      <div class="col-12">
        <button
          class="btn w-100 btn-primary mb-4 mt-3"
          :loading="loading"
          :disabled="loading === true"
        >
          <div class="d-flex align-items-center justify-content-center gap5">
            <span>{{ $t("form_layout.sign_up") }}</span>
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
    </div>
  </form>
</template>

<script setup>
// ========================================================================= imports
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
import { useAuthStore } from "~/stores/auth";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
import { validate, change_valid } from "~/utils/validation";
// ========================================================================= data
const emit = defineEmits(["activation-signup"]);
const selectedCity = ref();
const terms_conditions = ref(false);
const cities = ref([]);
const form = reactive({
  name: "",
  email: "",
  phone: "",
  Password: "",
  is_terms: "",
});
const i18n_redirected = useCookie("i18n_redirected");
const lang = i18n_redirected.value == "en-US" ? "en" : "ar";
const axios = useNuxtApp().$axios;
// const localePath = useLocalePath();
const { notify_toast } = toast_handel();
// const router = useRouter();
const authStore = useAuthStore();
const loading = ref(null);
const signUp_form = ref();
const terms = ref("");
// ========================================================================= methods
// handel change validation
const handleChange = (e) => {
  change_valid(e, t);
};
//  ================
// ===================================== get cities
const get_cities = async () => {
  axios
    .get("cities")
    .then((res) => {
      let status = response(res).status;
      let data = response(res).data;
      if (status === "success") {
        cities.value = data;
      }
    })
    .catch((e) => {
      console.error(e);
    });
};
// ======================================== select validation
const city_check = () => {
  let city_feedback = document.getElementsByClassName("city_feedback")[0];
  if (!selectedCity.value) {
    city_feedback.classList.add("valid");
    city_feedback.innerHTML = `<span>${t(`validate_msg.select_city`)}</span>`;
  } else {
    city_feedback.classList.remove("valid");
    city_feedback.innerHTML = "";
  }
};

const handelSignUp = async () => {
  loading.value = true;
  const fd = new FormData(signUp_form.value);
  if (selectedCity.value) {
    fd.append("city_id", selectedCity.value.id);
  } else {
    fd.append("city_id", "");
  }
  city_check();
  let valid = validate(signUp_form.value, t).valid;
  let valid_ruls = valid === "isValid" && selectedCity.value;
  if (valid_ruls) {
    await authStore.handelSignUp(fd);
    if (authStore.user.key == "success") {
      loading.value = false;
      notify_toast(authStore.user.msg, "success");
      emit("activation-signup");
    } else {
      loading.value = false;
      notify_toast(authStore.user.msg, "error");
    }
  } else {
    loading.value = false;
  }
};

// ===================================== terms
const get_terms = async () => {
  axios
    .get(`terms`)
    .then((res) => {
      let status = response(res).status;
      let data = response(res).data;
      if (status === "success") {
        terms.value = data;
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

// ========================================================================= lifecycle hooks
onMounted(() => {
  get_cities();
});
</script>

<style lang="scss" scoped></style>
