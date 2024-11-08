/* eslint-disable @typescript-eslint/no-explicit-any */

import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../lib/firebaseConfig";

export const getCourses = async () => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "courses"));
  const courses: any[] = [];
  querySnapshot.forEach((doc) => {
    courses.push({ id: doc.id, ...doc.data() });
  });
  return courses;
};
