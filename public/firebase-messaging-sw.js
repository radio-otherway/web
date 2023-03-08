import { Profile } from "../src/models";
import { Users } from "../src/lib/db/collections";

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

const getUserProfile = useCallback(async ()
:
Promise < Profile | null >
=>
{
  if (auth.currentUser !== null) {
    // The user object has basic properties such as display name, email, etc.
    // Going forward we may look this up from the user table in firestore
    const getUserProfile = (userId: string) => {

    };
    const savedProfile = await Users.get(auth.currentUser.uid);
    if (savedProfile) {
      const profile: Profile = {
        ...savedProfile,
        id: auth.currentUser.uid
      };
      profile.roles = savedProfile?.roles;
      await Users.set(auth.currentUser.uid, Object.assign({}, profile));
      return profile;
    } else {
      const profile = Profile.fromUser(auth.currentUser);
      await Users.set(auth.currentUser.uid, Object.assign({}, profile));
      return profile;
    }
  }
  messaging.onBackgroundMessage(function(payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body
    };

    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
