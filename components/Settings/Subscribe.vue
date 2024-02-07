<template>
    <section class="main-sec">
        <div class="container">
            <div class="sec-title">
                <h2 class="title">{{ $t('header.subscription') }}</h2>
                <div class="text-bg"><img src="~/assets/images/Subscription-text.png" alt="subscription"></div>
            </div>
            <div class="grid">
                <div v-for="i in 3" :key="i" class="col-12 md:col-6 lg:col-4">
                    <div class="subscription-card">
                        <div class="sub-head">
                            <div class="flex flex-column font18">
                                <span class="fw-bold">month subscription</span>
                                <span class="montagu fw-bold">Name Goes here</span>
                            </div>
                            <div class="price-circle">
                                <span>250</span>
                                <span>SAR</span>
                            </div>
                        </div>
                        <div class="sub-desc">
                            <p class="fw-medium">
                                Lorem ipsum dolor sit met consectetur. vel dial frangula nullar orcin incidents.
                            </p>
                        </div>
                        <div class="sub-adv">
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
                        </div>
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
const localPath = useLocalePath();
</script>

<style lang="scss" scoped></style>