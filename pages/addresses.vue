<template>
    <section class="bg-lightGrayClr py-5">
        <div class="container">
            <div class="grig">
                <div class="col-12 md:col-8 lg:col-7 mx-auto bg-white position-relative main_shadow">
                    <div>
                        <button @click="address_modal = true" class="btn btn-outline-primary up height40 fw-bold"
                            style="position: absolute; right: 10px; top: 10px">{{ $t('form_layout.add_new_address')
                            }}</button>
                        <h6 class="fw-bold text-center py-4 border-bottom">{{ $t('layout.my_addresses') }}</h6>
                        <div class="flex align-items-center justify-content-center flex-column gap20 p-5">
                            <img class="w-8rem h-auto" src="~/assets/images/location.png" alt="location">
                            <div class="flex flex-column gap15 w-100">
                                <!-- :class="form.brand === item.id ? 'active' : ''" -->
                                <label class="radio-bar mb-0" v-for="item in user_addresses" :key="item">
                                    <div class="flex align-items-center gap15">
                                        <FormRadio name="address" :model="form"
                                            :isChecked="item.selected === true ? true : false" :option="item.id"
                                            @change="selectAddress(item.id)" />
                                        <div class="flex flex-column">
                                            <span>{{ item.name }}</span>
                                            <span>{{ item.map_desc }}</span>
                                        </div>
                                    </div>
                                    <div class="flex align-items-center gap15">
                                        <button class="btn p-0 border-0 min-w-min h-fit bg-transparent"
                                            @click="editAddress(item.name, item.map_desc, item.description, item.lat, item.lng, 'edit', item.id)">
                                            <img src="~/assets/images/Pen-edit.svg" alt="edit location">
                                        </button>
                                        <button class="btn p-0 border-0 min-w-min h-fit bg-transparent"
                                            @click="deleteAddress(item.id)">
                                            <img src="~/assets/images/Trash.svg" alt="remove location">
                                        </button>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <ClientOnly>
                            <Dialog class="site-modal" v-model:visible="address_modal" @hide="resetForm" modal
                                :style="{ width: '615px' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                                <template #header>
                                    <div class="border-bottom w-100 pt-2 pb-3">
                                        <h6 class="text-center fw-bold text-primary">{{ $t('form_layout.add_new_address') }}
                                        </h6>
                                    </div>
                                </template>
                                <div class="container">
                                    <form @submit.prevent="map_state === 'edit' ? edit_address() : add_address()"
                                        ref="address_form" class="flex flex-column align-items-center px-3 mx-auto">
                                        <FormInput :label="$t('form_layout.address')"
                                            :placeholder="$t('form_layout.enter_address')" :model="form" name="name"
                                            type="text" parentClass="my-3 w-100">
                                        </FormInput>
                                        <FormInput InputClass="validated height100"
                                            :label="$t('form_layout.address_description')"
                                            :placeholder="$t('form_layout.enter_address_description')" :model="form"
                                            name="description" parentClass="my-3 w-100" :textarea="true">
                                        </FormInput>

                                        <div class="w-100" v-if="address_modal">
                                            <label class="d-block mb-2 fw-bold font14 text-primary">{{
                                                $t('form_layout.location') }}</label>
                                            <div style="position: absolute;">
                                                <input hidden v-model="lat" name="lat">
                                                <input hidden v-model="lng" name="lng">
                                                <div class="feedback"></div>
                                            </div>
                                            <FormInput :placeholder="$t('form_layout.select_location')" :readonly="true"
                                                :model="form" name="map_desc" type="text" parentClass="my-3 w-100">
                                            </FormInput>
                                            <GoogleMap @change-address="handellAddress($event)" height="200px" autocomplete
                                                apiKey="AIzaSyBNLoYGrbnQI_GMqHt6m0PSN9yA7Zvq7gA" language="ar"
                                                :current-address="map_state === 'edit' ? {
                                                    geometry: {
                                                        location: { lat: lat, lng: lng }
                                                    },
                                                    formatted_address: form.map_desc
                                                } : ''" />
                                        </div>
                                        <button class="btn w-100 btn-primary mb-4 mt-3 up" :loading="loading"
                                            :disabled="loading === true">
                                            <div class="d-flex align-items-center justify-content-center gap5">
                                                <span>{{ $t('form_layout.confirm') }}</span>
                                                <div class="spinner-border spinner-border-sm"
                                                    :class="loading ? 'd-block' : 'd-none'" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                        </button>
                                    </form>
                                </div>
                            </Dialog>
                        </ClientOnly>
                    </div>
                </div>
            </div>
        </div>

</section></template>

<script setup>
// ============================================================================ imports
import GoogleMap from 'vue-google-maps-ui'
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: 'global' });
import { useAuthStore } from "~/stores/auth";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
import { validate, change_valid  } from '~/utils/validation';
// ============================================================================ data
const emit = defineEmits(['modal_changed'])
const address_modal = ref(false)
const address_form = ref(null)
const lat = ref(null)
const lng = ref(null)
const address = ref(null)
const form = reactive({
    name: '',
    description: '',
    map_desc: '',
})
const user_addresses = ref([])
const loading = ref(false)
const authStore = useAuthStore();
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
const map_state = ref('add')
const address_id = ref('')
// ============================================================================ methods
//  ====================================== handell address map
const handellAddress = (event) => {
    address.value = event.address
    form.map_desc = event.address
    lat.value = event.info.geometry.location.lat()
    lng.value = event.info.geometry.location.lng()
}
const resetForm = () => {
    form.name = ''
    form.description = ''
    form.map_desc = ''
    lat.value = null
    lng.value = null
    map_state.value = 'add'
}
//  ======================================= add address
const add_address = async () => {
    loading.value = true
    const fd = new FormData(address_form.value)
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
        get_addresses()
        emit('modal_changed')
        setTimeout(() => {
            address_modal.value = false
        }, 500);
    } else {
        loading.value = false
        notify_toast(msg, "error");
    }
}
const selectAddress = async (id) => {
    const fd = new FormData()
    fd.append('address_id', id)
    const config = {
        headers: { Authorization: `Bearer ${authStore.user.data.token}` }
    }
  const res = await axios.post('select-address', fd, config)
  let status = response(res).status
  let msg = response(res).msg
  if (status === 'success') {
    notify_toast(msg, "success");
  } else {
    notify_toast(msg, "error");
  }
}

const edit_address = async () => {
    loading.value = true
    const fd = new FormData(address_form.value)
    fd.append('map_desc', address.value)
    const config = {
        headers: { Authorization: `Bearer ${authStore.user.data.token}` }
    }
    const res = await axios.post(`update-address/${address_id.value}?_method=put`, fd, config)
    let status = response(res).status
    let msg = response(res).msg
    if (status === 'success') {
        notify_toast(msg, "success");
        loading.value = false
        get_addresses()
        emit('modal_changed')
        setTimeout(() => {
            address_modal.value = false
        }, 500);
    } else {
        loading.value = false
        notify_toast(msg, "error");
    }
}
const deleteAddress = async (id) => {
    const config = {
        headers: { Authorization: `Bearer ${authStore.user.data.token}` }
    }
    const res = await axios.delete(`delete-address/${id}`, config)
    let status = response(res).status
    let msg = response(res).msg
    if (status === 'success') {
        notify_toast(msg, "success");
    } else {
        notify_toast(msg, "error");
    }
    get_addresses()
}
// ======================================= get addresses
const get_addresses = async () => {
    const config = {
        headers: { Authorization: `Bearer ${authStore.user.data.token}` }
    }
    const res = await axios.get('user-addresses', config)
    let status = response(res).status
    let data = response(res).data
    if (status === 'success') {
        user_addresses.value = data
    }
}
// ================================= edit address
const editAddress = (name, map_desc, description, latitude, longitude, state, id) => {
    address_modal.value = true
    form.name = name
    form.description = description
    form.map_desc = map_desc
    lat.value = latitude
    lng.value = longitude
    map_state.value = state
    address_id.value = id
}
// ============================================================================ hooks
onMounted(() => {
    get_addresses()
})
</script>

<style lang="scss"></style>