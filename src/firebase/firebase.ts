import "firebase/compat/auth";
import "firebase/compat/analytics";
import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

const app = firebase.initializeApp(
  JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!)
);

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
