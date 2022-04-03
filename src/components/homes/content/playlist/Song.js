import React from "react";
import millisToMinutesAndSeconds from "../../../../utils/millisToMinutesAndSeconds";

function Song({
  tracks,
  onSelect,
  isAdded,
  image_url,
  album_name,
  title_song,
  song_artist,
  duration,
}) {
  return (
    <div className="grid grid-cols-3 mt-2 py-4 px-5 overflow-auto hover:bg-gray-900">
      <div className="flex items-center space-x-6 ml-8">
        <img className="h-10 w-10" src={image_url} alt="" />
        <div className="">
          <p className="text-white font-bold">{title_song}</p>
          <p className="text-gray-300">{song_artist}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto mr-4 md:ml-0">
        <p className="text-gray-400">{album_name}</p>
        <p className="text-gray-400 ml-auto">
          {millisToMinutesAndSeconds(duration)}
        </p>
      </div>
      <div className="flex justify-end mr-10">
        <button
          className={
            isAdded
              ? "rounded-full text-gray-300 border w-20 h-10 bg-gray-500"
              : "rounded-full text-white border w-20 h-10"
          }
          //   className="rounded-full text-white border w-20 h-10"
          onClick={onSelect}
        >
          {isAdded ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default Song;
