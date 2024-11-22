import { Outlet, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import WorkoutVideo from "../components/WorkoutVideo/WorkoutVideo";

export default function WorkoutVideoPage() {
  const {course_id} = useParams();
  const {workout_id} = useParams();

  return (
    <>
      <Header />
      <WorkoutVideo courseId={course_id} workoutId={workout_id}/>
      <Outlet />
    </>
  );
}
