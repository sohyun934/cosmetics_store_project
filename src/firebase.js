import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, onAuthStateChanged, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useState } from "react";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app, {
    experimentalForceLongPolling: true,
    useFetchStreams: false
});

export const auth = getAuth();
export let signedInUser;

// Modifying the Auth state persistence
setPersistence(auth, browserSessionPersistence).then(() => {
    onAuthStateChanged(auth, user => {
        if (user) {
            signedInUser = user.email;
        } else {
            signedInUser = null;
        }
    });
});

export const storage = getStorage();
