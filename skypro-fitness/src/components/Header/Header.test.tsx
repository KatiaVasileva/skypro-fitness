/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import * as router from "react-router";
import UserProvider from "../../context/UserContext";
import CoursesProvider from "../../context/CoursesContext";

const navigate = jest.fn();

describe("Header component", () => {
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("renders correctly", () => {
    const { container } = render(
      <UserProvider>
        <CoursesProvider>
          <Header />
        </CoursesProvider>
      </UserProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
