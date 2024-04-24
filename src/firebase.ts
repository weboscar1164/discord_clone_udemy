import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA_WZzzpGqet7aDRQUzrI4-eT1bQlh_4iY",
	authDomain: "discord-clone-udemy-c298a.firebaseapp.com",
	projectId: "discord-clone-udemy-c298a",
	storageBucket: "discord-clone-udemy-c298a.appspot.com",
	messagingSenderId: "227908088452",
	appId: "1:227908088452:web:079c3f9332ff38b60e88d1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 複数ユーザーによるログインを設定
provider.setCustomParameters({
	prompt: "select_account",
});

export { auth, provider, db };
