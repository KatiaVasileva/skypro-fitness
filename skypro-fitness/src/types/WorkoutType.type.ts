export type WorkoutType = {
  _id: string;
  exercises?: Array<ExerciseType>;
  name: string;
  video: string;
  course?: string;
  day?: string;
};

export type ExerciseType = {
  name: string;
  quantity: number;
  progressWorkout: number;
};
