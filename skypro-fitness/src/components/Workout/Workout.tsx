import { useNavigate } from "react-router-dom";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { useEffect, useState } from "react";
import { ExerciseType, WorkoutType } from "../../types/WorkoutType.type";
import {
  getCourseWorkouts,
  getProgress,
  getWorkoutProgress,
} from "../../api/apiCourses";
import { useUserContext } from "../../hooks/useUserContext";

function Workout({
  workoutId,
  courseId,
}: {
  workoutId: string;
  courseId: string;
}) {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { workouts } = useWorkoutContext();
  const [workoutProgress, setWorkoutProgress] = useState(0);
  const workout = workouts.filter((workout) => workout._id === workoutId);

  const handleWorkoutSelect = () => {
    navigate("/workout/" + courseId + "/" + workoutId);
  };

  useEffect(() => {
    const calculateWorkoutProgress = async () => {
      const workouts: WorkoutType[] = await getCourseWorkouts(courseId);
      const workout = workouts.filter((workout) => workout._id === workoutId);

      let exerciseTotalQuantity: number = 0;
      let exerciseCompletedQuantity: number = 0;

      if (workout[0].exercises) {
        exerciseTotalQuantity += workout[0].exercises.length;
        workout[0].exercises.forEach(async (exercise: ExerciseType) => {
          const exerciseProgress = await getProgress(
            user?.uid,
            courseId,
            workoutId,
            exercise.name
          );
          if (exerciseProgress === exercise.quantity) {
            exerciseCompletedQuantity = exerciseCompletedQuantity + 1;
          }
          const progress = Math.ceil(
            (exerciseCompletedQuantity * 100) / exerciseTotalQuantity
          );
          setWorkoutProgress(progress);
        });
      } else {
        exerciseTotalQuantity = exerciseTotalQuantity + 1;
        const workoutProgress = await getWorkoutProgress(
          user?.uid,
          courseId,
          workoutId
        );
        if (workoutProgress === 100) {
          exerciseCompletedQuantity = exerciseCompletedQuantity + 1;
        }
        const progress = Math.ceil(
          (exerciseCompletedQuantity * 100) / exerciseTotalQuantity
        );
        setWorkoutProgress(progress);
      }
    };

    calculateWorkoutProgress();
  }, [courseId, user?.uid, workoutId]);

  return (
    <>
      <li
        className="w-80 md:w-96 h-[72px] gap-[0.63rem] flex items-center mb-1 mt-1 hover:bg-[#ecfccb] active:bg-[#d9f99d] cursor-pointer"
        onClick={handleWorkoutSelect}
      >
        <div>
          <div className="flex flex-row gap-4">
            {workoutProgress === 100 ? (
              <img src="/img/Check-in-Circle.png" className="h-8" />
            ) : (
              <img src="/img/check-in-circle-empty.png" className="h-8" />
            )}
            <div className="flex flex-col align-center text-wrap">
              <p className="text-base md:text-[22px] font-normal leading-[1.65rem] h-7">
                {workout[0].name}
              </p>
              <p className="text-xs md:text-base font-normal leading-[1.10rem] h-5">
                {workout[0].course ? workout[0].course : ""}
              </p>
            </div>
          </div>
        </div>
      </li>
      <div className="line w-80 md:w-96"></div>
    </>
  );
}

export default Workout;
