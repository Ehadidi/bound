<template>
    <section class="bg-lightGrayClr py-5">
        <div class="container">
            <div class="grid">
                <div class="col-12 md:col-8 lg:col-7 mx-auto">
                    <h6 class="fw-bold text-start">
                        {{ $t("layout.rate_products") }}
                    </h6>
                </div>
                <div class="col-12 md:col-8 lg:col-7 mx-auto bg-white main_shadow p-0">
                    <div v-for="(item, index) in products" :key="index"
                        class="flex align-items-center justify-content-between flex-wrap p-3 border-bottom">
                        <div class="flex align-items-center gap20">
                            <img class="width100 height150" style="object-fit: cover;" :src="item.product_image" :alt="item.product_name">
                            <div class="flex flex-column align-items-start gap10">
                                <span class="font15 fw-bold">{{ item.product_name }}</span>
                                <span>{{ item.price_per_day }}</span>
                            </div>
                        </div>
                        <div class="rating">
                            <!-- <Rating v-model="rating" :cancel="false" /> -->
                            <Rating v-model="item.rate" :cancel="false"
                                @change="rate_items_push(item.product_id, item.rate)">
                                <template #onicon>
                                    <img src="~/assets/images/star_on.svg" height="24" width="24" />
                                </template>
                                <template #officon>
                                    <img src="~/assets/images/star_off.svg" height="24" width="24" />
                                </template>
                            </Rating>
                        </div>
                    </div>
                </div>
                <div class="col-12 md:col-8 lg:col-7 mx-auto">
                    <button class="btn btn-primary mx-auto" @click="confirm_rating">{{ $t("layout.confirm_rate") }}</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
// ================================================================================ imports
import { useAuthStore } from "~/stores/auth";
import { response } from "~/network/response";
import { toast_handel } from "~/network/ValidTost";
import { useI18n } from "vue-i18n";
// ================================================================================ data
const localPath = useLocalePath();
const authStore = useAuthStore();
const { t } = useI18n();
const axios = useNuxtApp().$axios;
const { notify_toast } = toast_handel();
const route = useRoute();
const products = ref([]);
const ratings = reactive({});
const product_rates = ref([]);
// ================================================================================== methods
const show_ratings = async () => {
    const res = await axios.get(`show-rate/${route.params.id}`);
    let status = response(res).status;
    let data = response(res).data;
    let msg = response(res).msg;
    if (status === "success") {
        products.value = data.products;
        // ratings.value = data.products.rate
    } else {
        notify_toast(msg, "error");
    }
}
const confirm_rating = async () => {
    const fd = new FormData();
    fd.append("order_id", route.params.id);
    fd.append("product-rates", JSON.stringify(product_rates.value));
    const res = await axios.post(`add-rate` , fd);
    let status = response(res).status;
    let msg = response(res).msg;
    if (status === "success") {
        notify_toast(msg, "success");
        show_ratings()
    } else {
        notify_toast(msg, "error");
    }
}

const rate_items_push = (product_id, rate) => {
    const index = product_rates.value.findIndex(
        (product) => product.product_id === product_id
    );
    if (index !== -1) {
        product_rates.value[index].rate = rate;
    } else {
        product_rates.value.push({ product_id: product_id, rate: rate });
    }
}
// ==================================================================================== mounted
onMounted(() => {
    show_ratings()
})
</script>

<style lang="scss" scoped></style>