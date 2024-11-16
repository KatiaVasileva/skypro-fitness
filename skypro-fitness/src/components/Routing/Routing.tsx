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
import AddProgressPage from "../../pages/AddProgressPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ProgressCountedPage from "../../pages/ProgressCountedPage";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path={AppRoutes.ACCOUNT} element={<AccountPage />}>
            <Route path={AppRoutes.RESET} element={<ResetPage />} />
            <Route
              path={AppRoutes.SELECT_WORKOUT}
              element={<SelectWorkoutPage />}
            />
          </Route>

          <Route path={AppRoutes.WORKOUT} element={<WorkoutVideoPage />}>
            <Route
              path={AppRoutes.ADD_PROGRESS}
              element={<AddProgressPage />}
            />
             <Route
              path={AppRoutes.PROGRESS_COUNTED}
              element={<ProgressCountedPage />}
            />
          </Route>
 
        </Route>

        <Route path={AppRoutes.MAIN} element={<MainPage />}>
          <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
          <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
        </Route>

        <Route path={AppRoutes.COURSE} element={<CoursePage />}>
          <Route path={AppRoutes.COURSE_LOGIN} element={<LoginPage />} />
          <Route path={AppRoutes.COURSE_REGISTER} element={<RegisterPage />} />
        </Route>
        <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
