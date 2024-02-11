<template>
    <div class="product-item">
        <NuxtLink :to="localPath(`/products/${id}`)">
            <div class="flex align-items-center flex-column justify-content-center w-100 gap10">
                <img :src="productImg" alt="product image">
                <span class="line-through">
                    {{ price_before }}
                </span>
                <span class="price fw-bold">
                    {{ price }}
                </span>
                <span class="product-name">
                    {{ productName }}
                </span>
                <Rating v-model="rating" class="small justify-content-end gap-1" dir="ltr" readonly :cancel="false" />
                <div>
                    {{ end_date }}
                </div>
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
    end_date: {
        type: String,
    },
    price_before: {
        type: String,
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