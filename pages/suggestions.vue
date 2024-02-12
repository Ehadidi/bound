<template>
    <div class="bg-sectionBg py-5">
        <div class="container">
            <div class="grid">
                <div class="col-12 md:col-6">
                    <h6 class="mb-3 sub-title">{{ $t('header.contact_us') }}</h6>
                    <span class="montagu mb-0 font30 d-block text-primary">{{$t('header.suggestionsComplains')}}</span>
                    <form ref="suggestionsForm" @submit.prevent="suggestionsFunc">
                        <FormInput InputClass="validated" @change="change_valid" :label="$t('form_layout.name')"
                            :placeholder="$t('form_layout.enter_name')" :model="form" name="user_name" type="text"
                            parentClass="my-3" :icon="false" :addition="false">
                        </FormInput>

                        <FormInput InputClass="validated" @change="change_valid" :label="$t('form_layout.phone')"
                            :placeholder="$t('form_layout.enter_phone')" :model="form" name="phone" type="number"
                            parentClass="my-3" :icon="true" :addition="true">
                            <template #icon>
                                <img class="width20" src="~/assets/images/phone.svg" alt="phone">
                            </template>
                            <template #addition>
                                <div class="flex align-items-center gap5 height50 px-2">
                                    <input style="background-color: transparent;" class="width40 height50 border-0 font13"
                                        readonly type="text" name="country_code" value="966">
                                    <img class="width20" src="~/assets/images/soud_flag.svg" alt="flag ksa">
                                </div>
                            </template>
                        </FormInput>

                        <label class="d-block mb-2 fw-bold font14 text-primary">{{ $t('form_layout.subject') }}</label>
                        <div class="mb-3">
                            <Dropdown v-model="complaintSelected" :options="options" optionLabel="name"
                                :placeholder="$t('layout.choose_category')" class="w-full px-1" />
                        </div>

                        <FormInput InputClass="validated height120" @change="change_valid" :textarea="true"
                            :label="$t('form_layout.message')" :placeholder="$t('form_layout.enter_message')" :model="form"
                            name="complaint" type="text" parentClass="my-3" :icon="true">
                            <template #icon>
                                <img class="width20" src="~/assets/images/Letter.svg" alt="phone">
                            </template>
                        </FormInput>
                        <!-- <button class="btn btn-primary my-3 up">{{ $t('layout.send') }}</button> -->

                        <button class="btn btn-primary my-3 up" :loading="loading" :disabled="loading === true">
                            <div class="d-flex align-items-center justify-content-center gap5">
                                <span>{{ $t('layout.send') }}</span>
                                <div class="spinner-border spinner-border-sm" :class="loading ? 'd-block' : 'd-none'"
                                    role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>

                            </div>
                        </button>
                    </form>
                </div>
                <div class="col-12 md:col-6">
                    <div class="position-relative">
                        <MapJsMapCard />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// ======================================================================== imports
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: 'global' });
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
import { validate, change_valid } from "~/validation/validation";
import { useAuthStore } from "~/stores/auth";
// ======================================================================== data
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
const loading = ref(null);

const authStore = useAuthStore();

// options
const options = ref([
    { name: t('form_layout.complaint'), id: 1 },
    { name: t('form_layout.suggestion'), id: 2 },
]);

// complaintSelected
const complaintSelected = ref({ name: t('form_layout.complaint'), id: 1 });

const suggestionsForm = ref()
const form = reactive({
    user_name: '',
    phone: '',
    subject: '',
    complaint: ''
});

// config
const config = {
    headers: { Authorization: `Bearer ${authStore.user.data.token}` }
};
// ======================================================================== methods
const suggestionsFunc = async () => {
    loading.value = true;
    const fd = new FormData(suggestionsForm.value);

    fd.append('subject', complaintSelected.value.name);

    let valid = validate(suggestionsForm.value).valid;
    let valid_ruls = valid === "isValid"
    if (valid_ruls) {
        const res = await axios.post('new-complaint', fd, config);
        let status = response(res).status;
        let msg = response(res).msg;
        if (status === "success") {
            loading.value = false;
            notify_toast(msg, "success");
            suggestionsForm.value.reset();
        } else {
            loading.value = false;
            notify_toast(msg, "error");
        }
    } else {
        notify_toast(t(`validate_msg.uncomplete`), "error");
        loading.value = false;
    }
}

// ======================================================================== lifecycle

</script>

<style lang="scss" scoped></style>