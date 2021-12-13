import app from "../config/auth/firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FacebookAuthProvider, signInWithEmailAndPassword , signOut } from "firebase/auth";


export const AuthService = {
  auth: getAuth(app),
  registerViaEmail: async (email, password) => {
    try {
      const auth = getAuth(app);
      return await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return { user: userCredential.user };
      })
      .catch((error) => {
        const errorCode = error.code;
        return { error: errorCode };
      });
    } catch (error) { return { error: error }; }
  },
  loginViaEmail: async (email, password) => {
    try {
      const auth = getAuth();
      return await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          return { user: user }
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // console.log(error.message)
          return { error: error }
        });
    } catch (error) { return { error: error }; }
  },
  loginWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const auth = getAuth();
      auth.languageCode = 'id';
  
      return await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        return { credential: credential, user: user };
      }).catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        return { credential: credential, error: error }
      });
    } catch (error) { return { error: error }; }
  },
  loginWithFacebook: async () => {
    try {
      const provider = new FacebookAuthProvider();
      const auth = getAuth();
      auth.languageCode = 'id';
      provider.setCustomParameters({
        'display': 'popup'
      });
      return await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const user = result.user;
        // const accessToken = credential.accessToken;
        return { credential: credential, user: user }
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        return { credential: credential, error: error }
      });
    } catch (error) { return { error: error }; }
  },
  logout: async () => {
    try {
      const auth = getAuth(app);
      return await signOut(auth)
      // .then(() => {
      //   return { user: null }
      // }).catch((error) => {
      //   return { error: error }
      // });
    } catch (error) { return { error: error }; }
  }
}