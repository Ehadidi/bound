<template>
    <section class="main-sec">
        <div class="container">
            <div class="sec-title">
                <h2 class="title">{{ $t('header.subscription') }}</h2>
                <div class="text-bg"><img src="~/assets/images/Subscription-text.png" alt="subscription"></div>
            </div>
            <div class="grid">
                <div v-for="item in subscriptions" :key="item" class="col-12 md:col-6 lg:col-4">
                    <div class="subscription-card">
                        <div class="sub-head">
                            <div class="flex flex-column font18">
                                <span class="fw-bold">{{ item.period }}</span>
                                <span class="montagu fw-bold">{{ item.name }}</span>
                            </div>
                            <div class="price-circle">
                                <span>{{ item.price }}</span>
                                <span>SAR</span>
                            </div>
                        </div>
                        <div class="sub-desc">
                            <div class="fw-medium" v-html="item.description">
                            </div>
                        </div>
                        <!-- <div class="sub-adv">
                            <ul>
                                <li>
                                    <div class="flex align-items-center gap10">
                                        <img src="~/assets/images/check.svg" alt="check">
                                        <span>Exclusive Products</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="flex align-items-center gap10">
                                        <img src="~/assets/images/check.svg" alt="check">
                                        <span>No insurance fees</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="flex align-items-center gap10">
                                        <img src="~/assets/images/check.svg" alt="check">
                                        <span>Big sale on renting items</span>
                                    </div>
                                </li>
                            </ul>
                        </div> -->
                        <div class="sub-btn">
                            <img class="logo-brand" src="~/assets/images/logo-vector.png" alt="logo">
                            <NuxtLink class="default-link arrow-btn" :to="localPath('/')">
                                <div class="d-flex align-items-center gap10">
                                    <span>{{ $t('layout.subscribe_now') }}</span>
                                    <img src="~/assets/images/ArrowRight.svg" alt="arrow">
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<script setup>
// ========================================================================== imports
import { response } from "~/network/response";
import { useAuthStore } from "~/stores/auth";
// ========================================================================== data
const localPath = useLocalePath();
const axios = useNuxtApp().$axios;
const subscriptions = ref([])
const authStore = useAuthStore();
// ========================================================================== methods
const get_subscriptions = async () => {
    let config = ''
    if (authStore.user) {
        config = {
            headers: { Authorization: `Bearer ${authStore.user.data.token}` }
        }
    }   
    const res = await axios.get('packages', config)
    let statuts = response(res).status
    let data = response(res).data
    if (statuts === 'success') {
        subscriptions.value = data
        console.log(subscriptions.value);
    }
}
// ========================================================================== hooks
onMounted(() => {
    get_subscriptions()
})
</script>

<style lang="scss" scoped></style>