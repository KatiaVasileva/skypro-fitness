import { AppRoutes } from "../../lib/appRoutes";
import { Route, Routes } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import WorkoutVideoPage from "../../pages/WorkoutVideoPage";
import NotFoundPage from "../../pages/NotFoundPage";
import CoursePage from "../../pages/CoursePage";
import ResetPage from "../../pages/ResetPage";
import NewPasswordPage from "../../pages/NewPasswordPage";


export default function Routing() {
  return (
    <>
      <Routes>
        <Route path={AppRoutes.MAIN} element={<MainPage />} />
        <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
        <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
        <Route path={AppRoutes.WORKOUT} element={<WorkoutVideoPage />} />
        <Route path={AppRoutes.COURSE} element={<CoursePage />} />
        <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
        <Route path={AppRoutes.RESET} element={<ResetPage />} />
        <Route path={AppRoutes.NEWPASSWORD} element={<NewPasswordPage />} />
        <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
      </Routes>
    </>
  );
}
