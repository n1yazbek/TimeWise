import React from "react";
import Pomodoro from "../components/Pomodoro";
import "./Dashboard.css"; // Import the CSS file for styling
import NotesListPage from "./NoteListPage";
import MusicPlayer from "../components/MusicPlayer";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Personal Tool Dashboard</h1>
      <div className="dashboard-grid">
        <div className="notes">{<NotesListPage />}</div>
        <div className="pomodoro">
          <Pomodoro />
        </div>
        <div className="background-music">
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
