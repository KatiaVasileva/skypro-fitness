import { Outlet, useParams } from "react-router-dom";
import Course from "../components/Course/Course";
import Header from "../components/Header/Header";

export default function CoursePage() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <Course courseId={id} />
      <Outlet />
    </>
  );
}
