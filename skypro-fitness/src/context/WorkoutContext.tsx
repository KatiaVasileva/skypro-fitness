import { createContext, ReactNode, useEffect, useState } from "react";
import { ExerciseType, WorkoutType } from "../types/WorkoutType.type";
import {
  getWorkoutsFromLocalStorage,
  saveWorkoutsToLocalStorage,
} from "../lib/helpers";

type WorkoutProviderProps = {
  children: ReactNode;
};

type WorkoutContextData = {
  workouts: Array<WorkoutType>;
  setWorkouts: (workouts: Array<WorkoutType>) => void;
  workoutProgress: Array<number>;
  setWorkoutProgress: (progress: Array<number>) => void;
  exercises: Array<ExerciseType>;
  setExercises: (numexercisesber: Array<ExerciseType>) => void;
};

export const WorkoutContext = createContext<WorkoutContextData | null>(null);

const WorkoutProvider = ({ children }: WorkoutProviderProps) => {
  const [workouts, setWorkouts] = useState<Array<WorkoutType>>(
    getWorkoutsFromLocalStorage
  );
  const [workoutProgress, setWorkoutProgress] = useState<Array<number>>([]);
  const [exercises, setExercises] = useState<Array<ExerciseType>>([]);

  useEffect(() => {
    if (workouts) {
      saveWorkoutsToLocalStorage(workouts);
    }
  }, [workouts]);

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        setWorkouts,
        workoutProgress,
        setWorkoutProgress,
        exercises,
        setExercises,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
