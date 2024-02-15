<template>
    <section class="bg-lightGrayClr py-5">
        <div class="container">
            <div class="grid">
                <div class="col-12 md:col-8 lg:col-7 mx-auto">
                    <div class="bg-white border">
                        <h6 class="fw-bold text-center py-3 border-bottom">{{ $t('layout.wallet') }}</h6>
                        <div class="container">
                            <div class="flex align-items-center justify-content-center flex-column gap20 p-5">
                                <img class="w-12rem h-auto" src="~/assets/images/payWallet.png" alt="pay icon">
                                <span class="fw-bold text-primary">{{ $t('layout.current_balance') }}</span>
                                <span class="fw-bold text-primary font30">{{ wallet.available_balance }} {{ wallet.currency }}</span>
                                <button class="btn btn-primary w-100" @click="charge_wallet_modal = true">
                                    <div class="flex align-items-center gap5">
                                        <img class="width25 h-auto" src="~/assets/images/ChatMoney.png"
                                            alt="cach money pay">
                                        <span>{{ $t('layout.charge_wallet') }}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Dialog class="site-modal" v-model:visible="charge_wallet_modal" modal :style="{ width: '615px' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
                <div class="border-bottom w-100 pt-2 pb-3">
                    <h6 class="text-center fw-bold text-primary">{{ $t('layout.charge_my_wallet') }}</h6>
                </div>
            </template>
            <div class="container">
                <form @submit.prevent="charge_wallet" ref="charge_wallet_form" class="flex flex-column align-items-center px-3 mx-auto">
                    <FormInput :label="$t('form_layout.amount')" :placeholder="$t('form_layout.enter_amount')" :model="form"
                        name="amount" type="number" parentClass="my-3 w-100">
                    </FormInput>

                    <div class="flex flex-column gap15 w-100">
                        <label class="payment mb-0" v-for="item in brands" :key="item" :class="form.brand === item.id ? 'active' : ''">
                            <div class="flex align-items-center gap15">
                                <FormRadio name="brand" :model="form" :option="item.id" />
                                <span>{{ item.name }}</span>
                            </div>
                            <img class="w-auto height30" :src="item.image" :alt="item.name">
                        </label>
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
    </section>
</template>

<script setup>
// =============================================================================== imports
import { useAuthStore } from "~/stores/auth";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
// =============================================================================== data
const authStore = useAuthStore();
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
const charge_wallet_modal = ref(false)
const form = reactive({
    amount: '',
    brand: '',
})
const brands = ref([])
const loading = ref(false)
const wallet = ref({})
const charge_wallet_form = ref(null)
// =============================================================================== methods
// ========================================== get payment brands
const get_payment_brands = async () => {
    const config = {
        headers: { Authorization: `Bearer ${authStore.user.data.token}` }
    }
    const res = await axios.get('payment-brands', config)
    let status = response(res).status
    let data = response(res).data
    if (status === 'success') {
        brands.value = data.payment_brands
    }
}
//  ======================================== get wallet
const get_wallet = async () => {
    const config = {
        headers: { Authorization: `Bearer ${authStore.user.data.token}` }
    }
    const res = await axios.get('show-wallet', config)
    let status = response(res).status
    let data = response(res).data
    if (status === 'success') {
        wallet.value = data
        console.log(wallet.value);
    }
}

// ================================ charge wallet
const charge_wallet = async () => {
    loading.value = true
    const fd = new FormData(charge_wallet_form.value)
    const config = {
        headers: { Authorization: `Bearer ${authStore.user.data.token}` }
    }
    const res = await axios.post('charge-wallet', fd, config)
    let status = response(res).status
    let msg = response(res).msg
    if (status === 'success') {
        notify_toast(msg, 'success')
        get_wallet()
        charge_wallet_modal.value = false
        loading.value = false
    } else {
        notify_toast(msg, 'error')
        loading.value = false
    }
    
}

// =============================================================================== lifecycle
onMounted(() => {
    get_wallet()
    get_payment_brands()
})
</script>

<style lang="scss" scoped></style>