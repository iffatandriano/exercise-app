// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Playlist from "../playlist";
// import "./index.css";

// const Search = ({ token }) => {
//   const [playlist, setPlaylist] = useState([]);
//   const [searchKey, setSearchKey] = useState("");
//   const [errors, setErrors] = useState("");
//   const [checkInPlaylist, setcheckInPlaylist] = useState(0);
//   const [selectedItems, setSelectedItems] = useState(false);
//   const [albums, setAlbums] = useState([]);

//   // useEffect(() => {
//   //   const mergedplaylist = playlist.map((uri) => ({
//   //     ...uri,
//   //     isSelected: selectedTrack.find((e) => e === uri);
//   //   });
//   //   setMergedPlaylist(mergedplaylist);
//   // }, [playlist]);

//   const searchArtist = async (e) => {
//     try {
//       e.preventDefault();

//       const { data, status, statusText } = await axios.get(
//         "https://api.spotify.com/v1/search",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             q: searchKey,
//             type: "album",
//             limit: 6,
//           },
//         }
//       );

//       if (status !== 200) {
//         setErrors(statusText);
//         setcheckInPlaylist(0);
//       } else {
//         if (playlist.length > 0) {
//           playlist.find((e) => e.isSelected);
//           setPlaylist(data.albums.items);
//         } else {
//           setPlaylist(data.albums.items);
//         }
//         setcheckInPlaylist(1);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const selectedHandle = (value, id) => {
//     let arr = playlist.map((pl) => {
//       if (pl.id === id) {
//         pl.isSelected = !pl.isSelected;
//       }

//       return { ...pl };
//     });
//     setPlaylist(arr);
//     setSelectedItems(value);
//   };

//   return (
//     <div className="container">
//       <span className="search-title">FIND YOUR ALBUM ON SPOTIFY</span>
//       <div className="form-playlist">
//         <form>
//           <input
//             type="text"
//             className="input-playlist"
//             placeholder="Typing album names"
//             onChange={(e) => setSearchKey(e.target.value)}
//           />
//           <button
//             className="search-playlist"
//             type="submit"
//             onClick={(e) => searchArtist(e)}
//           >
//             Search
//           </button>
//         </form>
//       </div>
//       <div className="albums">
//         {checkInPlaylist > 0 &&
//           playlist.map((pl, index) => (
//             <Playlist
//               key={pl.id}
//               plId={pl.id}
//               pl={pl}
//               selectedHandle={(value, id) => selectedHandle(value, id)}
//               selectedItems={selectedItems}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Search;
