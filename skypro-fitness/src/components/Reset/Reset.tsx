import { useEffect, useState } from "react";
import { handlePasswordReset } from "../../api/apiUser";

type ResetProps = {
  email: string | undefined; 
};

const Reset = ({ email }: ResetProps) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Вызов handlePasswordReset при монтировании компонента
  useEffect(() => {
    if (email) {
      handlePasswordReset(email)
        .then(() => {
          setMessage(`Ссылка для восстановления пароля отправлена на ${email}`);
        })
        .catch((error) => {
          setError("Ошибка при отправке письма для сброса пароля. Попробуйте снова.");
          console.error("Ошибка:", error);
        });
    } else {
      setError("Email не указан.");
    }
  }, [email]);

  return (
    <div className="block w-full h-full overflow-x-hidden absolute z-10 bg-dark-gray/50 top-0 left-0">
      <div className="block w-full min-h-screen mx-auto my-0">
        <div className="flex fixed inset-0 items-center justify-center z-50 ">
          <div className="flex bg-white w-[360px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[60px] py-[50px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5] flex flex-col items-center">
            <div className="pb-[50px]">
              <img src="/logoModal.png" alt="logo_modal" />
            </div>
            <div className="h-[60px] w-[280px] gap-[10px] text-center">
              {message && (
                <span className="text-lg font-normal leading-[19.8px] font-roboto block text-black">
                  {message}
                </span>
              )}
              {error && (
                <span className="text-lg font-normal leading-[19.8px] font-roboto block text-red-500">
                  {error}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;