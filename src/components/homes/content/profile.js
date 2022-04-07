import React from "react";
import { useHistory } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/outline";

function Profile({ images_url, profile_name }) {
  const history = useHistory();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <button
      onClick={handleLogOut}
      className="flex items-center bg-blue-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
    >
      <img className="rounded-full w-10 h-10" src={images_url} alt="" />
      <h2>{profile_name}</h2>
      <ChevronDownIcon className="h-5 w-5" />
    </button>
  );
}

export default Profile;
