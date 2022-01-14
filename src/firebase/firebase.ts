import "firebase/compat/auth";
import "firebase/compat/analytics";
import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "../secrets/firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = firebase.auth();
export const tracker = firebase.analytics(app);

export const signInUiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};
