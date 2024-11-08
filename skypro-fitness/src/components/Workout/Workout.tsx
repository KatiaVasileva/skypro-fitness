import { useNavigate } from "react-router-dom";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";

function Workout({
  workoutId,
  courseId,
}: {
  workoutId: string;
  courseId: string;
}) {
  const navigate = useNavigate();
  const { workouts } = useWorkoutContext();
  const workout = workouts.filter((workout) => workout._id === workoutId);

  const handleWorkoutSelect = () => {
    navigate("/workout/" + courseId + "/" + workoutId);
  };

  return (
    <>
      <li
        className="w-96 gap-[0.63rem] flex items-center mb-1 mt-1  hover:bg-[#ecfccb] active:bg-[#d9f99d] cursor-pointer"
        onClick={handleWorkoutSelect}
      >
        <img  src="/img/Check-in-Circle.png"/>
        <div>
          <p className="text-2xl font-normal leading-[1.65rem]  h-7 mb-2">
            {workout[0].name}
          </p>
          <p className="text-base font-normal leading-[1.10rem]  h-5 ">
            {workout[0].course ? workout[0].course : ""}
          </p>
        </div>
      </li>
      <div className="border w-80"></div>
    </>
  );
}

export default Workout;
