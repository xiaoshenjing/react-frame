const tsx = `import React from "react";
import "./{{name}}.scss";

const {{Name}} = () => <div className="{{name}}"></div>;

export default {{Name}};
`;

const test = `import React from "react";
import { render } from "@testing-library/react";
import {{Name}} from "./{{name}}";

test("renders learn react link", () => {
  const { getByText } = render(<{{Name}} />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
`;

const style = `.{{name}} {
  
}
`;

module.exports = { tsx, test, style };
