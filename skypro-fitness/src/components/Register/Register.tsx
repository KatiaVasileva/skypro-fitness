import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import React, { useState } from "react";
import { AppRoutes } from "../../lib/appRoutes";
import { regUser } from "../../api/apiUser";

export default function Register() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const onInputChange: React.ComponentProps<"input">["onChange"] = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.email || formValues.email.trim().length === 0) {
      setError("Не введено имя пользователя");
      return;
    }

    if (!formValues.password || formValues.password.trim().length === 0) {
      setError("Не введён пароль");
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      const response = await regUser({
        email: formValues.email,
        password: formValues.password,
      });
      setError(null);
      setUser(response);
      navigate(AppRoutes.MAIN);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("почта уже используется")) {
          setError("Данная почта уже используется. Попробуйте войти.");
        } else {
          setError("Произошла ошибка. Попробуйте снова.");
        }
        console.error(error.message);
      } else {
        console.error("Unknown error:", error);
        setError("Произошла неизвестная ошибка.");
      }
    }
  };

  return (
    <div className="inset-0 flex items-center justify-center bg-[#eaeef6] absolute z-10 bg-dark-gray/50 top-0 left-0">
      <div className="relative w-[360px] bg-white shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] px-[60px] pt-[50px] pb-[35px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
        <div className="flex justify-center mb-4">
          <img src="../../public/logoModal.png" alt="logo_modal" />
        </div>

        <form
          className="flex flex-col items-center pt-[32px]"
          onSubmit={onRegister}
        >
          <div className="gap-2.5">
            <input
              className="h-[52px] w-[280px] bg-white px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] mb-2.5 placeholder:font-normal placeholder:text-lg placeholder:text-[#94a6be] focus:outline-none"
              type="text"
              value={formValues.email}
              placeholder="Эл.почта"
              name="email"
              onChange={onInputChange}
            />

            <input
              className="h-[52px] w-[280px] bg-white px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] mb-2.5 placeholder:font-normal placeholder:text-lg placeholder:text-[#94a6be] focus:outline-none"
              type="password"
              value={formValues.password}
              placeholder="Пароль"
              name="password"
              onChange={onInputChange}
            />

            <input
              className="h-[52px] w-[280px] bg-white px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] placeholder:font-normal placeholder:text-lg placeholder:text-[#94a6be] focus:outline-none"
              type="password"
              value={formValues.confirmPassword}
              placeholder="Повторите пароль"
              name="confirmPassword"
              onChange={onInputChange}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            className="w-[280px] h-[52px] bg-[#BCEC30] text-[18px] font-normal text-black mt-8 mb-2.5 rounded-[46px] hover:bg-[#C6FF00] active:bg-[#000000] active:text-white"
            type="submit"
          >
            Зарегистрироваться
          </button>

          <Link
            className="w-[280px] h-[52px] border border-black text-[18px] text-black flex items-center justify-center bg-white rounded-[46px] hover:bg-[#F7F7F7] active:bg-[#E9ECED]"
            to={AppRoutes.LOGIN}
          >
            Войти
          </Link>
        </form>
      </div>
    </div>
  );
}
