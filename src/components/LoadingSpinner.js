import React from "react";

// prop-types
import PropTypes from "prop-types";

function LoadingSpinner() {
  return (
    <div className="w-full flex items-center justify-center space-x-2 animate-pulse h-screen">
      <div className="w-8 h-8 bg-green-400 rounded-full"></div>
      <div className="w-8 h-8 bg-green-400 rounded-full"></div>
      <div className="w-8 h-8 bg-green-400 rounded-full"></div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  myClass: PropTypes.string,
};

export default LoadingSpinner;
