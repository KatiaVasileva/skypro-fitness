/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Main from "./Main";
import UserProvider from "../../context/UserContext";
import CoursesProvider from "../../context/CoursesContext";
import WorkoutProvider from "../../context/WorkoutContext";

describe("Main component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <UserProvider>
        <CoursesProvider>
          <WorkoutProvider>
            <Main />
          </WorkoutProvider>
        </CoursesProvider>
      </UserProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
