import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC_69aCskbpZTBzgXQiO7XU0E9zN0cIxtY",
  authDomain: "stori-newsletter.firebaseapp.com",
  projectId: "stori-newsletter",
  storageBucket: "stori-newsletter.appspot.com",
  messagingSenderId: "174998250477",
  appId: "1:174998250477:web:69ecbcdcd2971cc7a07de4",
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
