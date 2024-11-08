/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { app, db } from "../lib/firebaseConfig";

export const getCourses = async () => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "courses"));
  const courses: any[] = [];
  querySnapshot.forEach((doc) => {
    courses.push({ id: doc.id, ...doc.data() });
  });
  return courses;
};

export const getUserCourses = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().courses;
  } else {
    console.log("No such document!");
  }
};

export const addCourseToUser = async (uid: string, courseId: string) => {
  const db = getFirestore();
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    courses: arrayUnion(courseId),
  });
};

export const deleteCourseFromUser = async (uid: string, courseId: string) => {
  const db = getFirestore();
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    courses: arrayRemove(courseId),
  });
};

export const getWorkouts = async () => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "workouts"));
  const workouts: any[] = [];
  querySnapshot.forEach((doc) => {
    workouts.push({ id: doc.id, ...doc.data() });
  });
  return workouts;
};

export const queryCourses = async (
  field: string,
  operator: any,
  value: any
) => {
  const db = getFirestore(app);
  const q = query(collection(db, "courses"), where(field, operator, value));
  const querySnapshot = await getDocs(q);
  const courses: any[] = [];
  querySnapshot.forEach((doc) => {
    courses.push({ id: doc.id, ...doc.data() });
  });
  return courses;
};

export const saveUser = async (uid: string, data: any) => {
  await setDoc(doc(db, "users", uid), data, { merge: true });
  // await initializeUserProgress(uid);
};

export const checkCourseExists = async (
  uid: string,
  courseId: number
): Promise<boolean> => {
  const userProgressRef = doc(db, "dataUsers", uid);
  const userProgressDoc = await getDoc(userProgressRef);

  if (!userProgressDoc.exists()) {
    return false;
  }

  const userProgressData = userProgressDoc.data() || { courses_progress: [] };
  const existingCourses = userProgressData.courses_progress;

  return existingCourses.some((course: any) => course.id_course === courseId);
};