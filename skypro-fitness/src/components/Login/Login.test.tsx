/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as router from "react-router";
import UserProvider from "../../context/UserContext";
import CoursesProvider from "../../context/CoursesContext";
import { Login } from "./Login";

const navigate = jest.fn();

describe("Login component", () => {
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("renders correctly", () => {
    const { container } = render(
      <UserProvider>
        <CoursesProvider>
          <Login courseId={undefined} />
        </CoursesProvider>
      </UserProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
