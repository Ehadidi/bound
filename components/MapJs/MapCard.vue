<template>
  <ClientOnly>
    <div class="position-relative">
      <div class="map-overlay"></div>
      <GoogleMap
        height="600px"
        apiKey="AIzaSyBNLoYGrbnQI_GMqHt6m0PSN9yA7Zvq7gA"
        :location="{ lat: 24.7136, lng: 46.6753 }"
      />
    </div>
  </ClientOnly>
</template>

<script setup>
import GoogleMap from "vue-google-maps-ui";
</script>

<style lang="scss" scoped>
.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 92%;
  height: 100%;
  background-color: transparent;
  z-index: 1;
}
</style>
