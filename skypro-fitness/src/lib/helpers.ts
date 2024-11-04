import { User } from "firebase/auth";
import { CourseType } from "../types/CourseType.type";

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

export function saveCoursesToLocalStorage(courses: Array<CourseType>) {
  window.localStorage.setItem("courses", JSON.stringify(courses));
}

export function getCoursesFromLocalStorage() {
  try {
    const courses = window.localStorage.getItem("courses");
    if (courses) {
      return JSON.parse(courses);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
}

export function removeCoursesFromLocalStorage() {
  window.localStorage.removeItem("courses");
}

