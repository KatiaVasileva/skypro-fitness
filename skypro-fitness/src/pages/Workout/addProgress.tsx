"use client";

import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../lib/appRoutes";

export const AddProgress = () => {
  const nav = useNavigate();
  const closeModal = () => {
    nav(AppRoutes.WORKOUT);
  };

  return (
    <>
      <div className="w-full h-full z-10 fixed bg-blackRgba flex justify-center pt-[250px] -mt-8 -ml-[450px]">
        <div className="w-[426px] bg-while p-[40px] rounded-[30px] absolute">
          <div className="text-start">
            <div className="pb-[48px] flex justify-between">
              <p className="text-[32px]  font-normal">Мой прогресс</p>
              <div onClick={closeModal} className=" z-[1]">
                <svg
                  className="h-[20px] w-[20px] opacity-[20%] cursor-pointer"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="122.878px"
                  height="122.88px"
                  viewBox="0 0 122.878 122.88"
                  enable-background="new 0 0 122.878 122.88"
                  xmlSpace="preserve"
                >
                  <g>
                    <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" />
                  </g>
                </svg>
              </div>
            </div>
            <div
              className="text-[18px] h-[346px] flex flex-col gap-[20px] overflow-y-scroll 
            [&::-webkit-scrollbar]:bg-custom 
            [&::-webkit-scrollbar]:w-[6px] 
            [&::-webkit-scrollbar]:rounded-[10px] 
            [&::-webkit-scrollbar-thumb]:bg-black
            [&::-webkit-scrollbar-thumb]:rounded-[10px]"
            >
              <div>
                <p>Сколько раз вы сделали наклоны вперед?</p>
                <input
                  className="w-[320px] h-[52px] border-2 border-inputBorder rounded-[8px]"
                  type="text"
                />
              </div>
              <div>
                <p>Сколько раз вы сделали наклоны назад?</p>
                <input
                  className="w-[320px] h-[52px] border-2 border-inputBorder rounded-[8px]"
                  type="text"
                />
              </div>

              <div>
                <p>Сколько раз вы сделали поднятие ног, согнутых в коленях?</p>
                <input
                  className="w-[320px] h-[52px] border-2 border-inputBorder rounded-[8px]"
                  type="text"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button className="w-[346px] text-black mt-10 flex pl-[128px] pt-3 pb-3 bg-btnbg rounded-full">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
