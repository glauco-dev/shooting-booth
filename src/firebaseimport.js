import 'firebase/app';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd2r5Oc_vYmy5M1mqwdfnFC3xV1KZKtZY",
  authDomain: "atiradores-brasil-zevm8u.firebaseapp.com",
  databaseURL: "https://atiradores-brasil-zevm8u-default-rtdb.firebaseio.com",
  projectId: "atiradores-brasil-zevm8u",
  storageBucket: "atiradores-brasil-zevm8u.appspot.com",
  messagingSenderId: "1074026160535",
  appId: "1:1074026160535:web:5beafb1b2f2f512b67e4d2",
  measurementId: "G-MLLD24KLGT"
};

// Initialize Firebase
export default initializeApp(firebaseConfig);