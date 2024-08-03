
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyApOEAxPmsAcH-GMWoUUhehyNSrhv9gHGQ",
  authDomain: "shop-42f0d.firebaseapp.com",
  projectId: "shop-42f0d",
  storageBucket: "shop-42f0d.appspot.com",
  messagingSenderId: "543477551324",
  appId: "1:543477551324:web:0d45e36f0764ee252e6419",
  measurementId: "G-TM8T61NPYK"
};

const firebaseAppConfig = initializeApp(firebaseConfig);
export default firebaseAppConfig;
