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
    <>
      <div className="container">
        <div className="w-full min-h-screen ">
          {/* Профиль */}
          <div>
            <div>
              <div className="mb-10 md:mt-16">
                <p className="text-[40px] font-bold">Профиль</p>
              </div>

              <div className="bg-white flex items-center justify-between mb-6 rounded-3xl shadow-md">
                <div className="flex items-center space-x-6">
                  <div className="py-7 pl-7">
                    <img src="/img/profile2.png" alt="Аватар" />
                  </div>
                  <div className="flex-col flex gap-[30px]">
                    <div className="flex flex-col gap-[10px]">
                      <p className="text-black text-3xl font-medium mb-7">
                        {user?.displayName}
                      </p>
                      <div>
                        <p className="text-gray-600">Логин: {user?.email}</p>
                        <p className="text-gray-600">Пароль: *******</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        className="bg-green text-black px-6 py-2 rounded-full transition hover:bg-lime-500"
                        onClick={handleResetPassword}
                      >
                        Изменить пароль
                      </button>
                      <button
                        className="bg-white text-black px-12 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                        onClick={handleLogoutButton}
                      >
                        Выйти
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Курсы */}
            <div className="mt-8 mb-10">
              <div className="mt-14 mb-10 rounded-lg">
                <p className="text-[40px] font-bold">Мои курсы</p>
              </div>

              {userCourses.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userCourses.map((course) => (
                    <MyCard courseId={course} key={course} />
                  ))}
                </div>
              )}

              {userCourses.length === 0 && (
                <>
                  <p className="mb-10 text-2xl font-medium">У вас нет приобретенных курсов.</p>
                  <button className="btn-primary w-[252px] h-[52px]" onClick={() => navigate(AppRoutes.MAIN)}>Перейти на главную</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
