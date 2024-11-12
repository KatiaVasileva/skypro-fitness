import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import { useEffect, useState } from "react";
import { AppRoutes } from "../../lib/appRoutes";
import { getUserCourses } from "../../api/apiCourses";
import MyCard from "../MyCard/MyCard";

export const Account = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const [userCourses, setUserCourses] = useState<Array<string>>([]);

  const handleResetPassword = async () => {
    navigate(AppRoutes.RESET);
  };

  const handleLogoutButton = () => {
    logout();
    navigate(AppRoutes.MAIN);
  };

  useEffect(() => {
    getUserCourses(user!.uid).then((userCourses) => {
      setUserCourses(userCourses);
    });
  }, [user, userCourses]);

  return (
    <div className="container">
      <div className="mt-10 mb:mt-14 mb-7 md:mb-10">
        <p className="text-[24px] md:text-[40px] font-semibold">Профиль</p>
      </div>
      <div className="flex flex-col md:flex-row min-h-64 md:h-64 min-w-[323px] bg-white rounded-3xl shadow-md items-center">
        <div className="py-7 md:pl-7">
          <img
            src="/img/profile2.png"
            className="w-[141px] h-[141px] md:w-[197px] md:h-[197px]"
          />  
        </div>
        <div className="h-50 min-w-[283px] py-7 md:pl-10">
          <p className="text-black text-2xl md:text-3xl font-medium mb-7">
            {user?.displayName}
          </p>
          <p className="text-black text-base md:text-lg font-normal">
            Логин: {user?.email}
          </p>
          <p className="text-black text-base md:text-lg font-normal">
            Пароль: ********
          </p>
          <div className="flex flex-col md:flex-row gap-3 mt-7">
            <button
              className="btn-primary md:w-[200px] h-14 text-black"
              onClick={handleResetPassword}
            >
              Изменить пароль
            </button>
            <button
              className="btn-primary md:w-[192px] h-14 text-black bg-white hover:bg-light-gray border border-black"
              onClick={handleLogoutButton}
            >
              Выйти
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 md:mt-14 mb-7 md:mb-10">
        <p className="text-[24px] md:text-[40px] font-semibold">Мои курсы</p>
      </div>

      {userCourses.length > 0 && (
        <div className="flex flex-row flex-wrap gap-4 md:gap-9 mb-8 mt-9 md:mt-8">
          {userCourses.map((course) => (
            <MyCard courseId={course} key={course} />
          ))}
        </div>
      )}

      {userCourses.length === 0 && (
        <>
          <p className="mb-10 text-xl md:text-2xl font-medium">
            У вас нет приобретенных курсов.
          </p>
          <button
            className="btn-primary w-full md:w-[252px] h-[52px] "
            onClick={() => navigate(AppRoutes.MAIN)}
          >
            Перейти на главную
          </button>
        </>
      )}
    </div>
  );
};
