import React from "react";

function Album({ className, children }) {
  return <span className={className}>{children}</span>;
}

export default Album;
