import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDr6slW9jmXQqtJk1l0zgPZzK0FWChDmiM",
  authDomain: "cooking-ninja-site-2a027.firebaseapp.com",
  projectId: "cooking-ninja-site-2a027",
  storageBucket: "cooking-ninja-site-2a027.appspot.com",
  messagingSenderId: "44662274755",
  appId: "1:44662274755:web:d8f6f58415b137372ec076",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
