import { useParams } from "react-router-dom";
import { ProgressCounted } from "../components/ProgressCounted/ProgressCounted";

export default function ProgressCountedPage() {
  const { course_id } = useParams();
  const { workout_id } = useParams();

  return (
    <>
      <div className="w-full h-full overflow-x-hidden">
        <ProgressCounted courseId={course_id} workoutId={workout_id}/>
      </div>
    </>
  );
}
