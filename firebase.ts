// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
import { getAuth } from '@firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDoFsiimUO8e8PnhxbEgHBSdFnVELfPY_M',
    authDomain: 'netflix-bootcamp-11198.firebaseapp.com',
    projectId: 'netflix-bootcamp-11198',
    storageBucket: 'netflix-bootcamp-11198.appspot.com',
    messagingSenderId: '1082190849571',
    appId: '1:1082190849571:web:a2ad3af35b452e81137396',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
