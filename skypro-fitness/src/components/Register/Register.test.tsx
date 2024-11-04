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

describe("Header component", () => {
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <UserProvider>
          <CoursesProvider>
            <Register />
          </CoursesProvider>
        </UserProvider>
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
