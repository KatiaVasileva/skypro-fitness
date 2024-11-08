import { WorkoutType } from "./WorkoutType.type";

export type UserType = {
  uid?: string;
  email: string;
  password: string;
  username: string;
  courses?: string[]; // Массив ID курсов
  workouts?: WorkoutType[]; // Массив объектов типа WorkoutType
};

export type LoginType = {
  email: string;
  password: string;
};

export type RegType = {
  email: string;
  password: string;
};