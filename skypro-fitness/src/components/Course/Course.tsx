import { useNavigate } from "react-router-dom";
import { useCoursesContext } from "../../hooks/useCoursesContext";
import { useUserContext } from "../../hooks/useUserContext";
import { useEffect, useState } from "react";
import {
  addCourseToUser,
  deleteCourseFromUser,
  getUserCourses,
} from "../../api/apiCourses";

const benefitList = [
  "проработка всех групп мышц",
  "тренировка суставов",
  "улучшение циркуляции крови",
  "упражнения заряжают бодростью",
  "помогают противостоять стрессам",
];

function Course({ courseId }: { courseId: string | undefined }) {
  const [color, setColor] = useState("bg-white");
  const { courses } = useCoursesContext();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const course = courses.filter((course) => course.order === Number(courseId));
  const fittingList = course[0].fitting;
  const directionsList = course[0].directions;
  const [userCourses, setUserCourses] = useState<Array<string>>([]);

  useEffect(() => {
    if (user) {
      getUserCourses(user!.uid).then((data) => {
        let userCourses: Array<string> = [];
        if (data) {
          userCourses = Object.keys(data);
        }
        setUserCourses(userCourses);
      });
    }
  }, [user, userCourses]);

  const handleLoginButton = () => {
    navigate("/course/" + courseId + "/login");
  };

  const handleAddCourseButton = () => {
    addCourseToUser(user!.uid, course[0]._id);
  };

  const handleDeleteCourseButton = () => {
    deleteCourseFromUser(user!.uid, course[0]._id);
  };

  useEffect(() => {
    switch (course[0].nameEN) {
      case "Yoga":
        setColor("bg-yellow");
        break;
      case "StepAirobic":
        setColor("bg-salmon");
        break;
      case "BodyFlex":
        setColor("bg-purple");
        break;
      case "Zumba":
        setColor("bg-orange");
        break;
      case "Stretching":
        setColor("bg-blueDark");
        break;
      default:
        setColor("bg-white");
    }
  }, [course]);

  return (
    <>
      <div className="container">
        <div className="flex flex-col mt-14 gap-14">
          <div
            className={`relative h-[389px] ${color} rounded-3xl bg-cover bg-center p-4 md:h-80`}
          >
            <h3 className="text-6xl text-white font-medium leading-tight text-left p-10 invisible md:visible z-30 absolute">
              {course[0].nameRU}
            </h3>

            <picture>
              <source
                srcSet={`/img/coursemin_${courseId}.png`}
                media="(max-width: 1000px)"
              />
              <img
                src={`/img/course_${courseId}.png`}
                className="absolute bottom-0 right-0 md:h-full rounded-3xl"
                alt="sport"
              />
            </picture>
          </div>
          <div>
            <h3 className=" text-black font-medium text-2xl/6 text-left md:font-semibold md:text-4xl pb-6 md:pb-10">
              Подойдет для вас, если:
            </h3>
            <div className="flex flex-col gap-4 md:flex-row justify-between">
              {fittingList.map((item, index) => (
                <div
                  className="flex gap-x-6 bg-gradient-to-r from-slate-950 to-black md:w-[368px] min-h-36 rounded-3xl p-5"
                  key={index}
                >
                  <div className="text-green text-7xl font-medium leading-normal">
                    {index + 1}
                  </div>
                  <p className="self-center text-left text-lg/6 text-white lg:text-2xl/6">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <h3 className="text-black font-medium text-2xl/6  text-left md:text-4xl md:font-semibold pb-10">
              Направления
            </h3>
            <div className="-z-50 bg-green text-black rounded-3xl">
              <ul
                role="list"
                className="list-inside pt-7 px-7 max-w-6xl md:columns-3"
              >
                {directionsList.map((item, index) => (
                  <li
                    className="flex items-center gap-2 pb-6 md:pb-8"
                    key={index}
                  >
                    <svg
                      width="19.5"
                      height="19.5"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.4637 4.36751C12.6202 3.70443 12.6984 3.3729 12.8242 3.29823C12.9326 3.23392 13.0674 3.23392 13.1758 3.29823C13.3016 3.3729 13.3798 3.70443 13.5363 4.36751L14.2997 7.60302C14.5837 8.80636 14.7257 9.40803 15.0343 9.89596C15.3071 10.3274 15.6726 10.6929 16.104 10.9657C16.592 11.2743 17.1936 11.4163 18.397 11.7003L21.6325 12.4637C22.2956 12.6202 22.6271 12.6984 22.7018 12.8242C22.7661 12.9326 22.7661 13.0674 22.7018 13.1758C22.6271 13.3016 22.2956 13.3798 21.6325 13.5363L18.397 14.2997C17.1936 14.5837 16.592 14.7257 16.104 15.0343C15.6726 15.3071 15.3071 15.6726 15.0343 16.104C14.7257 16.592 14.5837 17.1936 14.2997 18.397L13.5363 21.6325C13.3798 22.2956 13.3016 22.6271 13.1758 22.7018C13.0674 22.7661 12.9326 22.7661 12.8242 22.7018C12.6984 22.6271 12.6202 22.2956 12.4637 21.6325L11.7003 18.397C11.4163 17.1936 11.2743 16.592 10.9657 16.104C10.6929 15.6726 10.3274 15.3071 9.89596 15.0343C9.40803 14.7257 8.80636 14.5837 7.60301 14.2997L4.36751 13.5363C3.70443 13.3798 3.3729 13.3016 3.29823 13.1758C3.23392 13.0674 3.23392 12.9326 3.29823 12.8242C3.3729 12.6984 3.70443 12.6202 4.36751 12.4637L7.60302 11.7003C8.80636 11.4163 9.40803 11.2743 9.89596 10.9657C10.3274 10.6929 10.6929 10.3274 10.9657 9.89596C11.2743 9.40803 11.4163 8.80636 11.7003 7.60301L12.4637 4.36751Z"
                        fill="black"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-[156px] flex flex-col-reverse md:flex md:flex-row md:w-full md:mt-[102px] md:rounded-xl md:shadow-2xl md:min-h-[486px] md:bg-white">
          <div className="flex flex-col gap-7 z-20 justify-items-center p-7 max-md:max-w-[343px] md:w-[517px] md:p-10 bg-white max-md:rounded-xl max-md:shadow-2xl ">
            <h3 className="text-black text-3xl font-medium text-left lg:text-6xl">
              Начните путь к новому телу
            </h3>
            <ul className="text-gray text-lg leading-5 font-normal list-outside text-left md:text-xl/8 lg:text-2xl/9 ml-4 ">
              {benefitList.map((item, index) => (
                <li className="max-md:pb-[8px] list-disc" key={index}>
                  {item}
                </li>
              ))}
            </ul>
            {!user && (
              <button
                className="btn-primary text-base place-self-center w-full h-[50px] md:text-lg md:h-[52px]"
                onClick={handleLoginButton}
              >
                <a>Войдите, чтобы добавить курс</a>
              </button>
            )}
            {user && !userCourses.includes(course[0]._id) && (
              <button
                className="btn-primary text-base place-self-center w-full h-[50px] md:text-lg md:h-[52px]"
                onClick={handleAddCourseButton}
              >
                <a>Добавить курс</a>
              </button>
            )}
            {user && userCourses.includes(course[0]._id) && (
              <button
                className="btn-primary text-base place-self-center w-full h-[50px] md:text-lg md:h-[52px]"
                onClick={handleDeleteCourseButton}
              >
                <a>Удалить курс</a>
              </button>
            )}
          </div>

          <div className="relative">
            <img
              src="/img/blackvector.png"
              className="absolute bottom-[150px] left-40 max-md:w-[32px] max-md:h-[27px] md:top-[118px] md:left-10 lg:top-[32px] lg:left-56"
              alt="blackline"
            />
            <img
              className="absolute -z-10 bottom-[-100px] inset-x-0 md:relative md:top-56 md:left-0 md:rotate-2 lg:top-[86px] lg:-left-4 md:z-10"
              src="/img/vector.png"
              alt="greenline"
            />
            <img
              className="absolute z-0 bottom-[-100px] left-[46px] w-[313px] h-[348px] md:top-14 md:left-2 lg:h-[542px] lg:w-[487px] lg:-top-20 lg:left-28 md:z-10"
              src="/img/addcoursepic.png"
              alt="sportsman"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Course;
