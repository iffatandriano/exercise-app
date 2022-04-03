import React from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";

function MySearchPlaylist() {
  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img
            className="rounded-full w-10 h-10"
            src="https://miro.medium.com/fit/c/160/160/1*9LpGqdw1GmxLcQxb1cDuuQ.jpeg"
            alt=""
          />
          <h2>Iffat Andriano</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white p-8`}
      >
        <img className="h-44 w-44 shadow-2xl" src="" alt="" />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-1xl xl:text-5xl font-bold">
            playlist name
          </h1>
        </div>
        <h1>Hello</h1>
      </section>

      <div className="text-white">
        <p>ini search</p>
      </div>
    </div>
  );
}

export default MySearchPlaylist;
