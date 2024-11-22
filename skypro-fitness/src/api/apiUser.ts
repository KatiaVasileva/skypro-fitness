import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app, auth } from "../lib/firebaseConfig";
import { UserType } from "../types/UserType.type";
import { get, getDatabase, ref, set } from "firebase/database";
import { FirebaseError } from "firebase/app";

type LoginCredentials = {
  login: string;
  password: string;
};

const db = getDatabase(app);

export async function regUser({ email, password, username }: UserType) {
  try {
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

    await set(ref(db, 'users/' + uid), {
      uid: uid,
      email: email,
      username: username,
      courses: [],
      workouts: [],
    });

    return user;
  } catch (error) {
    if (
      error instanceof FirebaseError &&
      error.code === 'auth/email-already-in-use'
    ) {
      throw new Error('Данная почта уже используется');
    } else {
      throw new Error('Произошла ошибка при регистрации. Попробуйте снова.');
    }
  }
}

export async function loginUser(credentials: LoginCredentials) {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      credentials.login,
      credentials.password
    );
    const user = userCredentials.user
  return user;
  } catch (error) {
    if (
      error instanceof Error 
    ) {
      throw new Error('Введены неверные данные');
    } else {
      throw new Error('Произошла ошибка при авторизации. Попробуйте снова.');
    }
  }
}

export const logout = async () => {
  await signOut(auth);
};

export const getUserData = async (uid: string) => {
  const userDoc = await get(ref(db, `users/${uid}`));
  if (userDoc.exists()) {
    return userDoc.val();
  } else {
    return null;
  }
};
