/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
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