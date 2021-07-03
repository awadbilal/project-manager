import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA-IHm3yr1NDewCMj1g1eBN-6aI_R_KyxA",
    authDomain: "final-project-3ff13.firebaseapp.com",
    projectId: "final-project-3ff13",
    storageBucket: "final-project-3ff13.appspot.com",
    messagingSenderId: "706943388762",
    appId: "1:706943388762:web:5ce86b45e91a0962ff5c63"
  };

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
