// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyC9ze32hWUKrk9HDQBD2P4psSvFn3Qrq2A",
  authDomain: "bound-street.firebaseapp.com",
  projectId: "bound-street",
  storageBucket: "bound-street.appspot.com",
  messagingSenderId: "325264553423",
  appId: "1:325264553423:web:f1a5c9ac352dca1da40eba",
  measurementId: "G-W9359445BV",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "~/assets/images/BellBing.svg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
