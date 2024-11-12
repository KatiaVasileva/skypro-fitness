import { useNavigate } from "react-router-dom";
import { CourseType } from "../../types/CourseType.type";
import { useUserContext } from "../../hooks/useUserContext";
import { useCoursesContext } from "../../hooks/useCoursesContext";
import { deleteCourseFromUser } from "../../api/apiCourses";

function MyCard({ courseId }: { courseId: string }) {
  const navigate = useNavigate();
  const { courses } = useCoursesContext();
  const { user } = useUserContext();
  const course: CourseType[] = courses.filter(
    (course) => course._id === courseId
  );

  const handleWorkoutButton = () => {
    navigate("/selectworkout/" + course[0]._id);
  };

  const handleDeleteCourseButton = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    deleteCourseFromUser(user!.uid, courseId);
  };

  return (
    <div className="flex flex-col w-[343px] gap-7 bg-white rounded-3xl relative cursor-pointer shadow-md">
      <img className="w-full" src={`/img/workout_${course[0].order}.png`} />
      <img
        className="absolute top-4 right-4"
        src="/img/circle-minus.png"
        onClick={handleDeleteCourseButton}
      />
      <div className="mx-6">
        <h3 className="text-3xl font-semibold pb-6 text-black">
          {course[0].nameRU}
        </h3>
        <div className="flex flex-row flex-wrap gap-1 mb-2">
          <div className="flex flex-row flex-wrap gap-1 w-[103px] h-9 bg-light-gray rounded-3xl items-center pl-2.5">
            <img className="h-4 w-4" src="./img/calendar.png"></img>
            <p className="text-black text-[16px]">{course[0].time}</p>
          </div>
          <div className="flex flex-row gap-1 w-[160px] h-9 bg-light-gray rounded-3xl items-center pl-2.5">
            <img className="h-4 w-4" src="./img/time.png"></img>
            <p className="text-black">{course[0].duration}</p>
          </div>
        </div>
        <div className="flex flex-row gap-1 w-32 h-9 bg-light-gray rounded-3xl items-center pl-2.5 mb-9">
          <img
            className="h-4 w-4"
            src={`/img/difficulty_${course[0].difficulty}.png`}
          ></img>
          <p className="text-black">Сложность</p>
        </div>
        <div className="mt-4 mb-9">
          <p className="text-gray-600">Прогресс 50%</p>
          <progress
            className="h-1.5 w-[270px] [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-[#00C1FF]"
            max="100"
            value="50"
          />
        </div>
        <button
          className="btn-primary w-full h-12 mb-5"
          onClick={handleWorkoutButton}
        >
          Начать тренировки
        </button>
      </div>
    </div>
  );
}

export default MyCard;
