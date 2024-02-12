<template>
    <section class="bg-lightGrayClr py-5">
        <div class="container">
            <div class="grig">
                <div class="col-12 md:col-8 lg:col-7 mx-auto">
                    <h5 class="fw-bold text-start py-3">{{ $t('layout.profile_settings') }}</h5>
                </div>
                <div class="col-12 md:col-8 lg:col-7 mx-auto bg-white">
                    <form @submit.prevent="edit_profile" ref="edit_form" style="max-width: 90%" class="mx-auto py-3">
                        <FormInput :label="$t('form_layout.user_name')" :placeholder="$t('form_layout.enter_user_name')"
                            :model="form" name="name" type="text" parentClass="w-100 my-3" :icon="true">
                            <template #icon>
                                <img class="width20" src="~/assets/images/User.svg" alt="user name">
                            </template>
                        </FormInput>
                        <FormInput :label="$t('form_layout.email')" :placeholder="$t('form_layout.enter_email')"
                            :model="form" name="email" type="email" parentClass="w-100 my-3" :icon="true">
                            <template #icon>
                                <img class="width20" src="~/assets/images/Letter.svg" alt="e-mail">
                            </template>
                        </FormInput>
                        <div class="w-100 my-3">
                            <label class="fw-bold txt_start d-block mb-2">{{ $t('form_layout.City') }}</label>
                            <div class="form-inputs">
                                <Dropdown filter @change="city_check" v-model="selectedCity"
                                    :emptyFilterMessage="$t('validate_msg.emptyFilterMessage')"
                                    :emptyMessage="$t('validate_msg.emptyFilterMessage')" :options="cities"
                                    optionLabel="name" :placeholder="$t('form_layout.ChooseCity')" class="w-full" />
                                <span class="form-icon">
                                    <img src="~/assets/images/GPS.svg" alt="location">
                                </span>
                                <div class="feedback city_feedback"></div>
                            </div>
                        </div>
                        <button class="btn w-100 btn-primary my-3" :loading="loading" :disabled="loading === true">
                            <div class="d-flex align-items-center justify-content-center gap5">
                                <span>{{ $t('form_layout.save_changes') }}</span>
                                <div class="spinner-border spinner-border-sm" :class="loading ? 'd-block' : 'd-none'"
                                    role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        </button>
                        <div class="grid">
                            <div class="col-12 md:col-6">
                                <button class="btn btn-outline-primary up w-100" @click="delete_account">{{ $t('form_layout.change_phone') }}</button>
                            </div>
                            <div class="col-12 md:col-6">
                                <button class="btn btn-outline-primary up w-100" @click="delete_account">{{ $t('form_layout.change_password') }}</button>
                            </div>
                            <div class="col-12">
                                <button class="btn text-danger fw-bold w-100 flex gap3 align-items-center" @click="delete_account">
                                    <i class="pi pi-trash"></i>
                                    <span>{{ $t('form_layout.delete_account') }}</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
// ============================================================================== imports
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: 'global' });
import { useAuthStore } from "~/stores/auth";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";

// ============================================================================== data
const authStore = useAuthStore();
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
const edit_form = ref()
const form = reactive({
    name: '',
    email: '',
})
const selectedCity = ref()
const cities = ref([])
const loading = ref(false)
// ============================================================================== methods
// ===================================== get cities
const get_cities = async () => {
    const res = await axios.get('cities')
    let status = response(res).status
    let data = response(res).data
    if (status === 'success') {
        cities.value = data
    }
}
//  ================================= get profile data
const get_profile = async () => {
    const config = {
        headers: { Authorization: `Bearer ${authStore.user.data.token}` }
    }
    const res = await axios.get('profile', config)
    let status = response(res).status
    let data = response(res).data
    if (status === 'success') {
        form.name = data.name
        form.email = data.email
        selectedCity.value = {"id": data.city_id ,"name": `${data.city}` }
        
    }
}
//  ================================= edit profile
const edit_profile = async () => {
    loading.value = true
    const fd = new FormData(edit_form.value)
    fd.append("city_id", selectedCity.value.id)
    const config = {
        headers: { Authorization: `Bearer ${authStore.user.data.token}`}
    }
    const res = await axios.post('update-profile?_method=put', fd , config)
    let status = response(res).status
    let msg = response(res).msg
    if (status === 'success') {
        loading.value = false
        notify_toast(msg , "success");
        get_profile()
    } else {
        loading.value = false
        notify_toast(msg , "error");
    }
}
// ============================================================================== lifecycle
onMounted(() => {
    get_profile()
    get_cities()
})
</script>

<style lang="scss" scoped></style>