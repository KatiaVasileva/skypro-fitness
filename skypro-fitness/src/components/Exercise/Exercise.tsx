import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { ExerciseType } from "../../types/WorkoutType.type";

function Exercise({
  exercise,
//   order,
}: {
  exercise: ExerciseType;
  order: number;
}) {
  const { exercises } = useWorkoutContext();

  console.log(exercises);

//   const progressInPercent = exercises[order]
//     ? (exercises[order].progressWorkout * 100) / exercise.quantity
//     : 0;

  return (
    <div className="pb-5">
      <p className="text-[16px] md:text-[18px]">{exercise.name + " (" + exercise.quantity + " повторений) " + Math.floor(50) + " %"} </p>
      <progress
        className="h-1.5 w-[280px] md:w-[320px] [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-[#00C1FF]"
        max="100"
        // value={progressInPercent}
        value="50"
      />
    </div>
  );
}

export default Exercise;
