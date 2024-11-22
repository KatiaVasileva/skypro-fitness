import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../hooks/useUserContext";
import { AppRoutes } from "../../../lib/appRoutes";

export const MyProfile = ({setIsOpen} : {setIsOpen: (isOpen: boolean) => void}) => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  const handleMyProfileButton = () => {
    navigate(AppRoutes.ACCOUNT);
  };

  const handleLogoutButton = () => {
    logout();
    navigate(AppRoutes.MAIN);
    setIsOpen(false);
  };

  return (
    <div className="">
      <div className="block overflow-x-hidden absolute z-50 top-[50px] md:top-[70px] left-[-190px] md:left-[-100px]">
        <div className="bg-white rounded-[30px] w-[266px] min-h-[258px] p-[30px] flex flex-col items-center shadow-md">
          <div className="mb-8 text-lg font-normal">
            <h3 className="text-center">{user ? user.displayName : ""}</h3>
            <p className="text-gray">{user ? user.email : ""}</p>
          </div>

          <button
            className="btn-primary w-52 h-[52px] mb-[10px]"
            onClick={handleMyProfileButton}
          >
            Мой профиль
          </button>
          <button
            className="btn-primary-white text-black w-52 h-[52px]"
            onClick={handleLogoutButton}
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};
