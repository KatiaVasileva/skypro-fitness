/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Main from "./Main";
import UserProvider from "../../context/UserContext";
import CoursesProvider from "../../context/CoursesContext";

describe("Main component", () => {
  it("renders correctly", () => {
    const { container } = render(
    <UserProvider>
      <CoursesProvider>
        <Main />
      </CoursesProvider>
    </UserProvider>);
    expect(container).toMatchSnapshot();
  });
}); 