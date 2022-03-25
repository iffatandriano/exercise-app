import React from "react";

function Artist({ className, children }) {
  return <span className={className}>{children}</span>;
}

export default Artist;
