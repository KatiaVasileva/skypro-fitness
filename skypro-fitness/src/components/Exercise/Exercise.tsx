import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { ExerciseType } from "../../types/WorkoutType.type";
import { getProgress } from "../../api/apiCourses";

function Exercise({
  exercise,
  courseId,
  workoutId,
}: {
  exercise: ExerciseType;
  courseId: string | undefined;
  workoutId: string | undefined;
}) {
  const { user } = useUserContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getProgress(user?.uid, courseId, workoutId, exercise.name).then((data) => {
      setProgress(data);
    });
  });

  const progressInPercent = (progress * 100) / exercise.quantity;

  return (
    <div className="">
      <p className="text-[16px] md:text-[18px]">
        {exercise.name +
          " (" +
          exercise.quantity +
          " повторений) " +
          Math.floor(progressInPercent) +
          " %"}{" "}
      </p>
      <progress
        className="h-1.5 w-[280px] md:w-[320px] [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-[#00C1FF]"
        max="100"
        value={progressInPercent}
      />
    </div>
  );
}

export default Exercise;
