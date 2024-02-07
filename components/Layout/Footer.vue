<template>
    <footer>
        <div class="container">
            <div class="grid mt-6">
                <div class="col-12 sm:col-6 md:col-5 lg:col-4">
                    <div class="flex flex-column gap-3">
                        <img class="logo" src="~/assets/images/logo.png" alt="logo" />
                        <p class="fw-bold">
                            Founded in 2020, Bond Street is an online platform that specializes in providing rental services for a wide range of items, such as dresses and handbags.
                        </p>
                        <Divider type="solid" align="center" />
                        <div class="flex align-items-center gap-4 mt-3">
                            <a href=""><img class="width30 h-auto" src="~/assets/images/facebook.svg" alt="facebook"></a>
                            <a href=""><img class="width30 h-auto" src="~/assets/images/instegram.svg" alt="instegram"></a>
                            <a href=""><img class="width30 h-auto" src="~/assets/images/xicon.svg" alt="x"></a>
                            <a href=""><img class="width30 h-auto" src="~/assets/images/watsapp.svg" alt="watsapp"></a>
                        </div>
                    </div>
                </div>
                <div class="col-12 sm:col-6 md:col-3 lg:col-2">
                    <div class="footer-list">
                        <h5 class="text-secondary m-bottom-20 montagu">{{ $t('footer.quick_links') }}</h5>
                        <ul>
                            <li>
                                <NuxtLink class="default-link" :to="localPath('/')">{{ $t('header.home') }}</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="default-link" :to="localPath('/')">{{ $t('header.about') }}</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="default-link" :to="localPath('/')">{{ $t('header.subscription') }}
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="default-link" :to="localPath('/')">{{ $t('header.contact_us') }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 sm:col-6 md:col-4 lg:col-3">
                    <div class="footer-list">
                        <h5 class="text-secondary m-bottom-20 montagu">{{ $t('footer.contact_us') }}</h5>
                        <ul>
                            <li>
                                <span><img src="~/assets/images/location.svg" alt="location"></span>
                                <span class="fw-bold">SA, Riyadh, 99 Name St. more sample data</span>
                            </li>
                            <li>
                                <span><img src="~/assets/images/phoneIcon.svg" alt="contact us phone"></span>
                                <a href="tel:+966 1234 567" class="default-link fw-bold">+966 1234 567</a>
                            </li>
                            <li>
                                <span><img src="~/assets/images/LetterIcon.svg" alt="contact us mail"></span>
                                <a href="mailto:Sample.21@g.com" class="default-link fw-bold">Sample.21@g.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 sm:col-6 md:col-4 lg:col-3">
                    <div class="footer-list">
                        <h5 class="text-secondary m-bottom-20 montagu">{{ $t('footer.Newsletter') }}</h5>
                        <p class="fw-bold">
                            Sign up for latest updates and offers.
                        </p>
                        <form>
                            <FormInput :placeholder="$t('form_layout.enter_email')" InputClass="height40 border-0 bg-lightGrayClr" :model="form" name="email" type="email"
                                parentClass="my-3" :icon="false" :addition="true">
                                <template #addition>
                                    <button class="btn btn-primary w-fit min-w-min height40" type="submit"><img
                                            src="~/assets/images/Plain.svg" alt="send"></button>
                                </template>
                            </FormInput>
                        </form>
                        <Divider type="solid" align="center" />
                        <div class="flex align-items-center gap-2 mt-3">
                            <img class="width38 h-auto" src="~/assets/images/visa.svg" alt="visa">
                            <img class="width38 h-auto" src="~/assets/images/MasterCard.svg" alt="Master Card">
                            <img class="width38 h-auto" src="~/assets/images/applepay.svg" alt="apple pay">
                            <img class="width38 h-auto" src="~/assets/images/paypal.svg" alt="pay pal">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <span>All right reserved 2023 ®</span>
        </div>
    </footer>
</template>

<script setup>
const localPath = useLocalePath();
const form = reactive({
    email: '',
})
</script>

<style lang="scss" scoped></style>