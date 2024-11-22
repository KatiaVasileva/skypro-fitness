import { User } from "firebase/auth";
import { CourseType } from "../types/CourseType.type";
import { WorkoutType } from "../types/WorkoutType.type";

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
    if (!courses) {
      return [];
    }
    return JSON.parse(courses);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
}

export function removeCoursesFromLocalStorage() {
  window.localStorage.removeItem("courses");
}

export function saveWorkoutsToLocalStorage(workouts: Array<WorkoutType>) {
  window.localStorage.setItem("workouts", JSON.stringify(workouts));
}

export function getWorkoutsFromLocalStorage() {
  try {
    const workouts = window.localStorage.getItem("workouts");
    if (!workouts) {
      return [];
    }
    return JSON.parse(workouts);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
}

export function removeWorkoutsFromLocalStorage() {
  window.localStorage.removeItem("workouts");
}
