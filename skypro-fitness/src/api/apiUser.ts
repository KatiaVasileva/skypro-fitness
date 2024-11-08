import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
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

  console.log(username);

  // Обновляем профиль пользователя, чтобы установить displayName
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

// Функция для восстановления пароля
export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

// Функция для получения данных пользователя из Firestore
export const getUserData = async (uid: string) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    return null;
  }
};

export async function handlePasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    // alert(`Ссылка для восстановления пароля отправлена на ${email}`);
  } catch (error) {
    console.error("Ошибка при отправке письма для сброса пароля:", error);
  }
}

// Сменить пароль
export async function changePassword(password: string) {
  try {
    if (!auth.currentUser) {
      throw new Error("Нет авторизации");
    }
    await updatePassword(auth.currentUser, password);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}

export { auth };


