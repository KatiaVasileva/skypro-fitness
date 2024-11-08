import { useEffect } from "react";
import { WorkoutType } from "../../types/WorkoutType.type";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../lib/appRoutes";
import { useCoursesContext } from "../../hooks/useCoursesContext";
import { getWorkouts } from "../../api/apiCourses";
import { saveWorkoutsToLocalStorage } from "../../lib/helpers";
import Workout from "../Workout/Workout";

function WorkoutSelect({ courseId }: { courseId: string | undefined }) {
  const navigate = useNavigate();
  const {workouts, setWorkouts} = useWorkoutContext();
  const { courses } = useCoursesContext();
  const course = courses.filter((course) => course._id === courseId);
  const courseWorkouts = course[0].workouts;

  useEffect(() => {
    getWorkouts()
      .then((allWorkouts) => {
        const workouts: Array<WorkoutType> = Object.values(allWorkouts);
        console.log(workouts);
        saveWorkoutsToLocalStorage(workouts);
        setWorkouts(workouts);
      })
      .catch(() => {
        console.log("Не удалось загрузить данные, попробуйте позже.");
      });
  }, [setWorkouts]);

  console.log(workouts);

  const handleBackButton = () => {
    navigate(AppRoutes.ACCOUNT);
  }

  return (
    <div className="w-full flex justify-center">
      <div className=" w-[460px] min-h-[10px] top-[113px] left-[7211px] p-[40px] gap-[18px] rounded-[30px] bg-[#f8fafc] shadow-md">
        <h2 className="text-4xl font-normal leading-[2.20rem] mb-10">
          Выберите тренировку
        </h2>
        <div className="mb-12">
          <ul className="scrollbar w-150 gap-[2.13rem] overflow-y-auto overflow-x-hidden mb-3 ">
            {courseWorkouts.map((workout, index) => (
              <Workout workoutId={workout} courseId={course[0]._id} key={index} />
            ))}
          </ul>
        </div>
        <button className="btn-primary w-full h-[52px]" onClick={handleBackButton}>Назад</button>
      </div>
    </div>
  );
}

export default WorkoutSelect;
