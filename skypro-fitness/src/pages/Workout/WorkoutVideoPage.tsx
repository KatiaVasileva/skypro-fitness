"use client";
import { Link, Outlet } from "react-router-dom";
import { AppRoutes } from "../../lib/appRoutes";

export default function WorkoutVideoPage() {
  const addProgress = () => {
 
  };

  const userProfil = () => {
    alert("переход в профиль пользователя");
  };

  return (
    <>
    <Outlet/>
      <div className="w-full h-full bg-bgclr md: pt-12 pb-48">
        <header>
          <div className="flex justify-between">
            <div className="w-44 h-7 cursor-pointer">
              <img src="/logo.png" alt="logo" />
            </div>
            <div>
              <div className="flex items-center gap-1 md:gap-3.5">
                <svg
                  className="h-7 md:h-10 w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 42 42"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M41.8337 21C41.8337 32.5059 32.5063 41.8333 21.0003 41.8333C9.49439 41.8333 0.166992 32.5059 0.166992 21C0.166992 9.49403 9.49439 0.166626 21.0003 0.166626C32.5063 0.166626 41.8337 9.49403 41.8337 21ZM33.5003 28.4404C33.5003 31.8922 27.9039 35.5833 21.0003 35.5833C14.0968 35.5833 8.50033 31.8922 8.50033 28.4404C8.50033 24.9887 14.0968 23.0833 21.0003 23.0833C27.9039 23.0833 33.5003 24.9887 33.5003 28.4404ZM21.0003 18.9166C24.4521 18.9166 27.2503 16.1184 27.2503 12.6666C27.2503 9.21485 24.4521 6.41663 21.0003 6.41663C17.5485 6.41663 14.7503 9.21485 14.7503 12.6666C14.7503 16.1184 17.5485 18.9166 21.0003 18.9166Z"
                    fill="#D9D9D9"
                  />
                </svg>
                <div
                  onClick={userProfil}
                  className="md:flex flex-row items-center gap-2 cursor-pointer"
                >
                  <p className="hidden text-2xl md:inline-block">Том</p>
                  <div className="w-2 h-2 border-b-2 border-r-2 border-black rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="pt-14">
          <p className="text-start text-2xl font-medium md:mb-6 md:text-6xl">Йога</p>
          <div className="gap-2 text-[18px] flex md:flex md:gap-4 pb-10 md:text-3xl ">
            <p className="underline underline-offset-8">Красота и здоровье</p>
            <span>/</span>
            <p className="underline underline-offset-8 ">Йога на каждый день</p>
            <span>/</span>
            <p className="underline underline-offset-8 "> 2 день</p>
          </div>
          <div>
            <iframe
              className="w-full h-[400px] rounded-2xl pb-10 flex justify-center md:h-[600px]"
              src="https://www.youtube.com/embed/oqe98Dxivns?si=jxDer5vcg4egdkvO"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
          <div className="w-max bg-white rounded-lg drop-shadow-lg px-10 py-10">
            <p className="text-start text-3xl pb-5">Упражнения тренировки 2</p>
            <div className="flex flex-col md:flex-row gap-14">
              <div className="flex flex-col text-start text-lg w-max">
                <div className="pb-5">
                  <p>Наклоны вперед 0%</p>
                  <progress
                    className="h-1.5 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-custom [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-lightBlue"
                    max="100"
                    value="50"
                  />
                </div>
                <div className="pb-5">
                  <p>Наклоны назад 0%</p>
                  <progress
                    className="h-1.5 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-custom [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-lightBlue"
                    max="100"
                    value="50"
                  />
                </div>
                <div>
                  <p className="w-max">Поднятие ног, согнутых в коленях 0%</p>
                  <progress
                    className="h-1.5 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-custom [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-lightBlue"
                    max="100"
                    value="50"
                  />
                </div>
              </div>
              <div className="flex flex-col text-start text-lg w-max">
                <div className="pb-5">
                  <p>Наклоны вперед 0%</p>
                  <progress
                    className="h-1.5 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-custom [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-lightBlue"
                    max="100"
                    value="50"
                  />
                </div>
                <div className="pb-5">
                  <p>Наклоны назад 0%</p>
                  <progress
                    className="h-1.5 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-custom [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-lightBlue"
                    max="100"
                    value="50"
                  />
                </div>
                <div>
                  <p className="w-max">Поднятие ног, согнутых в коленях 0%</p>
                  <progress
                    className="h-1.5 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-custom [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-lightBlue"
                    max="100"
                    value="50"
                  />
                </div>
              </div>{" "}
              <div className="flex flex-col text-start text-lg w-max">
                <div className="pb-5">
                  <p>Наклоны вперед 0%</p>
                  <progress
                    className="h-1.5 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-custom [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-lightBlue"
                    max="100"
                    value="50"
                  />
                </div>
                <div className="pb-5">
                  <p>Наклоны назад 0%</p>
                  <progress
                    className="h-1.5 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-custom [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-lightBlue"
                    max="100"
                    value="50"
                  />
                </div>
                <div>
                  <p className="w-max">Поднятие ног, согнутых в коленях 0%</p>
                  <progress
                    className="h-1.5 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-custom [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-lightBlue"
                    max="100"
                    value="50"
                  />
                </div>
              </div>
            </div>
            <Link className="flex justify-center md:block" to={AppRoutes.ADDPROGRESS}>
              <button
                onClick={addProgress}
                className="text-black mt-10 flex pl-12 pr-12 pt-3 pb-3 bg-btnbg rounded-full md:hover:scale-[1.05]"
              >
                Заполнить свой прогресс
              </button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
