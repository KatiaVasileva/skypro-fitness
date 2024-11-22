/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as router from "react-router";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "../../../context/UserContext";
import CoursesProvider from "../../../context/CoursesContext";
import WorkoutProvider from "../../../context/WorkoutContext";
import { NewStart } from "./NewStart";

const navigate = jest.fn();

describe("NewStart component", () => {
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <UserProvider>
          <CoursesProvider>
            <WorkoutProvider>
              <NewStart onClick={function (): void {
                            throw new Error("Function not implemented.");
                        } }/>
            </WorkoutProvider>
          </CoursesProvider>
        </UserProvider>
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});