import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  Sua config aqui!
};

let app, auth, db;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  db = getFirestore(app);
} else {
  app = getApp();
  try {
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (e) {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
    db = getFirestore(app);
  }
}

export { app, auth, db };
