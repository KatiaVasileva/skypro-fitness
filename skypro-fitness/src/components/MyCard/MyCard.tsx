import { useNavigate } from "react-router-dom";
import { CourseType } from "../../types/CourseType.type";
import { useUserContext } from "../../hooks/useUserContext";
import {
  deleteCourseFromUser,
  deleteWorkoutsFromUser,
  getCourseWorkouts,
  getWorkoutProgress,
} from "../../api/apiCourses";
import { useEffect, useState } from "react";
import { WorkoutType } from "../../types/WorkoutType.type";
import { AppRoutes } from "../../lib/appRoutes";
import { NewStart } from "../popups/NewStart/NewStart";

function MyCard({ course }: { course: CourseType }) {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [courseProgress, setCourseProgress] = useState(0);
  const [isNewStart, setIsNewStart] = useState(false);

  const handleCardClick = () => {
    navigate("/course/" + course?.order);
  };

  const handleWorkoutButton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setIsNewStart(false);
    if (courseProgress === 100) {
      await deleteWorkoutsFromUser(user!.uid, course._id);
    }
    navigate("/account/selectworkout/" + course._id);
  };

  const handleDeleteCourseButton = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    deleteCourseFromUser(user!.uid, course._id);
  };

  useEffect(() => {
    const calculateProgress = async () => {
      const workouts: WorkoutType[] = await getCourseWorkouts(course._id);

      let workoutsCompleted: number = 0;

      for (const workout of workouts) {
        const workoutProgress = await getWorkoutProgress(
          user?.uid,
          course._id,
          workout._id
        );
        if (workoutProgress === 100) {
          workoutsCompleted = workoutsCompleted + 1;
        }
      }

      const courseProgress = Math.ceil(
        (100 / course.workouts.length) * workoutsCompleted
      );
      setCourseProgress(courseProgress);
    };

    calculateProgress();
  }, [course._id, course.workouts.length, user?.uid]);

  return (
    <>
      <div
        className="flex flex-col w-[343px] gap-7 bg-white rounded-3xl relative cursor-pointer shadow-md"
        onClick={handleCardClick}
      >
        <img className="w-full" src={`/img/workout_${course.order}.png`} />
        <img
          className="absolute top-4 right-4"
          src="/img/circle-minus.png"
          onClick={handleDeleteCourseButton}
        />
        <div className="mx-6">
          <h3 className="text-3xl font-semibold pb-6 text-black">
            {course.nameRU}
          </h3>
          <div className="flex flex-row flex-wrap gap-1 mb-2">
            <div className="flex flex-row flex-wrap gap-1 w-[103px] h-9 bg-light-gray rounded-3xl items-center pl-2.5">
              <img
                className="h-4 w-4"
                src={`/img/calendar_${course.difficulty}.png`}
              ></img>
              <p className="text-black text-[16px]">{course.time}</p>
            </div>
            <div className="flex flex-row gap-1 w-[160px] h-9 bg-light-gray rounded-3xl items-center pl-2.5">
              <img
                className="h-4 w-4"
                src={`/img/time_${course.difficulty}.png`}
              ></img>
              <p className="text-black">{course.duration}</p>
            </div>
          </div>
          <div className="flex flex-row gap-1 w-32 h-9 bg-light-gray rounded-3xl items-center pl-2.5 mb-9">
            <img
              className="h-4 w-4"
              src={`/img/difficulty_${course.difficulty}.png`}
            ></img>
            <p className="text-black">Сложность</p>
          </div>
          <div className="mt-4 mb-9">
            <p className="text-gray-600">Прогресс {courseProgress}%</p>
            <progress
              className="h-1.5 w-[270px] [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-[#00C1FF]"
              max="100"
              value={courseProgress}
            />
          </div>
          <button
            className="btn-primary w-full h-12 mb-5"
            onClick={handleWorkoutButton}
          >
            {courseProgress === 0
              ? "Начать тренировки"
              : courseProgress > 0 && courseProgress < 100
              ? "Продолжить"
              : "Начать заново"}
          </button>
        </div>
      </div>
      {isNewStart && <NewStart onClick={() => navigate(AppRoutes.MAIN)} />}
    </>
  );
}

export default MyCard;
