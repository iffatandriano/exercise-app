import React from "react";
import millisToMinutesAndSeconds from "../../../../utils/millisToMinutesAndSeconds";
import moment from "moment";

function TrackPlaylist({ getPlaylistTrack, listTrack }) {
  return (
    <div className="grid grid-cols-3 mt-2 py-4 px-5 overflow-auto hover:bg-gray-900">
      {listTrack.length === undefined ? (
        <></>
      ) : (
        listTrack.length > 0 &&
        listTrack.map((list, index) => (
          <>
            <div className="flex items-center space-x-6 ml-8">
              <p className="text-gray-300">{index + 1}</p>
              <img
                className="h-10 w-10"
                src={list.track.album.images[2].url}
                alt=""
              />
              <div className="">
                <p className="text-white font-bold">{list.track.name}</p>
                <p className="text-gray-300">{list.track.artists[0].name}</p>
              </div>
            </div>
            <div className="flex items-center justify-between ml-auto mr-4 md:ml-0">
              <p className="text-gray-400">{list.track.album.name}</p>
              <p className="text-gray-400">
                {moment(list.added_at).format("MMM DD YYYY")}
              </p>
            </div>
            <div className="flex items-center ml-10">
              <p className="text-gray-400 mr-auto">
                {millisToMinutesAndSeconds(list.track.duration_ms)}
              </p>
            </div>
          </>
        ))
      )}
    </div>
  );
}

export default TrackPlaylist;
