import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { AppRoutes } from "../../lib/appRoutes";
import { loginUser } from "../../api/apiUser";
import { useUserContext } from "../../hooks/useUserContext";

export const Login = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
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
      navigate(AppRoutes.MAIN);
    } catch (error: unknown) {
      console.error(error);
      setPasswordError(
        "Пароль введен неверно, попробуйте еще раз. Восстановить пароль?"
      );
    }
  };

  return (
    <div className="block w-full h-full overflow-x-hidden fixed z-10 bg-gray/50 top-0 left-0">
      <div className="flex fixed inset-0 items-center justify-center z-50 ">
        <div className="flex bg-white rounded-[30px] w-[360px] min-h-[425px] p-[40px] flex-col items-center gap-[48px] mx-auto">
          <img
            className="w-[220px] h-[35px] mx-auto"
            src="/img/logo.png"
            alt="logo_modal"
          />
          <form
            onSubmit={onLogin}
            className="w-full flex flex-col items-center gap-[10px]"
          >
            <div className="flex flex-col w-full mb-4 items-center gap-[10px]">
              <input
                type="email"
                placeholder="Электронная почта"
                name="email"
                value={formValues.email}
                onChange={onInputChange}
                className={`w-[280px] h-[52px] text-black bg-white border rounded-[8px] p-[16px_18px] ${
                  loginError ? "border-red-500" : "border-[#D0CECE]"
                } text-[#D0CECE]`}
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
                  passwordError ? "border-red-500" : "border-[#D0CECE]"
                } text-[#D0CECE]`}
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
              <button className="bg-[#BCEC30] text-black w-full h-[52px] rounded-[46px] py-[16px] px-[26px] hover:bg-[#C6FF00] border-none active:bg-black active:text-white">
                Войти
              </button>
              <button
                className="border border-black text-black w-full h-[52px] rounded-[46px] py-[16px] px-[26px] bg-white hover:bg-[#F7F7F7] active:bg-[#E9ECED] active:text-black"
                onClick={() => navigate(AppRoutes.REGISTER)}
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
