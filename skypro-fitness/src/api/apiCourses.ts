import { child, get, ref } from "firebase/database";
import { db } from "../lib/firebaseConfig";
import { CourseType } from "../types/CourseType.type";

const baseHost =
  "https://fitness-cee19-default-rtdb.europe-west1.firebasedatabase.app";

export async function getCourses(): Promise<Array<CourseType>> {
  const response = await fetch(baseHost + "/courses.json", {
    method: "GET",
  });

  if (response.status === 500) {
    throw new Error("Ошибка при получении данных");
  }

  const snapshot = await get(child(ref(db), `courses`));
  return snapshot.val();
}
