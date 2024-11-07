// import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { auth } from "../../lib/firebaseConfig";

// const NewPassword = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const oobCode = queryParams.get("oobCode");

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (oobCode) {
//       const verifyCode = async () => {
//         try {
//           await verifyPasswordResetCode(auth, oobCode);
//         } catch {
//           setError("Недействительный или истекший код.");
//         }
//       };
//       verifyCode();
//     }
//     return () => {
//       setError(""); // Очистка состояния ошибки при размонтировании
//     };
//   }, [oobCode]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (password === confirmPassword && oobCode) {
//       try {
//         await confirmPasswordReset(auth, oobCode, password);
//         setMessage("Пароль успешно изменен.");
//         setError("");
//       } catch (err) {
//         // Используем err для отображения сообщения об ошибке
//         const errorMessage = (err as Error).message || "Не удалось изменить пароль. Попробуйте еще раз.";
//         setError(errorMessage);
//       }
//     } else {
//       setError("Пароли не совпадают.");
//     }
//   };

//     return (
//       <div className="block w-full h-full overflow-x-hidden absolute z-10 bg-dark-gray/50 top-0 left-0">
//         <div className="w-full min-h-screen mx-auto my-0">
//           <div className="flex fixed inset-0 items-center justify-center z-50 ">
//             <div className="block bg-white w-[360px] h-[363px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[60px] py-[50px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
//               <div className="">
//                 <img src="/logoModal.png" alt="logo_modal" />
//               </div>
//               <form onSubmit={handleSubmit}>
//               <div
//                 className="w-full flex flex-col items-center justify-center pt-[42px]"
//                >
//                 <div className="gap-2.5">
//                   <input
//                     className="input-class"
//                     type="password"
//                     placeholder="Новый пароль"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <input
//                     className="input-class"
//                     type="password"
//                     placeholder="Повторите пароль"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                 </div>
//                 {error && <p className="text-red-500">{error}</p>}
//                 {message && <p className="text-green-500">{message}</p>}
//                 <button
//                   className="btn-primary w-[280px] h-[52px] flex items-center justify-center leading-[19.8px] tracking-[-0.14px] mt-8 mb-2.5"
//                   id="btnEnter"
//                   type="submit"
//                 >
//                   Подтвердить
//                 </button>
//               </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default NewPassword;