import { useParams } from "react-router-dom";
import WorkoutSelect from "../components/SelectWorkout/SelectWorkout";

export default function SelectWorkoutPage() {
  const { id } = useParams();

  return (
    <>
      <WorkoutSelect courseId={id}/>
    </>
  );
}
