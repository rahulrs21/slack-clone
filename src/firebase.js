import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// manually need to write these above 3 lines commands to replace "import firebase from 'firebase' "
// https://firebase.google.com/docs/web/modular-upgrade

// Copied and pasted from firebase https://console.firebase.google.com/u/1/project/slack-clone-yt-90f40/settings/general/web:MjA1NjlhZDEtNWVkYS00Yzg2LWJlMWUtNTJhYTYwNTA3NzQ0
const firebaseConfig = {
    apiKey: "AIzaSyAbYE8dHtHTAvh93E8dyINETR5qhtOaPFw",
    authDomain: "slack-clone-yt-90f40.firebaseapp.com",
    projectId: "slack-clone-yt-90f40",
    storageBucket: "slack-clone-yt-90f40.appspot.com",
    messagingSenderId: "10745636463",
    appId: "1:10745636463:web:577bbbd112169eae938f9a"
};

// Need to write manually these below codes as well
const firebaseApp = firebase.initializeApp(firebaseConfig) // it connects the frontend to backend 


// Need to goto https://console.firebase.google.com/u/0/project/email-clone-yt-254c8/firestore firestore database and create new database.
//  select 'Start in test mode' and click next

// In order to get the database from our code, we write this code
const db = firebaseApp.firestore();

// Help to do Authentication on this app, so goto https://console.firebase.google.com/u/0/project/email-clone-yt-254c8/authentication click get started
// IN sign-in method, select (enable) GOOGLE & EMAIL-PASSWORD
const auth = firebase.auth();

// Now we need GOOGLE Provider
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};

// Now goto SendMail.js, In that connect your onSubmit to database