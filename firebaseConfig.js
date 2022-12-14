import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB82f2xJGzRBBQ0cO7bllJoz11hVMDdqVE",
    authDomain: "gini-bnb-imageupload.firebaseapp.com",
    projectId: "gini-bnb-imageupload",
    storageBucket: "gini-bnb-imageupload.appspot.com",
    messagingSenderId: "314998679761",
    appId: "1:314998679761:web:497c8347f0e0104680bdf0"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;