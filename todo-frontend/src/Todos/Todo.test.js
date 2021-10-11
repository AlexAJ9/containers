import React from "react";
import Todo from "./Todo";

import { render } from "@testing-library/react";
test("Todo component", () => {
  const todo = {
    text: "testText",
    done: false,
  };
  const component = render(<Todo todo={todo} />);
  expect(component.container).toHaveTextContent("testText");
});
