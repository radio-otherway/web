importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyDtk_Ym-AZroXsHvQVcdHXYyc_TvgycAWw",
  authDomain: "radio-otherway.firebaseapp.com",
  projectId: "radio-otherway",
  storageBucket: "radio-otherway.appspot.com",
  messagingSenderId: "47147490249",
  appId: "1:47147490249:web:6243de17f52ef79126e618"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
