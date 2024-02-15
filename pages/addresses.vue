<template>
    <section class="bg-lightGrayClr py-5">
        <div class="container">
            <div class="grig">
                <div class="col-12 md:col-8 lg:col-7 mx-auto bg-white position-relative">
                    <button @click="add_address_modal = true" class="btn btn-outline-primary up height40 fw-bold"
                        style="position: absolute; right: 10px; top: 10px">{{ $t('form_layout.add_new_address') }}</button>
                    <h6 class="fw-bold text-center py-3 border-bottom">{{ $t('layout.my_addresses') }}</h6>
                    <div class="flex align-items-center justify-content-center flex-column gap20 p-5">
                        <img class="w-8rem h-auto" src="~/assets/images/location.png" alt="location">
                    </div>
                </div>
            </div>
        </div>
        <ClientOnly>
            <Dialog class="site-modal" v-model:visible="add_address_modal" modal :style="{ width: '615px' }"
                :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                <template #header>
                    <div class="border-bottom w-100 pt-2 pb-3">
                        <h6 class="text-center fw-bold text-primary">{{ $t('layout.charge_my_wallet') }}</h6>
                    </div>
                </template>
                <div class="container">
                    <form @submit.prevent="add_address" ref="add_address_form"
                        class="flex flex-column align-items-center px-3 mx-auto">
                        <FormInput :label="$t('form_layout.address')" :placeholder="$t('form_layout.enter_address')"
                            :model="form" name="name" type="text" parentClass="my-3 w-100">
                        </FormInput>
                        <FormInput InputClass="validated height100" :label="$t('form_layout.address_description')"
                            :placeholder="$t('form_layout.enter_address_description')" :model="form" name="description"
                            parentClass="my-3 w-100" :textarea="true">
                        </FormInput>

                        <div class="w-100">
                            <label class="d-block mb-2 fw-bold font14 text-primary">{{ $t('form_layout.location') }}</label>
                            <div style="position: absolute;">
                                <input hidden v-model="lat" name="lat">
                                <input hidden v-model="lng" name="lng">
                                <div class="feedback"></div>
                            </div>
                            <GoogleMap @change-address="handellAddress($event)" height="200px" autocomplete
                                apiKey="AIzaSyBNLoYGrbnQI_GMqHt6m0PSN9yA7Zvq7gA" language="ar" />
                        </div>
                        <button class="btn w-100 btn-primary mb-4 mt-3 up" :loading="loading" :disabled="loading === true">
                            <div class="d-flex align-items-center justify-content-center gap5">
                                <span>{{ $t('form_layout.confirm_payment') }}</span>
                                <div class="spinner-border spinner-border-sm" :class="loading ? 'd-block' : 'd-none'"
                                    role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        </button>
                    </form>
                </div>
            </Dialog>
        </ClientOnly>
    </section>
</template>

<script setup>
// ============================================================================ imports
import GoogleMap from 'vue-google-maps-ui'
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: 'global' });
import { useAuthStore } from "~/stores/auth";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
import { validate, change_valid } from "~/validation/validation";
// ============================================================================ data
const add_address_modal = ref(false)
const add_address_form = ref(null)
const form = reactive({
    name: '',
    description: '',
})
const lat = ref(null)
const lng = ref(null)
const address = ref(null)
const loading = ref(false)
const authStore = useAuthStore();
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
// ============================================================================ methods
//  ====================================== handell address map
const handellAddress = (event) => {
    address.value = event.address
    lat.value = event.info.geometry.location.lat()
    lng.value = event.info.geometry.location.lng()
}
//  ======================================= add address
const add_address = async () => {
    loading.value = true
    const fd = new FormData(add_address_form.value)
    console.log(address.value);
    fd.append('map_desc', address.value)
    const config = {
        headers: { Authorization: `Bearer ${authStore.user.data.token}` }
    }
    const res = await axios.post('add-address', fd, config)
    let status = response(res).status
    let msg = response(res).msg
    if (status === 'success') {
        notify_toast(msg, "success");
        loading.value = false
        add_address_form.value.reset()
        setTimeout(() => {
            add_address_modal.value = false
        }, 500);
    } else {
        loading.value = false
        notify_toast(msg, "error");
    }
}
// ============================================================================ hooks
</script>

<style lang="scss">
.GoogleMap {
    background-color: #fff !important;

    .SearchArea {
        border-radius: 0 !important;
        margin-bottom: 10px;

        input {
            height: 50px !important;
        }
    }
}
.pac-container {
    z-index: 9999 !important;
}
</style>