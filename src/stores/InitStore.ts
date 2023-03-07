import { defineStore } from 'pinia';
import { initializeApp } from 'firebase/app';

export const useInitStore = defineStore('init', () => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENTID
  };
  function firebaseInit() {
    initializeApp(firebaseConfig);
  }

  return {
    firebaseInit
  };
});
