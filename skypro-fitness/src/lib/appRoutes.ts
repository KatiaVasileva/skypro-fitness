export const AppRoutes = {
  LOGIN: "/login",
  REGISTER: "/register",
  MAIN: "/",
  COURSE: "/course/:id",
  COURSE_LOGIN: "/course/:id/login",
  COURSE_REGISTER: "/course/:id/register",
  WORKOUT: "/workout/:course_id/:workout_id",
  ADD_PROGRESS: "/workout/:course_id/:workout_id/add",
  ACCOUNT: "/account",
  EXIT: "/exit",
  NOT_FOUND: "*",
  SELECT_WORKOUT:"/account/selectworkout/:id",
  RESET: "/account/reset",
  NEWPASSWORD: "/account/newpassword",
  PROGRESS_COUNTED: "/workout/:course_id/:workout_id/counted"
};
