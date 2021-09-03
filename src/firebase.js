import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDv-gqXVoKlAmWzmR49y0AEY_eNQa2H8gw",
    authDomain: "chat-app-c8489.firebaseapp.com",
    projectId: "chat-app-c8489",
    storageBucket: "chat-app-c8489.appspot.com",
    messagingSenderId: "1011269214162",
    appId: "1:1011269214162:web:979171a4649ff3209b320b",
    measurementId: "G-Y571F5FV44"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;