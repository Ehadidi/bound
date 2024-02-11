<template>
    <div class="container">
        <div class="grid">
            <div class="col-12 md:col-6">
                <h6 class="mb-3 sub-title">{{ $t('header.contact_us') }}</h6>
                <span class="montagu mb-0 font30 d-block text-primary">Get In Touch With Us</span>
                <form ref="contactForm" @submit.prevent="contact_us">
                    <FormInput InputClass="validated" @change="change_valid" :label="$t('form_layout.name')"
                        :placeholder="$t('form_layout.enter_name')" :model="form" name="name" type="text" parentClass="my-3"
                        :icon="false" :addition="false">
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
                    <FormInput InputClass="validated" @change="change_valid" :label="$t('form_layout.subject')"
                        :placeholder="$t('form_layout.enter_subject')" :model="form" name="subject" type="text"
                        parentClass="my-3" :icon="false" :addition="false">
                    </FormInput>
                    <FormInput InputClass="validated height120" @change="change_valid" :textarea="true"
                        :label="$t('form_layout.message')" :placeholder="$t('form_layout.enter_message')" :model="form"
                        name="message" type="text" parentClass="my-3" :icon="true">
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
</template>

<script setup>
// ======================================================================== imports
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: 'global' });
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
import { validate, change_valid } from "~/validation/validation";
// ======================================================================== data
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
const loading = ref(null);
const contactForm = ref()
const form = reactive({
    name: '',
    phone: '',
    subject: '',
    message: ''
})
// ======================================================================== methods
const contact_us = async () => {
    loading.value = true;
    const fd = new FormData(contactForm.value);
    let valid = validate(contactForm.value).valid;
    let valid_ruls = valid === "isValid"
    if (valid_ruls) {
        const res = await axios.post('new-contact', fd);
        let status = response(res).status;
        let msg = response(res).msg;
        if (status === "success") {
            loading.value = false;
            notify_toast(msg, "success");
            contactForm.value.reset();
            emit('login_success')

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