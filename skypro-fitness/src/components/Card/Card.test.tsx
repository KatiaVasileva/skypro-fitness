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
import Card from "./Card";

const navigate = jest.fn();

describe("Card component", () => {
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <UserProvider>
          <CoursesProvider>
            <WorkoutProvider>
              <Card course={{
                            _id: "",
                            description: "",
                            difficulty: 0,
                            directions: [],
                            duration: "",
                            fitting: [],
                            nameEN: "",
                            nameRU: "",
                            order: 0,
                            time: "",
                            workouts: []
                        }} />
            </WorkoutProvider>
          </CoursesProvider>
        </UserProvider>
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
