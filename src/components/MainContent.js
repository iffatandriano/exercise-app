import React from "react";

// prop-types
import PropTypes from "prop-types";

function MainContent({ children }) {
  return (
    <div className="bg-abuContainer min-h-screen w-full">
      <div
        className="container bg-white m-auto min-h-screen"
        style={{ maxWidth: "500px" }}
      >
        {children}
      </div>
    </div>
  );
}

MainContent.propTypes = {
  children: PropTypes.any,
};

export default MainContent;
