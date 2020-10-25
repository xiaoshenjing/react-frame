const tsx = `import React from "react";
import "./{{Name}}.scss";

const {{Name}} = () => <div className="{{name}}"></div>;

export default {{Name}};
`;

const style = `.{{name}} {
  
}
`;

module.exports = { tsx, style };
