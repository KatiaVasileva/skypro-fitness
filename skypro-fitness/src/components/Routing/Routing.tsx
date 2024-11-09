import { AppRoutes } from "../../lib/appRoutes";
import { Route, Routes } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import NotFoundPage from "../../pages/NotFoundPage";
import CoursePage from "../../pages/CoursePage";
import SelectWorkoutPage from "../../pages/SelectWorkoutPage";
import ResetPage from "../../pages/ResetPage";
import AccountPage from "../../pages/AccountPage";
import WorkoutVideoPage from "../../pages/WorkoutVideoPage";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path={AppRoutes.MAIN} element={<MainPage />}>
          <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
          <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
        </Route>

        <Route path={AppRoutes.ACCOUNT} element={<AccountPage />}>
          <Route path={AppRoutes.RESET} element={<ResetPage />} />
        </Route>

        <Route path={AppRoutes.WORKOUT} element={<WorkoutVideoPage />} />
        <Route
          path={AppRoutes.SELECT_WORKOUT}
          element={<SelectWorkoutPage />}
        />
        <Route path={AppRoutes.COURSE} element={<CoursePage />} />
        <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
