/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as router from "react-router";
import { BrowserRouter } from "react-router-dom";
import { CourseAdded } from "./CourseAdded";
import UserProvider from "../../../context/UserContext";
import CoursesProvider from "../../../context/CoursesContext";
import WorkoutProvider from "../../../context/WorkoutContext";

const navigate = jest.fn();

describe("CourseAdded component", () => {
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <UserProvider>
          <CoursesProvider>
            <WorkoutProvider>
              <CourseAdded onClick={function (): void {
                            throw new Error("Function not implemented.");
                        } } />
            </WorkoutProvider>
          </CoursesProvider>
        </UserProvider>
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
