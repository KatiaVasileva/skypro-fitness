import { WorkoutType } from "./workout";

export type User = {
  uid: string;
  email: string;
  name: string;
  courses: string[]; // Массив ID курсов
  workouts: WorkoutType[]; // Массив объектов типа WorkoutType
};

export type LoginType = {
  email: string;
  password: string;
};

export type RegType = {
  email: string;
  password: string;
  username: string;
};

