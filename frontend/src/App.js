import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AudioPlayer from "react-h5-audio-player";
import TodoList from "./pages/TodoList";
import "./App.css";
import NoteListPage from "./pages/NoteListPage";
import NotePage from "./pages/NotePage";

import Dashboard from "./pages/Dashboard";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import { songsData } from "./constants";

function App() {
  const timer = useTimer(25);
  const player = useMusicPlayer();
  return (
    <div className="container dark">
      <div className="app">
        <Header />
        <Routes>
          <Route path="/notes" exact element={<NoteListPage />} />
          <Route path="/note/:id" element={<NotePage />} />
          <Route path="/note/create" element={<NotePage />} />
          <Route path="/todoList" element={<TodoList />} />
          <Route path="/" element={<Dashboard timerData={timer} playerData={player} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      {/* Global player object. Its state is controlled by useMusicPlayer function using its reference */}
      <AudioPlayer
        ref={player.player}
        src={player.currentSong.src}
        listenInterval={1000}
        onPlay={(e) => player.setIsPlaying(true)}
        onPause={(e) => player.setIsPlaying(false)}
        showJumpControls={false}
        layout="horizontal-reverse"
        customProgressBarSection={[]}
        customControlsSection={[]}
        autoPlayAfterSrcChange={false}
        style={{ display: "none" }}
      />
    </div>
  );
}

// Custom hook to manage the global player state
function useMusicPlayer() {
  const songs = songsData;
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const player = useRef(null);
  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      if (player.current && player.current.audio.current.duration) {
        const currentTime = player.current.audio.current.currentTime;
        const duration = player.current.audio.current.duration;
        setProgress((currentTime / duration) * 100);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [player]);

  useEffect(() => {
    if (player.current && player.current.audio.current) {
      player.current.audio.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted, player]);

  useEffect(() => {
    if (isPlaying && player.current && player.current.audio.current) {
      player.current.audio.current.play();
    }
  }, [isPlaying, currentSongIndex, player]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      player.current.audio.current.play();
    } else {
      player.current.audio.current.pause();
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    setIsPlaying(true);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSongIndex(
      currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1
    );
    setIsPlaying(true);
    setProgress(0);
  };

  const shuffle = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    setCurrentSongIndex(randomIndex);
    setIsPlaying(true);
    setProgress(0);
  };

  const onSeek = (value) => {
    if (player.current && player.current.audio.current.duration) {
      player.current.audio.current.currentTime =
        (value / 100) * player.current.audio.current.duration;
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  return {
    currentSong,
    isPlaying,
    isMuted,
    volume,
    progress,
    handlePlayPause,
    handleMute,
    handleNext,
    handlePrev,
    shuffle,
    onSeek,
    setVolume,

    player,
    setIsPlaying,
  };
}

// Custom hook to manage the global timer state
function useTimer(initialMinutes) {
  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const [started, setStarted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(initialMinutes * MINUTE);
  const [initialTime, setInitialTime] = useState(initialMinutes * MINUTE);

  useEffect(() => {
    if (isActive) {
      setEndTime(Date.now() + timeLeft);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        const newTimeLeft = endTime - Date.now();
        if (newTimeLeft <= 0) {
          clearInterval(interval);
          setIsActive(false);
          setTimeLeft(initialMinutes * MINUTE);
        } else {
          setTimeLeft(newTimeLeft);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isActive, endTime, initialMinutes]);

  const startTimer = () => {
    if (!started) {
      setInitialTime(initialMinutes * MINUTE);
      setStarted(true);
    }
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialMinutes * MINUTE);
    setStarted(false);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const calculateTimerProgress = () => {
    const progress = ((initialTime - timeLeft) / initialTime) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return {
    timeLeft,
    isActive,
    startTimer,
    resetTimer,
    pauseTimer,
    calculateTimerProgress,
  };
}

export default App;
