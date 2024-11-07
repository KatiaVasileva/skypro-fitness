// Типы данных пользователя
import { RegType } from "../types/user";
import { app, auth } from "../lib/firebaseConfig"
import { 
  //confirmPasswordReset,
    createUserWithEmailAndPassword, 
    //sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    //updatePassword, 
   //verifyPasswordResetCode
   } 
  from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { FirebaseError } from "firebase/app";

// Типы аргументов и ответа функции
type LoginCredentials = {
  login: string;
  password: string;
};

const database = getDatabase(app);

// Зарегестрироваться
export async function regUser({
  email,
  password,
}: RegType) {
  try {
    // Создаем пользователя с email и паролем
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const uid = userCredential.user.uid;

    // Сохраняем информацию о пользователе в Realtime Database  
    await set(ref(database, "users/" + uid), {
      uid: uid,
      email: email,
    });

    // Получаем информацию о пользователе из базы данных
    const snapshot = await get(child(ref(database), `users/${uid}`));
    return snapshot.val();
    
  } catch (error) {
    // Проверяем, является ли error экземпляром FirebaseError и имеет код ошибки
    if (error instanceof FirebaseError && error.code === "auth/email-already-in-use") {
      throw new Error("Данная почта уже используется");
    } else {
      throw new Error("Произошла ошибка при регистрации. Попробуйте снова.");
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
    const uid = userCredentials.user.uid;
    const snapshot = await get(child(ref(database), `users/${uid}`));

    if (!snapshot.exists()) {
      throw new Error("Пользовательские данные не найдены.");
    }

    return snapshot.val();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ошибка при входе:", error.message);
      throw new Error(error.message);
    }
    throw error;
  }
}

// export async function handlePasswordReset(email: string) {
//   const actionCodeSettings = {
//     url: "https://fitness-cee19-default-rtdb.europe-west1.firebasedatabase.app/newpassword",
//     handleCodeInApp: true,
//   };

//   try {
//     await sendPasswordResetEmail(auth, email, actionCodeSettings);
//     console.log(`Ссылка для восстановления пароля отправлена на ${email}`);
//   } catch (error) {
//     console.error("Ошибка при отправке письма для сброса пароля:", error);
//   }
// }

// // Проверка кода сброса
// export const verifyResetCode = async (oobCode: string) => {
//   try {
//     const email = await verifyPasswordResetCode(auth, oobCode);
//     return email; // возвращает email, чтобы убедиться в правильности кода
//   } catch (error) {
//     console.error("Неверный или истекший код сброса:", error);
//     throw error;
//   }
// };

// // Подтверждение кода и смена пароля
// export const confirmNewPassword = async (oobCode: string, newPassword: string) => {
//   try {
//     await confirmPasswordReset(auth, oobCode, newPassword);
//     return "Пароль успешно изменен.";
//   } catch (error) {
//     console.error("Ошибка при подтверждении пароля:", error);
//     throw error;
//   }
// };

// Смена пароля для авторизованных пользователей
// export async function changePassword(password: string) {
//   try {
//     if (!auth.currentUser) {
//       throw new Error("Нет авторизации");
//     }
//     await updatePassword(auth.currentUser, password);
//   } catch (error) {
//     if (error instanceof Error) throw new Error(error.message);
//   }
// }
