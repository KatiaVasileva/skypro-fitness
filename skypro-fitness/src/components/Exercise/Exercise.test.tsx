/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as router from "react-router";
import UserProvider from "../../context/UserContext";
import CoursesProvider from "../../context/CoursesContext";
import { BrowserRouter } from "react-router-dom";
import WorkoutProvider from "../../context/WorkoutContext";
import Exercise from "./Exercise";

const navigate = jest.fn();

describe("Exercise component", () => {
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <UserProvider>
          <CoursesProvider>
            <WorkoutProvider>
              <Exercise exercise={{
                            name: "",
                            quantity: 0,
                            progressWorkout: 0
                        }} courseId={undefined} workoutId={undefined} />
            </WorkoutProvider>
          </CoursesProvider>
        </UserProvider>
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
