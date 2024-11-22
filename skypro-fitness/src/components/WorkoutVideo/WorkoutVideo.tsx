import { useNavigate } from "react-router-dom";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { useCoursesContext } from "../../hooks/useCoursesContext";
import Exercise from "../Exercise/Exercise";
import { useUserContext } from "../../hooks/useUserContext";
import { useEffect, useState } from "react";
import { getWorkoutProgress } from "../../api/apiCourses";

type WorkoutPropsType = {
  courseId: string | undefined;
  workoutId: string | undefined;
};

function WorkoutVideo({ courseId, workoutId }: WorkoutPropsType) {
  const navigate = useNavigate();
  const { courses } = useCoursesContext();
  const { workouts, exercises, setExercises } = useWorkoutContext();
  const { user } = useUserContext();

  const course = courses.filter((course) => course._id === courseId);
  const workout = workouts.filter((workout) => workout._id === workoutId);
  const [workoutProgress, setWorkoutProgress] = useState(0);

  useEffect(() => {
    if (workout) {
      if (workout[0].exercises) {
        setExercises(workout[0].exercises);
      } else {
        setExercises([]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(exercises.length === 0) {
      getWorkoutProgress(user?.uid, courseId, workoutId).then((progress) => {
        setWorkoutProgress(progress);
      })
    }
  });

  const addProgress = () => {
    navigate("/workout/" + courseId + "/" + workoutId + "/add")
  };

  const handleBackButton = () => {
    navigate("/account/selectworkout/" + courseId);
  };

  return (
    <div className="">
      <div className="w-full h-full md:pt-12 pb-48">
        <main className="">
          <p className="text-start text-2xl font-medium mb-2 md:mb-6 md:text-6xl">
            {course[0].nameRU}
          </p>
          <div className="gap-2 text-[18px] flex-row md:flex md:gap-4 pb-10 md:text-3xl ">
            <p className="">
              <span className="md:underline md:underline-offset-8">
                {workout[0].name}
              </span>
              {workout[0].course ? (
                <span>
                  <span>{" / "}</span>
                  <span className="md:underline md:underline-offset-8">
                    {workout[0].course}
                  </span>
                  <span>{" / "}</span>
                  <span className="md:underline md:underline-offset-8">
                    {workout[0].day}
                  </span>
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
          <div>
            <iframe
              className="w-full h-[189px] rounded-lg md:rounded-2xl mb-10 flex justify-center md:h-[600px]"
              src={workout[0].video}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>

          <div className="bg-white rounded-[30px] drop-shadow-lg px-7 py-7">
            <p className="text-start text-3xl pb-5">Упражнения тренировки</p>

            {exercises.length === 0 && (
              <progress
              className="h-1.5 w-[280px] md:w-[320px] [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-[#00C1FF]"
              max="100"
              value={workoutProgress}
            />
            )}

            <div className="flex flex-col w-full md:flex-row gap-14">
              <div className="flex flex-col text-start text-lg">
                <div className="pb-5">
                {exercises.map((exercise, index) => (
                    <Exercise
                      exercise={exercise}
                      courseId={courseId}
                      workoutId={workoutId}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-3 w-full md:flex-row md:gap-4 items-center md:items-end">
              <div className="md:block">
                <button 
                  onClick={addProgress}
                  className="btn-primary w-full h-[52px]"
                >
                  Заполнить свой прогресс
                </button>
              </div>
              <button
                className="btn-primary w-[248px] md:w-52 h-[52px]"
                onClick={handleBackButton}
              >
                Назад
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default WorkoutVideo;
