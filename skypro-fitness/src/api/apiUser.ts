// Типы данных пользователя
import { RegType, UserType } from "../types/user";
import { app, auth } from "../lib/firebaseConfig"
import { createUserWithEmailAndPassword, sendPasswordResetEmail, updatePassword, updateProfile } from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";

// Типы аргументов и ответа функции
type LoginCredentials = {
  login: string;
  password: string;
};

const database = getDatabase(app);
// Зарегестрироваться
export async function regUser({
  email,
  username,
  password,
}: RegType) {
  // Создаем пользователя с email и паролем
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );  
  const uid = userCredential.user.uid;
  // Обновляем профиль пользователя, чтобы установить displayName
  await updateProfile(userCredential.user, {
    displayName: username,
  });
  // Сохраняем информацию о пользователе в Realtime Database  
  await set(ref(database, "users/" + uid), {
    uid: uid,
    name: username,
    email: email,
  });
  // Получаем информацию о пользователе из базы данных
  const snapshot = await get(child(ref(database), `users/${uid}`));
  return snapshot.val();
}

export const loginUser = async (credentials: LoginCredentials): Promise<UserType> => {
  try {
    const response = await fetch("https://example.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Неверные данные для входа");
    }

    const userData: UserType = await response.json();
    return userData;
  } catch (error) {
    console.error("Ошибка при входе:", error);
    throw error;
  }
};

export async function handlePasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log(`Ссылка для восстановления пароля отправлена на ${email}`);
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
