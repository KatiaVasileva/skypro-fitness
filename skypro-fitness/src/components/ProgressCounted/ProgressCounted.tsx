type ProgressCountedPropsType = {
    courseId: string | undefined;
    workoutId: string | undefined;
  };

import { useNavigate } from "react-router-dom";

export const ProgressCounted = ({ courseId, workoutId }: ProgressCountedPropsType) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/workout/" + courseId + "/" + workoutId);
  };

  return (
    <div className="w-full h-full overflow-x-hidden fixed z-10 bg-dark-gray/50 top-0 left-0 cursor-pointer" onClick={handleOnClick}>
      <div className="block w-screen min-h-screen mx-auto my-0">
        <div className="h-screen flex items-center">
          <div className="flex flex-col items-center gap-[30px] bg-white w-[323px] md:w-[426px] h-[278px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[40px] py-[40px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
            <div className="h-[100px] w-[278px] text-center">
              <p className="text-[28px] md:text-[36px] text-black font-medium mb-7">
                Ваш прогресс засчитан!
              </p>
            </div>
            <img
              src="/img/Check-in-Circle.png"
              className="w-16 h-16 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
