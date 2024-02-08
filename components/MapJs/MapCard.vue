<template>
    <GoogleMap api-key="AIzaSyBNLoYGrbnQI_GMqHt6m0PSN9yA7Zvq7gA" autocomplete style="width: 100%; height: 600px" :center="center"
        :zoom="11">
        <Marker :options="markerOptions" />
    </GoogleMap>
</template>

<script setup>
import { GoogleMap, Marker } from "vue3-google-map";
const center = { lat: 24.7136, lng: 46.6753 };
const markerOptions = { position: center }


</script>

<style lang="scss" scoped></style>