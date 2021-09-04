import firebase from "firebase/app"; // hme apne app ko firebase se integrate karna hai, for that firebase containes many modules unme se app is one of them , we require basic app module
// app module ko hamne firebase variable mein import kar liya, ham firebase ki jagah kuch bhi name de sakte hai

import config from "./config.json";

import "firebase/auth"; //ye auth vaali chis upar bane firebase variable chali gayi
import "firebase/firestore"; //ye firestore vaali chis upar bane firebase variable chali gayi
import "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyD4-5bUvVckDAea5xJlbZfIv_ijUoPqofI",
//     authDomain: "reelsapp-6e42a.firebaseapp.com",
//     projectId: "reelsapp-6e42a",
//     storageBucket: "reelsapp-6e42a.appspot.com",
//     messagingSenderId: "658658564915",
//     appId: "1:658658564915:web:e4cf67e54dd74543ac7c46"
// };

// Firebase ke platform par lakho Project files hoti hai to firebase ko kaise pta chalega ki aap konse project ke saath apna React App connect karna chah rahe ho
// to aisliye aapko us Project File ki config files ka code idhar dena hota hai jo ki unique hota hai for each project on Firebase platform

// config files hamne firebase ko dedi
firebase.initializeApp(config); // is line se jo hamara React App hai vo firebase ke project(jo hamne uske platform par create kara the) se connect ho gya 

// flag => using google
let provider = new firebase.auth.GoogleAuthProvider();

// make an authentication object
// let auth = firebase.auth(); kuki mujhe ise export karna ha to ise aise likhenge
// object jiske ander login/logout/signup
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const signInWithGoogle = ()=>{
    // ki mujhe popup ko use karke signup krna hai with google
    auth.signInWithPopup(provider);
}

export default firebase;