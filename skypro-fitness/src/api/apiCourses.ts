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

export const getWorkouts = async () => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "workouts"));
  const workouts: any[] = [];
  querySnapshot.forEach((doc) => {
    workouts.push({ id: doc.id, ...doc.data() });
  });
  return workouts;
};

export const addWorkoutProgressToUser = async (
  uid: string,
  workoutId: string | undefined,
  courseId: string | undefined,
  progress: number
) => {
  try {
    const db = getFirestore();
    const workoutDocRef = doc(db, `users/${uid}/courses/${courseId}/workouts/${workoutId}`);
    await updateDoc(workoutDocRef, { progress });

    console.log(`Прогресс тренировки ${workoutId} обновлён.`);
  } catch (error) {
    console.error("Ошибка обновления прогресса тренировки:", error);
  }
};

export const addExerciseProgressToUser = async (
  uid: string,
  workoutId: string | undefined,
  courseId: string | undefined,
  exerciseName: string,
  progress: number
): Promise<void> => {
  try {
    if (!uid || !workoutId || !courseId) {
      throw new Error("Недостаточно данных для обновления прогресса.");
    }

    const db = getFirestore();
    const exerciseDocRef = doc(db, `users/${uid}/courses/${courseId}/workouts/${workoutId}/exercises/${exerciseName}`
    );

    await updateDoc(exerciseDocRef, {
      progress: progress,
    });

    console.log(`Прогресс упражнения "${exerciseName}" обновлён.`);
  } catch (error) {
    console.error("Ошибка при обновлении прогресса упражнения:", error);
    throw error;
  }
};
// export const getWorkoutProgressFromUser = async (
//   uid: string,
//   workoutId: string
// ) => {
//   const docRef = doc(db, "dataUsers", uid);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     const workouts = docSnap.data().workouts;
//     console.log(workouts);
//     const workout = workouts.find(
//       (workout: { workout_id: string; exercises: Array<ExerciseType> }) =>
//         workout.workout_id === workoutId
//     );
//     console.log(workout.exercises);
//     return workout.exercises;
//   } else {
//     console.log("No document");
//   }
// };

