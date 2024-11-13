import { User } from "firebase/auth";
export function saveUserToLocalStorage(user: User) {
  window.localStorage.setItem("user", JSON.stringify(user));
}
export function getUserFromLocalStorage() {
  try {
    const user = window.localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
}
export function removeUserFromLocalStorage() {
  window.localStorage.removeItem("user");
}