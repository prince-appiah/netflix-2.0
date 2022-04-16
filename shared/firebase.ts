// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCOOanu2Muf7Og-lNX6W5H9MqSSWfP5GzQ',
  authDomain: 'netflix-redesign-4ee9c.firebaseapp.com',
  projectId: 'netflix-redesign-4ee9c',
  storageBucket: 'netflix-redesign-4ee9c.appspot.com',
  messagingSenderId: '478096452294',
  appId: '1:478096452294:web:4b1d7087392aa15a3745c7',
  measurementId: 'G-08Z92STLW9',
}

// Initialize Firebase
// next line makes sure there's only one instance of the app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
