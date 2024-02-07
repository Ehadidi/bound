<template>
    <div class="flex flex-column align-items-center">
        <img class="w-6rem h-auto my-4" src="~/assets/images/phoneLock.png" alt="phone active">
        <form class="w-100">
            <FormInput :label="$t('form_layout.password')" :placeholder="$t('form_layout.enter_password')" :model="form"
                name="password" type="password" parentClass="my-3" :icon="true">
                <template #icon>
                    <img class="width20" src="~/assets/images/Lock.svg" alt="Lock password">
                </template>
            </FormInput>
            <FormInput :label="$t('form_layout.password')" :placeholder="$t('form_layout.re_enter_password')" :model="form"
                name="confirm_password" type="password" parentClass="my-3" :icon="true">
                <template #icon>
                    <img class="width20" src="~/assets/images/Lock.svg" alt="Lock password">
                </template>
            </FormInput>
            <div class="mt-4 mb-3">
                <button class="btn w-100 btn-primary">{{ $t('form_layout.change_password') }}</button>
            </div>
        </form>
    </div>
</template>

<script setup>
const form = reactive({
    Password: '',
    confirm_password: '',
})
</script>

<style lang="scss" scoped>

</style>