import React from "react";

function LoadingItems() {
  return (
    <div className="w-full flex mt-10 justify-center space-x-2 animate-pulse h-screen">
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-14 h-14 border-4 border-green-400 border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
}

export default LoadingItems;
