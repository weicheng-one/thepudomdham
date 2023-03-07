import { defineStore } from 'pinia'
import { initializeApp } from 'firebase/app'

export const useInitStore = defineStore('init', () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDjEfknvQzy-x6Bg9FLK_fbENFGoB2_6q4',
    authDomain: 'thepudomdham-cb406.firebaseapp.com',
    projectId: 'thepudomdham-cb406',
    storageBucket: 'thepudomdham-cb406.appspot.com',
    messagingSenderId: '239703040501',
    appId: '1:239703040501:web:825828ae460e2add07c0bc',
    measurementId: 'G-VN8860GE57'
  }
  function firebaseInit() {
    initializeApp(firebaseConfig)
  }

  return {
    firebaseInit
  }
})
