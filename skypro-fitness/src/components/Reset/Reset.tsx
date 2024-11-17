import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { AppRoutes } from "../../lib/appRoutes";

const Reset = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordLength = 6;

  const handleChangePassword = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("Нет авторизации.");
      return;
    }

    if (newPassword.length < passwordLength) {
      setError("Пароль должен содержать не менее 6 символов");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    const credential = EmailAuthProvider.credential(
      user.email || "",
      currentPassword
    );

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setMessage("Пароль успешно изменен.");
      setTimeout(() => {
        navigate(AppRoutes.ACCOUNT);
      }, 2000);
    } catch (err) {
      setError(
        (err as Error).message || "Ошибка при смене пароля. Попробуйте снова."
      );
    }
  };

  useEffect(() => {
    setError("");
  }, [currentPassword, newPassword, confirmPassword]);

  const handlelCloseButton = () => {
    navigate(AppRoutes.ACCOUNT);
  };

  return (
    <div className="fixed w-full h-full overflow-x-hidden z-10 bg-gray/50 top-0 left-0">
      <div className="block w-full mx-auto my-0">
        <div className="flex fixed inset-0 items-center justify-center z-50 ">
          <div className="relative flex bg-white w-[360px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[60px] py-[50px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5] flex-col items-center">
            <button
              onClick={handlelCloseButton}
              className="absolute top-4 right-6 text-gray hover:text-dark-gray text-3xl transition-colors duration-200"
            >
              ×
            </button>
            <div className="pb-[40px]">
              <img src="/img/logo.png" alt="logo" />
            </div>

            <input
              type="password"
              placeholder="Текущий пароль"
              className="input-class placeholder:text-white-gray"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Новый пароль"
              className="input-class placeholder:text-white-gray"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Повторите пароль"
              className="input-class placeholder:text-white-gray"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="h-[60px] w-[280px] gap-[10px] text-center">
              {message && (
                <span className="text-sm font-normal leading-[19.8px] font-roboto block text-black">
                  {message}
                </span>
              )}
              {error && (
                <span className="text-sm font-normal leading-[19.8px] font-roboto block text-red-500">
                  {error}
                </span>
              )}
            </div>
            <button
              onClick={handleChangePassword}
              className="btn-primary w-[280px] h-[52px] mt-4"
            >
              Подтвердить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
