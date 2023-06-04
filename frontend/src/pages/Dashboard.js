import React from "react";
import Pomodoro from "../components/Pomodoro";
import "./Dashboard.css"; // Import the CSS file for styling
import NotesListPage from "./NoteListPage";
import MusicPlayer from "../components/MusicPlayer";
import { useLocation } from "react-router-dom";

const Dashboard = ({ timerData, playerData }) => {
  const location = useLocation();
  const { forceRefresh } = location.state || {};
  return (
    <div className="dashboard">
      <h1>Personal Tool Dashboard</h1>
      <div className="dashboard-grid">
        <div className="notes">
          {<NotesListPage forceRefresh={forceRefresh} />}
        </div>
        <div className="pomodoro">
          <Pomodoro {...timerData} />
        </div>
        <div className="background-music">
          <MusicPlayer {...playerData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
