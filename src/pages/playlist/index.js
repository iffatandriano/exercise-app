import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// loading
import LoadingSpinner from "../../components/LoadingSpinner";

// components
import MainContent from "../../components/MainContent";

function Playlist() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [isLoading]);
  return (
    <MainContent>
      <div className="flex flex-col">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="flex w-full py-4 px-4">testing</div>
            <div
              style={{
                boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.138389)",
                maxWidth: "500px",
              }}
              className="w-full absolute bottom-0 flex flex-wrap justify-around items-center"
            >
              <Link to="/home">
                <button className="focus:outline-none flex flex-col justify-center items-center">
                  <img src="/home.png" style={{ height: 28, width: 28 }} />
                  <span className="text-sm text-abu">Home</span>
                </button>
              </Link>
              <Link to="/search">
                <button className="focus:outline-none flex flex-col justify-center items-center">
                  <img src="/search.png" style={{ height: 28, width: 28 }} />
                  <span className="text-sm text-abu">Cari</span>
                </button>
              </Link>
              <Link to="/playlist">
                <button className="focus:outline-none my-3 flex flex-col justify-center items-center">
                  <img src="/playlist.png" style={{ height: 28, width: 28 }} />
                  <span className="text-sm font-semibold">Koleksi Kamu</span>
                </button>
              </Link>
              <Link to="/profile">
                <button className="focus:outline-none flex flex-col justify-center items-center">
                  <img src="/person.png" style={{ height: 28, width: 28 }} />
                  <span className="text-sm text-abu ">Profil</span>
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </MainContent>
  );
}

export default Playlist;
