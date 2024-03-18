import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDBggyCq_eiMP5Nf9xLQRtudkq_IskTLcA",
  authDomain: "sporent-6a447.firebaseapp.com",
  databaseURL: "https://sporent-6a447-default-rtdb.firebaseio.com",
  projectId: "sporent-6a447",
  storageBucket: "sporent-6a447.appspot.com",
  messagingSenderId: "955914071947",
  appId: "1:955914071947:web:18ce6946ccd59bdfe9098e",
  measurementId: "G-YB593Z1HPJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
