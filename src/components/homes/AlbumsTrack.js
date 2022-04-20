import React from "react";

import PropTypes from "prop-types";

function AlbumsTrack({ images_url, type_album, albums_name, new_albums }) {
  return (
    <div className="w-full mt-2" key={new_albums}>
      <img
        src={images_url}
        alt=""
        style={{ height: "120px", width: "120px" }}
      />
      <span className="mt-2 text-slate-600">
        {type_album} &#8226; {albums_name}
      </span>
    </div>
  );
}

AlbumsTrack.propTypes = {
  images_url: PropTypes.string,
  type_album: PropTypes.string,
  albums_name: PropTypes.string,
  new_albums: PropTypes.string,
};

export default AlbumsTrack;
