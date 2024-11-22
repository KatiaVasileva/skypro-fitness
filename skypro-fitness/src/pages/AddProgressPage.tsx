import { useParams } from "react-router-dom";
import AddProgress from "../components/AddProgress/AddProgress";

export default function AddProgressPage() {
  const { course_id } = useParams();
  const { workout_id } = useParams();

  return (
    <>
      <div className="w-full h-full overflow-x-hidden">
        <AddProgress courseId={course_id} workoutId={workout_id} />
      </div>
    </>
  );
}
