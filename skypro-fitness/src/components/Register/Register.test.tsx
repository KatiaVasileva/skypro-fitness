/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as router from "react-router";
import UserProvider from "../../context/UserContext";
import CoursesProvider from "../../context/CoursesContext";
import Register from "./Register";
import { BrowserRouter } from "react-router-dom";

const navigate = jest.fn();

describe("Register component", () => {
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <UserProvider>
          <CoursesProvider>
            <Register courseId={undefined} />
          </CoursesProvider>
        </UserProvider>
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
