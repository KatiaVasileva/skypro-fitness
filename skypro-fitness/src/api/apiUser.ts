import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../lib/firebaseConfig";
import { UserType } from "../types/UserType.type";

type LoginCredentials = {
  login: string;
  password: string;
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const regUser = async ({ email, password, username }: UserType) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const uid = userCredential.user.uid;

  await updateProfile(userCredential.user, {
    displayName: username,
  });

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: uid,
    email: email,
    username: username,
    courses: [],
    workouts: [],
  });

  return user;
};

export const loginUser = async (credentials: LoginCredentials) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    credentials.login,
    credentials.password
  );

  const user = userCredential.user
  return user;
};

export const logout = async () => {
  await signOut(auth);
};

export const getUserData = async (uid: string) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    return null;
  }
};

export { auth };


