import { createApp } from 'vue'
import App from './App.vue'
import '../src/css/app.css';
import router from "@/router";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCMbjo27NzJnrKYHXGabNE_WeRf_PF7ZcE",
    authDomain: "dyna-craft-hub.firebaseapp.com",
    projectId: "dyna-craft-hub",
    storageBucket: "dyna-craft-hub.appspot.com",
    messagingSenderId: "1076456019379",
    appId: "1:1076456019379:web:2fbf4d53022b8cd36527c6",
    measurementId: "G-B0FKQ4P627"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { auth, db };

createApp(App).use(router).mount('#app')

