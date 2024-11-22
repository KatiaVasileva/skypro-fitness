/*import { useState } from "react";
import { useWorkoutContext } from "../../../hooks/useWorkoutContext";
import { ExerciseType } from "../../../types/WorkoutType.type";
import ProgressInput from "../ProgressInput/ProgressInput";
import { ProgressAdded } from "./AcceptProgress/AcceptProgress";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

export const addWorkoutProgressToUser = async (
  uid: string,
  workoutId: string,
  // workoutProgress: Array<number>
  exercises: Array<ExerciseType>
) => {
  const db = getFirestore()
  const progress = {
    workout_id: workoutId,
    exercises: exercises,
  }
  const docRef = doc(db, "dataUsers", uid);
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const workouts = docSnap.data().workouts;
    console.log(workouts);
    const workout = workouts.filter(
      (workout: { workout_id: string; exercises: Array<ExerciseType> }) =>
        workout.workout_id === workoutId
    );
    if(workout.length === 0) {
      await updateDoc(docRef, { workouts: arrayUnion(progress) });
    } else {
      await updateDoc(docRef, {workouts: [workouts.exercises]});
    }
  } else {
    console.log("No document");
  }
};


type AddProgressPropsType = {
  workoutId: string;
  setIsAddProgressOpen: (isAddProgressOpen: boolean) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export let newProgress: number[];

function AddProgress({ workoutId, setIsAddProgressOpen }: AddProgressPropsType) {
  const { workouts } = useWorkoutContext();
  const workout = workouts.find((workout) => workout._id === workoutId);
  const [exercises ] = useState(workout?.exercises || []);
  const [inputValues, setInputValues] = useState<number[]>([]);
  const [, setResults] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseButton = () => {
    setIsAddProgressOpen(false);
  };

  const handleInputChange = (index: number, value: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

    const handleSendResult = () => {
      newProgress = inputValues.map((value, index) => {
      const progress = value === 0 ? 0 : Math.round((value / exercise.quantity) * 100);
      return progress;
    });
    setResults(newProgress);
    setInputValues([]);
    setIsAddProgressOpen(false);
    setIsOpen(true); // Open the modal after sending results
  };

  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-dark-gray/50 z-50">
      <div className="bg-white rounded-[30px] w-[426px] max-h-max p-[40px] flex flex-col items-center gap-[48px] mx-auto">
        <div className="text-start">
          <div className="pb-[48px] flex justify-between">
            <p className="text-[32px] font-normal">Мой прогресс</p>
            <div onClick={handleCloseButton} className="z-[1]">
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
            {exercises?.map((exercise: ExerciseType, index: number) => (
              <ProgressInput
                key={exercise.name}
                exercise={exercise}
                value={inputValues[index] || 0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, Number(e.target.value))
                }
              />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="btn-primary w-[346px] mt-10 flex pl-[128px] pt-3 pb-3"
              onClick={handleSendResult}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
     {isOpen && <ProgressAdded/>} 
     </>
  );
}

export default AddProgress;*/


import { useState } from "react";
import { useWorkoutContext } from "../../../hooks/useWorkoutContext";
import { ExerciseType } from "../../../types/WorkoutType.type";
import ProgressInput from "../ProgressInput/ProgressInput";
import { ProgressAdded } from "./AcceptProgress/AcceptProgress";
import { addWorkoutProgressToUser } from "../../../api/apiCourses";


type AddProgressPropsType = {
  workoutId: string;
  setIsAddProgressOpen: (isAddProgressOpen: boolean) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export let newProgress: number[];

function AddProgress({ workoutId, setIsAddProgressOpen }: AddProgressPropsType) {
  const { workouts } = useWorkoutContext();
  const workout = workouts.find((workout) => workout._id === workoutId);
  const [exercises] = useState(workout?.exercises || []);
  const [inputValues, setInputValues] = useState<number[]>([]);
  const [, setResults] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseButton = () => {
    setIsAddProgressOpen(false);
  };

  const handleInputChange = (index: number, value: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleSendResult = async () => {
    newProgress = inputValues.map((value, index) => {
      const progress = value === 0 ? 0 : Math.round((value / exercises[index].quantity) * 100);
      return progress;
    });

    // упражнения с новым прогрессом
    const updatedExercises = exercises.map((exercise, index) => ({
      ...exercise,
      progress: newProgress[index],
    }));

    const uid = "users"; 

    
    await addWorkoutProgressToUser(uid, workoutId, updatedExercises);

    setResults(newProgress);
    setInputValues([]);
    setIsAddProgressOpen(false);
    setIsOpen(true); 
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-dark-gray/50 z-50">
        <div className="bg-white rounded-[30px] w-[426px] max-h-max p-[40px] flex flex-col items-center gap-[48px] mx-auto">
          <div className="text-start">
            <div className="pb-[48px] flex justify-between">
              <p className="text-[32px] font-normal">Мой прогресс</p>
              <div onClick={handleCloseButton} className="z-[1]">
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
              {exercises?.map((exercise: ExerciseType, index: number) => (
                <ProgressInput
                  key={exercise.name}
                  exercise={exercise}
                  value={inputValues[index] || 0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, Number(e.target.value))
                  }
                />
              ))}
            </div>
            <div className="flex justify-center">
              <button
                className="btn-primary w-[346px] mt-10 flex pl-[128px] pt-3 pb-3"
                onClick={handleSendResult}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <ProgressAdded />}
    </>
  );
}

export default AddProgress;