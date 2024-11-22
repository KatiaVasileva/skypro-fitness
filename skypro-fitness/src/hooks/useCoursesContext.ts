import { useContext } from "react";
import { CoursesContext } from "../context/CoursesContext";

export function useCoursesContext() {
    const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useCourses must be used within a UserProvider");
  }
  return context;
}