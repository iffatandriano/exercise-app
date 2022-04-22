import React, { useEffect, useState } from "react";
import "./index.css";
import { accessUrl } from "../../utils/spotify";
import LoadingSpinner from "../../components/LoadingSpinner";
import MainContent from "../../components/MainContent";

function Login() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [isLoading]);

  return (
    <MainContent>
      <div className="w-full flex flex-col items-center justify-center">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <img
              src="https://www.logo.wine/a/logo/Spotify/Spotify-Black-Logo.wine.svg"
              alt="spotify-cover"
              className="h-52 w-52"
            />
            <h1
              className="font-semibold text-xl"
              data-testid="title-putarmusik"
            >
              Putarkan musik.
            </h1>
            <span className="font-semibold text-lg ">
              Agar asik dan buatkan playlistmu.
            </span>
            <a
              href={accessUrl}
              className="flex flex-row my-32 bg-hijauMuda px-4 py-4 rounded-full text-white"
            >
              <img src="/spotify.png" alt="logo" />
              <span className="ml-2">Masuk menggunakan Spotify</span>
            </a>
          </>
        )}
      </div>
    </MainContent>
  );
}

export default Login;
