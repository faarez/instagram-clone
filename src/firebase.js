import firebase from 'firebase'



const firebaseApp = firebase.initilizeApp({
      apiKey: "AIzaSyAFFukbl33hKULntxgtGxTi3sQYhudV8rc",
  authDomain: "instagram-clone-4f4ac.firebaseapp.com",
  projectId: "instagram-clone-4f4ac",
  storageBucket: "instagram-clone-4f4ac.appspot.com",
  messagingSenderId: "704786345933",
  appId: "1:704786345933:web:cd1573cc773fcec4911e84"
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage}
