<template>
    <div>
        <h1 style="text-align: center;">products details {{ id }}</h1>
    </div>
</template>

<script setup>
const { id }  = useRoute().params
</script>

<style scoped>

</style>