import { db } from "../lib/firebaseConfig";
import { WorkoutType } from "../types/WorkoutType.type";
import { CourseType } from "../types/CourseType.type";
import { child, get, ref, update } from "firebase/database";

export const getUser = async (uid: string) => {
  try {
    const snapshot = await get(child(ref(db), `users/${uid}`));

    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (e) {
    console.error(e);
  }
};

export const getCourses = async () => {
  let courses: CourseType[] = [];
  try {
    const dbRef = ref(db, "courses");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      courses = Object.values(snapshot.val());
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
  return courses;
};

export const getUserCourses = async (uid: string) => {
  const docRef = ref(db, `users/${uid}`);
  const docSnap = await get(docRef);

  if (docSnap.exists()) {
    return docSnap.val().courses;
  } else {
    console.log("No such document!");
  }
};

export const addCourseToUser = async (uid: string, courseId: string) => {
  try {
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();

      if (userData.courses && userData.courses[courseId]) {
        console.log("Курс уже добавлен.");
        return userData.courses;
      }

      const updatedCourses = {
        ...userData.courses,
        [courseId]: 0,
      };

      await update(userRef, { courses: updatedCourses });
    } else {
      throw new Error("Пользователь не найден");
    }
  } catch (error) {
    console.error("Ошибка при добавлении курса:", error);
    throw error;
  }
};

export const deleteCourseFromUser = async (uid: string, courseId: string) => {
  try {
    const userRef = ref(db, `users/${uid}`);

    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();

      if (userData.courses) {
        const updatedCourses = { ...userData.courses };

        delete updatedCourses[courseId];

        await update(userRef, { courses: updatedCourses });
      } else {
        throw new Error("Курс не найден у пользователя");
      }
    } else {
      throw new Error("Пользователь не найден");
    }
  } catch (error) {
    console.error("Ошибка при удалении курса:", error);
    throw error;
  }
};

export const deleteWorkoutsFromUser = async (uid: string, courseId: string) => {
  try {
    const courseRef = ref(db, `users/${uid}/courses/${courseId}`);

    const snapshot = await get(courseRef);

    if (snapshot.exists()) {
      const courseData = snapshot.val();

      if (courseData.workouts) {
        const updates: {
          [key: string]: string;
        } = {};
        updates[`users/${uid}/courses/${courseId}`] = courseId;
        return update(ref(db), updates);
      } else {
        throw new Error("Курс не найден у пользователя");
      }
    } else {
      throw new Error("Пользователь не найден");
    }
  } catch (error) {
    console.error("Ошибка при удалении курса:", error);
    throw error;
  }
};

export const getWorkouts = async () => {
  let workouts: WorkoutType[] = [];
  try {
    const dbRef = ref(db, "workouts");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      workouts = Object.values(snapshot.val());
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
  return workouts;
};

export const getCourse = async (courseId: string) => {
  try {
    const snapshot = await get(child(ref(db), `courses/${courseId}`));

    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (e) {
    console.error(e);
  }
};

export const getCourseWorkouts = async (courseId: string) => {
  try {
    const courseData = await getCourse(courseId);
    if (!courseData) throw new Error("Курс не найден");

    const snapshot = await get(ref(db, `workouts`));
    if (snapshot.exists()) {
      const workoutsData: Array<WorkoutType> = Object.values(snapshot.val());
      const courseWorkouts = courseData.workouts.map((workoutId: string) =>
        workoutsData.find((workout: WorkoutType) => workout._id === workoutId)
      );
      return courseWorkouts;
    } else {
      throw new Error("Не найдено ни одной тренировки.");
    }
  } catch (error) {
    console.error("Ошибка загрузки тренировок:", error);
    throw error;
  }
};

export const addExerciseProgressToUser = async (
  uid: string | undefined,
  workoutId: string | undefined,
  courseId: string | undefined,
  exerciseId: string,
  workoutProgress: number
) => {
  try {
    const docRef = ref(db, `users/${uid}`);
    if (workoutProgress) {
      await update(docRef, {
        [`courses/${courseId}/workouts/${workoutId}/exercises/${exerciseId}/progressWorkout`]:
          workoutProgress,
      });
    } else {
      await update(docRef, {
        [`courses/${courseId}/workouts/${workoutId}/exercises/${exerciseId}/progressWorkout`]: 0,
      });
    }
  } catch (error) {
    console.error("Ошибка загрузки прогресса упражнения: ", error);
    throw error;
  }
};

export const addWorkoutProgressToUser = async (
  uid: string | undefined,
  workoutId: string | undefined,
  courseId: string | undefined,
  workoutProgress: number
) => {
  try {
    const docRef = ref(db, `users/${uid}`);
    if (workoutProgress) {
      await update(docRef, {
        [`courses/${courseId}/workouts/${workoutId}/progressWorkout`]:
          workoutProgress,
      });
    } else {
      console.log("Прогресс не введен");
      return;
    }
  } catch (error) {
    console.error("Ошибка загрузки прогресса упражнения: ", error);
    throw error;
  }
};

export const getProgress = async (
  userId: string | undefined,
  courseId: string | undefined,
  workoutId: string | undefined,
  exerciseName: string
) => {
  const progressRef = ref(
    db,
    `users/${userId}/courses/${courseId}/workouts/${workoutId}/exercises/${exerciseName}/progressWorkout`
  );
  try {
    const snapshot = await get(progressRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return null;
  }
};

export const getWorkoutProgress = async (
  userId: string | undefined,
  courseId: string | undefined,
  workoutId: string | undefined
) => {
  const progressRef = ref(
    db,
    `users/${userId}/courses/${courseId}/workouts/${workoutId}/progressWorkout`
  );
  try {
    const snapshot = await get(progressRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return null;
  }
};
