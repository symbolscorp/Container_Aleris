import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpZ4GS_h6d0ZV8iQB4cj3lJvP6F4gIgDI",
  authDomain: "sspapp-76cb4.firebaseapp.com",
  databaseURL: "https://sspapp-76cb4.firebaseio.com",
  projectId: "sspapp-76cb4",
  storageBucket: "sspapp-76cb4.appspot.com",
  messagingSenderId: "919130722167",
  appId: "1:919130722167:web:075e448fe9702ea72adb72",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
