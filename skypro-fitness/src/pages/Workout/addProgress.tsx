'use client'
export const AddProgress = () => {
  return (
    <>
      <div className="flex justify-center content-center w-[426px] h-[595.5px] z-50">
        <div className="">
          <p>Мой прогресс</p>
          <p>Сколько раз вы сделали наклоны вперед?</p>
          <input type="text" />
          <p>Сколько раз вы сделали наклоны назад?</p>
          <input type="text" />
          <p>Сколько раз вы сделали поднятие ног, согнутых в коленях?</p>
          <input type="text" />
          <button className="text-black mt-10 flex pl-12 pr-12 pt-3 pb-3 bg-lime-400 rounded-full">
            Сохранить
          </button>
        </div>
      </div>
    </>
  );
};
