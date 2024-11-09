import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../lib/appRoutes";
import { useCoursesContext } from "../../hooks/useCoursesContext";
import Workout from "../Workout/Workout";

function WorkoutSelect({ courseId }: { courseId: string | undefined }) {
  const navigate = useNavigate();
  const { courses } = useCoursesContext();
  const course = courses.filter((course) => course._id === courseId);
  const courseWorkouts = course[0].workouts;

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
