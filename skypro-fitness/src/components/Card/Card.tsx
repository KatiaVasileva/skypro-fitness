import { useNavigate } from "react-router-dom";
import { CourseType } from "../../types/CourseType.type";
import { AppRoutes } from "../../lib/appRoutes";
import { useUserContext } from "../../hooks/useUserContext";
import { useEffect, useState } from "react";
import {
  addCourseToUser,
  deleteCourseFromUser,
  getUserCourses,
} from "../../api/apiCourses";
import { CourseAdded } from "../popups/CourseAdded/CourseAdded";

function Card({ course }: { course: CourseType }) {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [isAddCoursePressed, setIsAddCoursePressed] = useState(false);
  const [isDeleteCoursePressed, setIsDeleteCoursePressed] = useState(false);
  const [userCourses, setUserCourses] = useState<Array<string>>([]);

  useEffect(() => {
    if (user) {
      getUserCourses(user.uid).then((data) => {
        let userCourses: Array<string> = [];
        if(data) {
          userCourses = Object.keys(data);
        }
        setUserCourses(userCourses);
      });
    }
  }, [user, userCourses]);

  const handleCardClick = () => {
    navigate("/course/" + course.order);
  };

  const handleCloseWindow = () => {
    navigate(AppRoutes.MAIN);
    setIsAddCoursePressed(false);
    setIsDeleteCoursePressed(false);
  };

  const handleAddCourseButton = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!user) {
      return alert("Необходимо авторизоваться");
    }

    if (user) {
      addCourseToUser(user.uid, course._id);
      setIsAddCoursePressed(true);
    }
  };

  const handleDeleteCourseButton = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();

    deleteCourseFromUser(user!.uid, course._id);
    setIsDeleteCoursePressed(true);
  };

  return (
    <>
      <div
        className="flex flex-col gap-7 bg-white w-[343px] md:w-[360px] rounded-3xl relative cursor-pointer shadow-md"
        onClick={handleCardClick}
      >
        <img className="w-full" src={`/img/workout_${course.order}.png`} />

        {(!user || !userCourses.includes(course._id)) && (
          <img
            className="absolute top-4 right-4"
            src="/img/circle.png"
            onClick={handleAddCourseButton}
            alt="Добавить курс"
          />
        )}

        {userCourses.includes(course._id) && user && (
          <img
            className="absolute top-4 right-4"
            src="/img/circle-minus.png"
            onClick={handleDeleteCourseButton}
            alt="Удалить курс"
          />
        )}

        <div className="mx-6">
          <h3 className="text-3xl font-semibold pb-6 text-black">
            {course.nameRU}
          </h3>
          <div className="flex flex-row flex-wrap gap-1 mb-2">
            <div className="flex flex-row flex-wrap gap-1 w-[103px] h-9 bg-light-gray rounded-3xl items-center pl-2.5">
              <img
                className="h-4 w-4"
                src="./img/calendar_3.png"
                alt="Продолжительность курса"
              ></img>
              <p className="text-black">{course.time}</p>
            </div>
            <div className="flex flex-row gap-1 w-[160px] h-9 bg-light-gray rounded-3xl items-center pl-2.5">
              <img
                className="h-4 w-4"
                src="./img/time_3.png"
                alt="Время курса"
              ></img>
              <p className="text-black">{course.duration}</p>
            </div>
          </div>
          <div className="flex flex-row gap-1 w-32 h-9 bg-light-gray rounded-3xl items-center pl-2.5 mb-2">
            <img
              className="h-4 w-4"
              src={`/img/difficulty_${course.difficulty}.png`}
              alt="Сложность"
            ></img>
            <p className="text-black">Сложность</p>
          </div>
        </div>
      </div>
      {(isAddCoursePressed || isDeleteCoursePressed) && (
        <CourseAdded
          onClick={handleCloseWindow}
          isAddCoursePressed={isAddCoursePressed}
          isDeleteCoursePressed={isDeleteCoursePressed}
        />
      )}
    </>
  );
}

export default Card;
