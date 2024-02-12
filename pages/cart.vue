<template>
    <div class="bg-sectionBg">

        <div class="py-6">
            <div class="container">
                <div class="row">

                    <div class="col-xl-8 col-lg-7">

                        <h6 class="mb-3 fs-6">{{ $t('cart.items') }}</h6>

                        <div class="bg-white py-4 px-3 main_shadow">

                            <div class="scroll_y">
                                <div class="cart_item" v-for="item in cartItems" :key="item.id">

                                    <div class="left">
                                        <button type="button" class="btn_remove">
                                            <img src="~/assets/images/Trash.png" alt="cart" class="ic">
                                        </button>
                                        <img :src="item.image" alt="" class="cart_pro_img">

                                        <div class="product_info">
                                            <h6 class="name">{{ item.name }}</h6>
                                            <span class="info">{{ item.price }}</span>
                                            <span class="info">{{ item.date }}</span>
                                            <span class="info">{{ item.size }}</span>
                                        </div>
                                    </div>

                                    <div class="right">
                                        <div class="cart_text mb-2">
                                            <span>{{ $t('cart.rentingCost') }}: </span>

                                            <span>750 SAR</span>
                                        </div>
                                        <div class="cart_text">
                                            <span>{{ $t('cart.deposit') }}: </span>

                                            <div class="d-flex align-items-center gap-2">
                                                <span>250 SAR</span>
                                                <img src="~/assets/images/info.png"
                                                    v-tooltip.bottom="$t('cart.depositInfo')"
                                                    alt="" class="icon">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                    <form class="col-xl-4 col-lg-5">
                        <h6 class="mb-3 fs-6">{{ $t('cart.details') }}</h6>

                        <div class="bg-white py-4 px-3 main_shadow mb-4">

                            <div class="mb-3">
                                <label class="d-block mb-2 font13 text-label">{{ $t('cart.paymentMethod') }}</label>

                                <div class="payment-items">

                                    <label :for="`payment${i}`" class="payment-item" v-for="(pay, i) in paymentItems"
                                        :key="pay.id">

                                        <input type="radio" name="pay_type" :value="pay.id" v-model="payment"
                                            :id="`payment${i}`" class="payment-input">
                                        <div class="payment-label">

                                            <img :src="pay.icon" alt="" class="ic">
                                            <div class="name">{{ pay.name }}</div>

                                            <i class="fa-solid fa-circle-check circle"></i>

                                        </div>

                                    </label>

                                </div>
                            </div>

                            <FormInput :label2="$t('cart.location')" :placeholder="$t('cart.location')" :model="form"
                                name="subject" type="text" parentClass="my-3" :icon="true">
                                <template #icon>
                                    <img class="width20" src="~/assets/images/GPS.svg" alt="phone">
                                </template>
                            </FormInput>

                            <FormInput :textarea="true" :label2="$t('cart.other')" :placeholder="$t('cart.other')"
                                :model="form" name="detailes" InputClass="height120" type="text">
                            </FormInput>

                        </div>

                        <h6 class="mb-3 fs-6">{{ $t('cart.paymentDetails') }}</h6>

                        <div class="bg-white p-4 main_shadow">

                            <div class="cart_text mb-2">
                                <span>{{ $t('cart.rentingCost') }}: </span>
                                <span>750 SAR</span>
                            </div>

                            <div class="cart_text mb-2">
                                <div class="d-flex align-items-center gap-2">
                                    <span>{{ $t('cart.deposit') }}: </span>
                                    <img src="~/assets/images/info.png"
                                        v-tooltip.bottom="'will be Refunded after we retrieve the product'" alt=""
                                        class="icon">
                                </div>
                                <span>250 SAR</span>
                            </div>

                            <div class="cart_text mb-2">
                                <span>{{ $t('cart.delivery') }}: </span>
                                <span>250 SAR</span>
                            </div>

                            <hr />

                            <div class="cart_text total mb-3">
                                <span>{{ $t('cart.total') }}: </span>
                                <span>1000 SAR</span>
                            </div>

                            <button type="button" class="btn btn-primary ms-auto gap-2" @click="success_modal = true">
                                {{ $t('cart.sendOrder') }}
                                <img src="~/assets/images/ArrowRight.svg" class="ic" alt="">
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>

    </div>

    <!-- Success Modal -->
    <Dialog class="site-modal none-header" v-model:visible="success_modal" modal :style="{ width: '20rem' }">
        <div class="container">
            <div class="flex justify-content-center align-items-center flex-column py-5 gap30">
                <img src="~/assets/images/success.svg" class="w-25 h-auto" alt="">
                <h5 class="text-center fw-bold text-primary fw-bold fs-6">
                    {{ $t('cart.done.text') }}
                </h5>

                <div class="d-flex gap-2">
                    <NuxtLink :to="localPath('/')" class="btn sm transparent btn-primary">
                        {{ $t('cart.done.home') }}
                    </NuxtLink>
                    <NuxtLink to="/my-orders" class="btn sm btn-primary">
                        {{ $t('cart.done.myOrders') }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script setup>

// ================================================================================ imports
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

// ================================================================================ data
const localPath = useLocalePath();

// pay Icons
import pay1 from '~/assets/images/payment.png'
import pay2 from '~/assets/images/wallet.png'

// success_modal
const success_modal = ref(false);

// form
const form = reactive({
    detailes: '',
});

// PayMent
const payment = ref(0);
const paymentItems = ref([
    {
        id: 1,
        icon: pay1,
        name:  t('cart.payment.online'),
    },
    {
        id: 2,
        icon: pay2,
        name:  t('cart.payment.wallet'),
    },
]);

// cartItems
const cartItems = ref([
    {
        id: 1,
        image: 'https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png',
        name: 'Product Name Goes Here',
        price: '250 / Day',
        date: '20 November 2023  To  23 November (3 Days)',
        size: 'XL , Red'
    },
    {
        id: 1,
        image: 'https://www.freepnglogos.com/uploads/women-bag-png/women-bag-png-transparent-images-download-clip-4.png',
        name: 'Product Name Goes Here',
        price: '250 / Day',
        date: '20 November 2023  To  23 November (3 Days)',
        size: 'XL , Red'
    },
    {
        id: 1,
        image: 'https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png',
        name: 'Product Name Goes Here',
        price: '250 / Day',
        date: '20 November 2023  To  23 November (3 Days)',
        size: 'XL , Red'
    },
    {
        id: 1,
        image: 'https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png',
        name: 'Product Name Goes Here',
        price: '250 / Day',
        date: '20 November 2023  To  23 November (3 Days)',
        size: 'XL , Red'
    },
    {
        id: 1,
        image: 'https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png',
        name: 'Product Name Goes Here',
        price: '250 / Day',
        date: '20 November 2023  To  23 November (3 Days)',
        size: 'XL , Red'
    },
]);

// ================================================================================ methods

// ================================================================================ lifecycle hooks

</script>

<style scoped></style>
