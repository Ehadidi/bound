<template>
    <div style="display: flex; flex-direction: row">
        <v-otp-input ref="otpInput" v-model:value="bindModal" input-classes="otp-input" separator="-" :num-inputs="4"
            :should-auto-focus="true" input-type="letter-numeric" :conditionalClass="['one', 'two', 'three', 'four']"
            :placeholder="['*', '*', '*', '*']" @on-change="handleOnChange" @on-complete="handleOnComplete" />
    </div>
    <button @click="clearInput()">Clear Input</button>
    <button @click="fillInput('2929')">Fill Input</button>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
}

/* Background colour of an input field with value */
.otp-input.is-complete {
    background-color: #e4e4e4;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input::placeholder {
    font-size: 15px;
    text-align: center;
    font-weight: 600;
}
</style>