import Course from "../components/Course/Course";
import Header from "../components/Header/Header";

export default function CoursePage() {
  return (
    <>
      <Header isAuth={false} />
      <Course />
    </>
  );
}
