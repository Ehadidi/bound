<template>
    <div class="product-item">
        <NuxtLink :to="localPath('/')">
            <div class="flex align-items-center flex-column justify-content-center w-100 gap10">
                <img :src="productImg" alt="handbag">
                <span class="price fw-bold">
                    {{ price }}
                </span>
                <span class="product-name">
                    {{ productName }}
                </span>
                <!-- <v-rating density="compact" v-model="rating" readonly hover half-increments></v-rating> -->
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
const props = defineProps({
    price: {
        type: String,
        default: '250 SAR'
    },
    productName: {
        type: String,
        default: 'Handbag'
    },
    rate: {
        type: Number,
        default: 3
    },
    productImg: {
        type: String,
        // default: '~/assets/images/product-2.png'
    },
    id: {
        type: String,
        default: '1'
    }
})
const localPath = useLocalePath();
const rating = ref(props.rate)
</script>

<style lang="scss" scoped></style>