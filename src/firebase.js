import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAWn8bbvhViqbXyH8Kk7_fURuLfeq_FqcI",
	authDomain: "yt-clone-2bcdd.firebaseapp.com",
	projectId: "yt-clone-2bcdd",
	storageBucket: "yt-clone-2bcdd.appspot.com",
	messagingSenderId: "547068236510",
	appId: "1:547068236510:web:eac1bffc208c2bd14a684f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
