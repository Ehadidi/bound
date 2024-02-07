<template>
    <div class="container">
        <div class="grid">
            <div class="col-12 md:col-6">
                <h6 class="mb-3 sub-title">{{ $t('header.contact_us') }}</h6>
                <span class="montagu mb-0 font30 d-block text-primary">Get In Touch With Us</span>
                <form>
                    <FormInput :label="$t('form_layout.name')" :placeholder="$t('form_layout.enter_name')" :model="form"
                        name="name" type="text" parentClass="my-3" :icon="false" :addition="false">
                    </FormInput>
                    <FormInput :label="$t('form_layout.phone')" :placeholder="$t('form_layout.enter_phone')" :model="form"
                        name="phone" type="number" parentClass="my-3" :icon="true" :addition="true">
                        <template #icon>
                            <img class="width20" src="~/assets/images/phone.svg" alt="phone">
                        </template>
                        <template #addition>
                            <Dropdown v-model="selectedId" placeholder="+20" :options="contryId" optionLabel="key"
                                class="width60 code" />
                        </template>
                    </FormInput>
                    <FormInput :label="$t('form_layout.subject')" :placeholder="$t('form_layout.enter_subject')"
                        :model="form" name="subject" type="text" parentClass="my-3" :icon="false" :addition="false">
                    </FormInput>
                    <FormInput :textarea="true" :label="$t('form_layout.message')"
                        :placeholder="$t('form_layout.enter_message')" :model="form" name="message" InputClass="height120"
                        type="text" parentClass="my-3" :icon="true">
                        <template #icon>
                            <img class="width20" src="~/assets/images/Letter.svg" alt="phone">
                        </template>
                    </FormInput>
                    <button class="btn btn-primary my-3 up">{{ $t('layout.send') }}</button>
                </form>
            </div>
            <div class="col-12 md:col-6">
                <div class="position-relative">
                    <MapJsMapCard />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// import GoogleMap from 'vue-google-maps-ui'
const selectedId = ref({ id: 2, name: 'مصر', key: "+20" })
const contryId = ref([])
const form = reactive({
    name: '',
    phone: '',
    subject: '',
    message: ''
})
</script>

<style lang="scss" scoped></style>