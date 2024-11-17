import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

    setLoginError(null);
    setPasswordError(null);

    let hasError = false;

    if (!formValues.email) {
      setLoginError("Введите логин");
      hasError = true;
    }

    if (!formValues.password) {
      setPasswordError("Введите пароль");
      hasError = true;
    }

    if (hasError) return;

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
      console.error(error);
      setPasswordError(
        "Пароль и/или логин введен неверно, попробуйте еще раз. Восстановить пароль?"
      );
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
    <div className="inset-0 flex items-center justify-center fixed z-10 bg-gray/50 top-0 left-0">
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
            <div className="flex flex-col w-full mb-4 items-center gap-[10px]">
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
              {loginError && (
                <p className="text-red-500 text-sm">{loginError}</p>
              )}

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
            {passwordError && (
              <>
                <p className="text-red-500 text-sm">
                  Пароль введен неверно, попробуйте еще раз.{" "}
                  <Link
                    to={AppRoutes.RESET}
                    state={{ email: formValues.email }}
                    className="underline text-red-500 hover:text-red-700"
                  >
                    Восстановить пароль?
                  </Link>
                </p>
              </>
            )}
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
