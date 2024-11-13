import { CourseType } from "../../types/CourseType.type";

function Card({ course }: {course: CourseType}) {
  
  return (
    <div className="flex flex-col gap-7 bg-white w-[360px] rounded-3xl relative cursor-pointer shadow-md">
      <img className="w-full" src={`/img/workout_${course.order}.png`} />
      <img className="absolute top-4 right-4" src="/img/circle.png" alt="add-course"/>
      <div className="mx-7">
        <h3 className="text-3xl font-semibold pb-6 text-black">
          {course.nameRU}
        </h3>
        <div className="flex flex-row flex-wrap gap-1 mb-2">
          <div className="flex flex-row flex-wrap gap-2 w-28 h-9 bg-light-gray rounded-3xl items-center pl-2.5">
            <img className="h-4 w-4" src="./img/calendar.png" alt="course-duration"></img>
            <p className="text-black">{course.time}</p>
          </div>
          <div className="flex flex-row gap-2 w-44 h-9 bg-light-gray rounded-3xl items-center pl-2.5">
            <img className="h-4 w-4" src="./img/time.png" alt="course_time"></img>
            <p className="text-black">{course.duration}</p>
          </div>
        </div>
        <div className="flex flex-row gap-2 w-32 h-9 bg-light-gray rounded-3xl items-center pl-2.5 mb-2">
          <img
            className="h-4 w-4"
            src={`/img/difficulty_${course.difficulty}.png`}
            alt="difficulty"
          ></img>
          <p className="text-black">Сложность</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
