import { useState } from "react";
import { useWorkoutContext } from "../../../hooks/useWorkoutContext";
import { ExerciseType } from "../../../types/WorkoutType.type";
import ProgressInput from "../ProgressInput/ProgressInput";
import { addExerciseProgressToUser, addWorkoutProgressToUser } from "../../../api/apiCourses";
import { useNavigate } from "react-router-dom";
// import { useUserContext } from "../../../hooks/useUserContext";
// import { useState } from "react";

type AddProgressPropsType = {
  user: { uid: string }; 
  courseId: string | undefined;
  workoutId: string | undefined;
  setIsAddProgressOpen: (isAddProgressOpen: boolean) => void;
};

function AddProgress({
  workoutId,
  user,
  courseId,
  setIsAddProgressOpen,
}: AddProgressPropsType) {
  const navigate = useNavigate();
  const { workouts } = useWorkoutContext();
//   const { user } = useUserContext();
  const workout = workouts.filter((workout) => workout._id === workoutId);
  const [exercises, setExercises] = useState(workout[0].exercises);

  const handleCloseButton = () => {
    setIsAddProgressOpen(false);
  };

  const handleSaveButton = async () => {
    let allExercisesCompleted = true;
  
    if (user && exercises) {
      for (const exercise of exercises) {
        await addExerciseProgressToUser(
          user.uid,
          workoutId,
          courseId,
          exercise.name,
          exercise.progressWorkout
        );
  
        if (exercise.progressWorkout < exercise.quantity) {
          allExercisesCompleted = false;
        }
      }
    }
  
    if (allExercisesCompleted) {
      await addWorkoutProgressToUser(user.uid, workoutId, courseId, 100);
      navigate(`/workout/${courseId}/${workoutId}/counted`);
    }
  };
  

  return (
    <div className="">
      <div className="block overflow-x-hidden z-50 top-[70px] left-[-100px]">
        <div className="flex inset-0 items-center justify-center absolute z-10 bg-dark-gray/50">
          <div className="bg-white rounded-[30px] w-[426px] max-h-max p-[40px] flex flex-col items-center gap-[48px] mx-auto ">
            <div className="text-start">
              <div className="pb-[48px] flex justify-between">
                <p className="text-[32px]  font-normal">Мой прогресс</p>
                <div onClick={handleCloseButton} className=" z-[1]">
                  <svg
                    className="h-[20px] w-[20px] opacity-[20%] cursor-pointer"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="122.878px"
                    height="122.88px"
                    viewBox="0 0 122.878 122.88"
                    enableBackground="new 0 0 122.878 122.88"
                    xmlSpace="preserve"
                  >
                    <g>
                      <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" />
                    </g>
                  </svg>
                </div>
              </div>
              <div
                className="text-[18px] h-[346px] flex flex-col gap-[20px] overflow-y-scroll 
              [&::-webkit-scrollbar]:bg-custom 
              [&::-webkit-scrollbar]:w-[6px] 
              [&::-webkit-scrollbar]:rounded-[10px] 
              [&::-webkit-scrollbar-thumb]:bg-black
              [&::-webkit-scrollbar-thumb]:rounded-[10px]"
              >
                {exercises?.map((exercise: ExerciseType) => (
                  <ProgressInput
                    exercise={exercise}
                    value={exercise.progressWorkout}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setExercises(
                        exercises.map((item: ExerciseType) =>
                          item.name === exercise.name
                            ? {
                                ...item,
                                progressWorkout: Number(e.target.value),
                              }
                            : item
                        )
                      )
                    }
                  />
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  className="btn-primary w-[346px] mt-10 flex pl-[128px] pt-3 pb-3"
                  onClick={handleSaveButton}
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProgress;
