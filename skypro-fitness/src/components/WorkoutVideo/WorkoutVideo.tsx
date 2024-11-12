import { useNavigate } from "react-router-dom";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
// import { useUserContext } from "../../hooks/useUserContext";
import { useCoursesContext } from "../../hooks/useCoursesContext";
import Exercise from "../Exercise/Exercise";

type WorkoutPropsType = {
  courseId: string | undefined;
  workoutId: string | undefined;
};

function WorkoutVideo({ courseId, workoutId }: WorkoutPropsType) {
  const navigate = useNavigate();
  const { courses } = useCoursesContext();
  const { workouts, exercises } = useWorkoutContext();
  //   const { user } = useUserContext();

  const course = courses.filter((course) => course._id === courseId);
  const workout = workouts.filter((workout) => workout._id === workoutId);

  //   useEffect(() => {
  //     if (user && workoutId) {
  //       getWorkoutProgressFromUser(user.uid, workoutId).then((data) => {
  //         setExercises(data);
  //     console.log(data);
  //       });
  //     }
  //   }, [setExercises, user, workouts, workoutId]);

  const addProgress = () => {
    console.log(exercises);
    navigate("/workout/" + courseId + "/" + workoutId + "/add")
  };

  const handleBackButton = () => {
    navigate("/selectworkout/" + courseId);
  };

  return (
    <div className="">
      <div className="w-full h-full md:pt-12 pb-48">
        <main className="pt-10">
          <p className="text-start text-2xl font-medium mb-2 md:mb-6 md:text-6xl">
            {course[0].nameRU}
          </p>
          <div className="gap-2 text-[18px] flex-row md:flex md:gap-4 pb-10 md:text-3xl ">
            <p className="">
              <span className="md:underline md:underline-offset-8">
                {workout[0].name}
              </span>
              <span>{" / "}</span>
              {workout[0].course ? (
                <span>
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

            <div className="flex flex-col w-full md:flex-row gap-14">
              <div className="flex flex-col text-start text-lg">
                <div className="pb-5">
                  {workout[0].exercises
                    ? workout[0].exercises.map((exercise, index) => (
                        <Exercise
                          exercise={exercise}
                          order={index}
                          // progress={workoutProgress}
                          key={index}
                        />
                      ))
                    : ""}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-end">
              <div className="flex justify-center md:block">
                <button
                  onClick={addProgress}
                  className="btn-primary mt-7 flex pl-12 pr-12 pt-3 pb-3"
                >
                  Заполнить свой прогресс
                </button>
              </div>
              {/* {isAddProgressOpen && (
                <AddProgress
                  workoutId={workoutId}
                  setIsAddProgressOpen={setIsAddProgressOpen}
                />
              )} */}
              <button
                className="btn-primary w-full md:w-52 h-[52px]"
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
