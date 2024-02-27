<template>
  <div v-if="showSplash" class="splash">
    <!-- Your loading splash content -->
    <img src="@/assets/images/logo.png" class="logo" alt="logo" />
  </div>
  <div v-else class="layout-app">
    <Toast />
    <LayoutHeader />
    <div class="page-content">
      <NuxtPage />
    </div>
    <LayoutFooter />
  </div>
</template>
<script setup>
import Toast from "primevue/toast";
// ================================================================================ imports
const showSplash = ref(true);
// ================================================================================ data

// FCM
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// ================================================================================ lifecycle hooks
onMounted(() => {
  setTimeout(() => {
    showSplash.value = false;
  });

  const firebaseConfig = {
    apiKey: "AIzaSyC9ze32hWUKrk9HDQBD2P4psSvFn3Qrq2A",
    authDomain: "bound-street.firebaseapp.com",
    projectId: "bound-street",
    storageBucket: "bound-street.appspot.com",
    messagingSenderId: "325264553423",
    appId: "1:325264553423:web:f1a5c9ac352dca1da40eba",
    measurementId: "G-W9359445BV",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
  });
  getToken(messaging, {
    vapidKey:
      "BO6bd3eAzFZfuUnW5PQskonS0xEw3xEyjQJWVuKVwvXdkdprct6Ob6KtgfuUEDedMxeUQ2i2Yp7KEf1jRpxYlk4",
  })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log("fcm currentToken", currentToken);
        // ...
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
});
</script>
<style lang="scss">
.splash {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
</style>
