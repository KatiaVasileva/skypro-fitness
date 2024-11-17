import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { AppRoutes } from "../../lib/appRoutes";
import { loginUser } from "../../api/apiUser";
import { useUserContext } from "../../hooks/useUserContext";

export const Login = ({ courseId }: { courseId: string | undefined }) => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const passwordLength = 6;

    setLoginError(null);
    setPasswordError(null);

    if (!formValues.email) {
      setLoginError("Введите логин");
      return;
    }

    if (!formValues.password) {
      setPasswordError("Введите пароль");
      return;
    }

    if (formValues.password.length < passwordLength) {
      setPasswordError("Пароль должен содержать не менее 6 символов");
      return;
    }

    try {
      const user = await loginUser({
        login: formValues.email,
        password: formValues.password,
      });
      setUser(user);
      if (courseId) {
        navigate("/course/" + courseId);
      } else {
        navigate(AppRoutes.MAIN);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(loginError);
        console.error(passwordError);
      }
      console.error(error);
      setPasswordError("Пароль и/или логин введены неверно, попробуйте еще раз");
    }
  };

  const handleRegisterButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (courseId) {
      navigate("/course/" + courseId + "/register");
    } else {
      navigate(AppRoutes.REGISTER);
    }
  };

  const handlelCloseButton = () => {
    if (courseId) {
      navigate("/course/" + courseId);
    } else {
      navigate(AppRoutes.MAIN);
    }
  };

  return (
    <div className="inset-0 flex items-center justify-center fixed z-50 bg-gray/50 top-0 left-0">
      <div className="relative flex z-auto inset-0 items-center justify-center">
        <button
          onClick={handlelCloseButton}
          className="absolute top-4 right-6 text-gray hover:text-dark-gray text-3xl transition-colors duration-200"
        >
          ×
        </button>
        <div className="flex bg-white rounded-[30px] w-[360px] min-h-[425px] p-[40px] flex-col items-center gap-[48px] mx-auto">
          <img
            className="w-[220px] h-[35px] mx-auto"
            src="/img/logo.png"
            alt="logo_modal"
          />
          <form
            onSubmit={onLogin}
            className="w-full flex flex-col items-center gap-[10px] text-lg"
          >
            <div className="flex flex-col w-full items-center gap-[10px]">
              <input
                type="email"
                placeholder="Электронная почта"
                name="email"
                value={formValues.email}
                onChange={onInputChange}
                className={`w-[280px] h-[52px] text-black bg-white border rounded-[8px] p-[16px_18px] ${
                  loginError ? "border-red-500" : "border-white-gray"
                } placeholder:text-white-gray focus:outline-none`}
              />

              <input
                type="password"
                placeholder="Пароль"
                name="password"
                value={formValues.password}
                onChange={onInputChange}
                className={`w-[280px] h-[52px] text-black bg-white border rounded-[8px] p-[16px_18px] ${
                  passwordError ? "border-red-500" : "border-white-gray"
                } placeholder:text-white-gray focus:outline-none`}
              />
            </div>
            <div className="h-5 text-center">
            {(passwordError || loginError) && (
              <p className="text-red-500 text-sm">
                {loginError}
                {passwordError}
              </p>
            )}
            </div>
            <div className="mt-[24px] flex flex-col w-full items-center gap-[10px]">
              <button className="btn-primary w-full h-[52px] rounded-[46px]">
                Войти
              </button>
              <button
                className="btn-primary-white border border-black text-black w-full h-[52px] rounded-[46px]"
                onClick={handleRegisterButton}
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
