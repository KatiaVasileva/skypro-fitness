import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { AppRoutes } from "../../lib/appRoutes";
import { regUser } from "../../api/apiUser";
import { useUserContext } from "../../hooks/useUserContext";

export default function Register({
  courseId,
}: {
  courseId: string | undefined;
}) {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const passwordLength = 6;

  const onInputChange: React.ComponentProps<"input">["onChange"] = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.username || formValues.username.trim().length === 0) {
      setError("Не введено имя пользователя");
      return;
    }

    if (!formValues.email || formValues.email.trim().length === 0) {
      setError("Не введена почта");
      return;
    }

    if (!formValues.password || formValues.password.trim().length === 0) {
      setError("Не введён пароль");
      return;
    }

    if (formValues.password.length < passwordLength) {
      setError("Пароль должен содержать не менее 6 символов");
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
        username: formValues.username,
      });
      setError(null);
      setUser(response);
      if (courseId) {
        navigate("/course/" + courseId + "/login");
      } else {
        navigate(AppRoutes.LOGIN);
      }
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

  const handlelCloseButton = () => {
    if (courseId) {
      navigate("/course/" + courseId);
    } else {
      navigate(AppRoutes.MAIN);
    }
  };

  return (
    <div className="inset-0 flex items-center justify-center fixed z-50 bg-gray/50 top-0 left-0">
      <div className="relative w-[360px] bg-white shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] px-[60px] pt-[50px] pb-[35px] rounded-[30px] border-[0.7px] border-solid border-white-gray">
        <button
          onClick={handlelCloseButton}
          className="absolute top-4 right-6 text-gray hover:text-dark-gray text-3xl transition-colors duration-200"
        >
          ×
        </button>
        <div className="flex justify-center mb-4">
          <img src="/img/logo.png" alt="logo_modal" />
        </div>

        <form
          className="flex flex-col items-center pt-[32px]  placeholder:text-white-gray"
          onSubmit={onRegister}
        >
          <div className="gap-2.5">
            <input
              className="h-[52px] w-[280px] text-black bg-white px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] mb-2.5 placeholder:font-normal placeholder:text-lg placeholder:text-white-gray focus:outline-none"
              type="text"
              value={formValues.username}
              placeholder="Имя пользователя"
              name="username"
              onChange={onInputChange}
            />

            <input
              className="h-[52px] w-[280px] text-black bg-white px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] mb-2.5 placeholder:font-normal placeholder:text-lg placeholder:text-white-gray focus:outline-none"
              type="email"
              value={formValues.email}
              placeholder="Эл.почта"
              name="email"
              onChange={onInputChange}
            />

            <input
              className="h-[52px] w-[280px] text-black bg-white px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] mb-2.5 placeholder:font-normal placeholder:text-lg placeholder:text-white-gray focus:outline-none"
              type="password"
              value={formValues.password}
              placeholder="Пароль"
              name="password"
              onChange={onInputChange}
            />

            <input
              className="h-[52px] w-[280px] text-black bg-white px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] placeholder:font-normal placeholder:text-lg placeholder:text-white-gray focus:outline-none"
              type="password"
              value={formValues.confirmPassword}
              placeholder="Повторите пароль"
              name="confirmPassword"
              onChange={onInputChange}
            />
          </div>

          <div className="h-7 mt-2 text-center text-sm">
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <button
            className="w-[280px] h-[52px] bg-[#BCEC30] text-[18px] font-normal text-black mt-8 mb-2.5 rounded-[46px] hover:bg-[#C6FF00] active:bg-[#000000] active:text-white"
            type="submit"
          >
            Зарегистрироваться
          </button>

          <Link
            className="w-[280px] h-[52px] border border-black text-[18px] text-black flex items-center justify-center bg-white rounded-[46px] hover:bg-[#F7F7F7] active:bg-[#E9ECED]"
            to={courseId ? "/course/" + courseId + "/login" : AppRoutes.LOGIN}
          >
            Войти
          </Link>
        </form>
      </div>
    </div>
  );
}
