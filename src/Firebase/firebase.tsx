import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider,
        FacebookAuthProvider,
        getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signInWithPopup,
        sendPasswordResetEmail,
        signOut,
        updateProfile } 
    from "firebase/auth";

// Your configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiO9ksMONxVO0HpuCqRnGvfHub9olM5Q8",
  authDomain: "siz-zus.firebaseapp.com",
  projectId: "siz-zus",
  storageBucket: "siz-zus.appspot.com",
  messagingSenderId: "961272468036",
  appId: "1:961272468036:web:f257ac5e8228914272e211",
  measurementId: "G-P7FD8C4VHL"
};

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const auth = getAuth(app);


export function signUp(email:string, password:string, username:string) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(function (userCredential) {
            var currentUser = userCredential.user;

            console.log({ currentUser });

            if (auth.currentUser) {
                updateProfile(auth.currentUser, {
                    displayName: username
                }).then(() => {
                    alert('signUp successful!');
                })
            }

        })
        .catch(function (error) {
            alert('signUp error: ' + error.message);
        });
}

// export function signInWithGoogle() {
//     signInWithPopup(auth, googleProvider).then(function (result) {
//         var token = result.credential.accessToken;
//         var user = result.user;
//         console.log({ user });
//     }).catch(function (error) {
//         alert('signUp error: ' + error.message);
//     });
// }

// export function signInWithFacebook() {
//     signInWithPopup(auth, facebookProvider).then(function (result) {
//         var token = result.credential.accessToken;
//         var user = result.user;
//         console.log({ user });
//     }).catch(function (error) {
//         alert('signUp error: ' + error.message);
//     });
// }

export function signOutUser() {
    signOut(auth).then(function () {
        alert('signOut successful!');
    }).catch(function (error) {
        alert('signOut error: ' + error.message);
    }); 
}

export function resetPassword(email:string) {
    sendPasswordResetEmail(auth, email).then(function () {
        alert('Password reset email sent!');
    }).catch(function (error) {
        alert('Password reset error: ' + error.message);
    });
}

export function login(email:string, password:string) {
    signInWithEmailAndPassword(auth, email, password).then(function () {
        alert('Login successful!');
    })
        .catch(function (error) {
            alert('Login error: ' + error.message);
        });
    return false;
}

export default getFirestore();