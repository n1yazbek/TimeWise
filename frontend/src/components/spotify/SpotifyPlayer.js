import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const SpotifyPlayer = ({ accessToken }) => {
  let [tracks, setTracks] = useState([]);

  useEffect(() => {
    getTracks();
  }, []);

  let getTracks = async () => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me/tracks", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setTracks(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="spotify">
      <h2 className="spotify-title">&#127926; My Spotify Tracks</h2>
      <div className="spotify-tracks">
        {tracks.map((track, index) => (
          <div key={index} className="spotify-track">
            <img src={track.track.album.images[0].url} alt={track.track.name} />
            <div className="spotify-track-info">
              <h3>{track.track.name}</h3>
              <p>{track.track.artists[0].name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotifyPlayer;
