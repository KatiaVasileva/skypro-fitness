export const Account = () => {
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
                    <img src="/img/profile2.png" alt="Аватар"/>
                  </div>
                  <div className="flex-col flex gap-[30px]">
                    <div className="flex flex-col gap-[10px]">
                      <p className="text-black text-3xl font-medium mb-7">
                        Сергей
                      </p>
                      <div>
                        <p className="text-gray-600">Логин: sergey.petrov96</p>
                        <p className="text-gray-600">Пароль: 4fKhdj880d</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button className="bg-green text-black px-6 py-2 rounded-full transition hover:bg-lime-500">
                        Изменить пароль
                      </button>
                      <button className="bg-white text-black px-12 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Йога */}
                <div className="flex flex-col gap-7 bg-white rounded-3xl relative cursor-pointer shadow-md">
                  <img className="w-full" src="/img/workout_1.png" />
                  <img
                    className="absolute top-4 right-4"
                    src="/img/remove.png"
                  />
                  <div className="mx-7">
                    <h3 className="text-3xl font-semibold pb-6 text-black">
                      Йога
                    </h3>
                    <div className="flex flex-row flex-wrap gap-1 mb-2">
                      <div className="flex flex-row flex-wrap gap-2 w-28 h-9 bg-light-gray rounded-3xl items-center pl-2.5">
                        <img className="h-4 w-4" src="./img/calendar.png"></img>
                        <p className="text-black">25 дней</p>
                      </div>
                      <div className="flex flex-row gap-2 w-44 h-9 bg-light-gray rounded-3xl items-center pl-2.5">
                        <img className="h-4 w-4" src="./img/time.png"></img>
                        <p className="text-black">20-50 мин/день</p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 w-32 h-9 bg-light-gray rounded-3xl items-center pl-2.5 mb-2">
                      <img className="h-4 w-4" src="/img/difficulty.png"></img>
                      <p className="text-black">Сложность</p>
                    </div>
                    <div className="p-4 mt-4">
                      <p className="text-gray-600">Прогресс 40%</p>
                      <div className="w-[300px] bg-light-gray rounded-full h-2.5 mt-1">
                        <div
                          className="bg-blue h-2.5 rounded-full"
                          style={{ width: "40%" }}
                        ></div>
                      </div>
                    </div>
                    <button className="bg-green mb-3 text-black w-full py-3 rounded-[46px] mt-4 hover:bg-lime-500 transition">
                      Продолжить
                    </button>
                  </div>
                </div>

                {/* Стретчинг */}
                <div className="flex flex-col gap-7 bg-white rounded-3xl relative cursor-pointer shadow-md">
                  <img className="w-full" src="/img/workout_2.png" />
                  <img
                    className="absolute top-4 right-4"
                    src="/img/remove.png"
                  />
                  <div className="mx-7">
                    <h3 className="text-3xl font-semibold pb-6 text-black">
                      Стретчинг
                    </h3>
                    <div className="flex flex-row flex-wrap gap-1 mb-2">
                      <div className="flex flex-row flex-wrap gap-2 w-28 h-9 bg-light-gray rounded-3xl items-center pl-2.5">
                        <img className="h-4 w-4" src="./img/calendar.png"></img>
                        <p className="text-black">25 дней</p>
                      </div>
                      <div className="flex flex-row gap-2 w-44 h-9 bg-light-gray rounded-3xl items-center pl-2.5">
                        <img className="h-4 w-4" src="./img/time.png"></img>
                        <p className="text-black">20-50 мин/день</p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 w-32 h-9 bg-light-gray rounded-3xl items-center pl-2.5 mb-2">
                      <img className="h-4 w-4" src="/img/difficulty.png"></img>
                      <p className="text-black">Сложность</p>
                    </div>
                    <div className="p-4 mt-4">
                      <p className="text-gray-600">Прогресс 0%</p>
                      <div className="w-[300px] bg-light-gray rounded-full h-2.5 mt-1">
                        <div
                          className="bg-blue h-2.5 rounded-full"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                    </div>
                    <button className="bg-green mb-3 text-black w-full py-3 rounded-[46px] mt-4 hover:bg-lime-500 transition">
                      Начать тренировки
                    </button>
                  </div>
                </div>

                {/* Зумба */}
                <div className="flex flex-col gap-7 bg-white rounded-3xl relative cursor-pointer shadow-md">
                  <img className="w-full" src="/img/workout_3.png" />
                  <img
                    className="absolute top-4 right-4"
                    src="/img/remove.png"
                  />
                  <div className="mx-7">
                    <h3 className="text-3xl font-semibold pb-6 text-black">
                      Зумба
                    </h3>
                    <div className="flex flex-row flex-wrap gap-1 mb-2">
                      <div className="flex flex-row flex-wrap gap-2 w-28 h-9 bg-light-gray rounded-3xl items-center pl-2.5">
                        <img className="h-4 w-4" src="./img/calendar.png"></img>
                        <p className="text-black">25 дней</p>
                      </div>
                      <div className="flex flex-row gap-2 w-44 h-9 bg-light-gray rounded-3xl items-center pl-2.5">
                        <img className="h-4 w-4" src="./img/time.png"></img>
                        <p className="text-black">20-50 мин/день</p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 w-32 h-9 bg-light-gray rounded-3xl items-center pl-2.5 mb-2">
                      <img className="h-4 w-4" src="/img/difficulty.png"></img>
                      <p className="text-black">Сложность</p>
                    </div>
                    <div className="p-4 mt-4">
                      <p className="text-gray-600">Прогресс 100%</p>
                      <div className="w-[300px] bg-light-gray rounded-full h-2.5 mt-1">
                        <div
                          className="bg-blue h-2.5 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <button className="bg-green mb-3 text-black w-full py-3 rounded-[46px] mt-4 hover:bg-lime-500 transition">
                      Начать заново
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
