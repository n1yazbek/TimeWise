import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";

import AddButton from "../components/AddButton";
import PomodoroTimer from "../components/Pomodoro";

const NotesListPage = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("http://localhost:8000/notes");
    let data = await response.json();
    // console.log("data", data);
    setNotes(data);
  };

  // let [accessToken, setAccessToken] = useState(null);

  // useEffect(() => {
  //   SpotifyAccessToken.getAccessToken().then((token) => {
  //     // call the getAccessToken function from the imported component to get the access token
  //     setAccessToken(token);
  //     spotifyApi.setAccessToken(token);
  //   });
  // }, []);

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        {/* <div className="spotify-player">
          {accessToken ? (
            <SpotifyPlayer accessToken={accessToken} /> // pass the access token as a prop to the SpotifyPlayer component
          ) : (
            <p>Connecting to Spotify...</p>
          )}
        </div> */}
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <PomodoroTimer />
      <AddButton />
    </div>
  );
};

export default NotesListPage;
