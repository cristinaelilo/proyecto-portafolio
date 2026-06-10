import { initializeApp } from 'firebase/app';

export const firebaseConfig = {

  apiKey: "AIzaSyCsWq62WkJ-7hTlBluOkzwooZCmcHTgVBk",
  authDomain: "cd-studio-7bbcf.firebaseapp.com",
  projectId: "cd-studio-7bbcf",
  storageBucket: "cd-studio-7bbcf.firebasestorage.app",
  messagingSenderId: "785604172319",
  appId: "1:785604172319:web:e2b4c0a70b80eb26d3132a"

};

export const appFirebase =
  initializeApp(firebaseConfig);