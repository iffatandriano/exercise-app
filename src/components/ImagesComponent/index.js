import React from "react";

function Images({ className, urlImage }) {
  return <img className={className} src={urlImage} alt="" />;
}

export default Images;
