import { useEffect, useState } from "react";
import { ExerciseType } from "../../../types/WorkoutType.type";
import { getProgress } from "../../../api/apiCourses";
import { useUserContext } from "../../../hooks/useUserContext";

type ProgressInputType = {
  exercise: ExerciseType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  courseId: string | undefined;
  workoutId: string | undefined;
};

function ProgressInput({ exercise, onChange, courseId, workoutId }: ProgressInputType) {
  const {user} = useUserContext();
  const [progress, setProgress] = useState();

  useEffect(() => {
    getProgress(user?.uid, courseId, workoutId, exercise.name).then((progress) => {
      setProgress(progress);
    }); 
  });

  return (
    <div>
      <p>{`Сколько раз вы сделали ${exercise.name.toLowerCase()}?`}</p>
      <input
        className="w-[280px] h-[52px] border-2 border-white-gray rounded-[8px] pl-4"
        onChange={onChange}
        type="number"
        min="0"
        step="1"
        placeholder="0"
        defaultValue={progress}
      />
    </div>
  );
}

export default ProgressInput;
