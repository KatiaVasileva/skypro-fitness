import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { CourseType } from "../../types/CourseType.type";
import { getCourses } from "../../api/apiCourses";

function Main() {

  const [courses, setCourses] = useState<Array<CourseType>>([]);
  // const {courses, setCourses} = useCourseContext();

  useEffect(() => {
    getCourses().then((allCourses) => {
      const courses = Object.values(allCourses);
      setCourses(courses);
    })
    .catch(() => {
      // Обработать ошибку через setError
      console.log("Не удалось загрузить данные, попробуйте позже.");
    });
  }, []);
  
  return (
    <div className="container">
      <div className="flex flex-row mt-2 md:mt-16 h-30 gap-4">
        <div className="h-30 basis-full md:basis-3/4">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-medium text-black">
            Начните заниматься спортом и улучшите качество жизни
          </h1>
        </div>
        <div className="hidden md:block h-25 basis-0 md:basis-1/4 relative">
          <div className="bg-green text-3xl p-5 md:w-72 h-25 rounded mb-12 text-black">
            Измени своё тело за полгода!
          </div>
          <img
            className="absolute top-[100px] left-[120px] z-10"
            src="/img/triangle.png"
          />
        </div>
      </div>

      <div className="flex flex-row flex-wrap gap-4 md:gap-9 mb-8 mt-9 md:mt-8">
        {courses.map((course) => (
          <Card course={course} key={course._id} />
        ))}
      </div>

      <div className="flex justify-end md:justify-center ">
        <button className="btn-primary w-32">
          <a href="#top">Наверх ↑</a>
        </button>
      </div>
    </div>
  );
}

export default Main;
