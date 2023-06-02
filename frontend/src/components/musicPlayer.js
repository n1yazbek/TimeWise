import React, { useState, useRef, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { songsData } from "../constants";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { IoShuffleSharp } from "react-icons/io5";

const MusicPlayer = () => {
  const songs = songsData;

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const player = useRef(null);

  // Styles
  const cardStyle = {
    width: "17rem",
    textAlign: "center",
    margin: "2rem",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
  };

  const cardImgStyle = {
    width: "100%",
    height: "auto",
  };

  const cardBodyStyle = {
    padding: "1rem",
  };

  const controlButtonStyle = {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#007bff",
  };

  const volumeControlStyle = {
    width: "100px",
    marginLeft: "1rem",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (player.current && player.current.audio.current.duration) {
        const currentTime = player.current.audio.current.currentTime;
        const duration = player.current.audio.current.duration;
        setProgress((currentTime / duration) * 100);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (player.current && player.current.audio.current) {
      player.current.audio.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying && player.current && player.current.audio.current) {
      player.current.audio.current.play();
    }
  }, [isPlaying, currentSongIndex]);

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

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={cardStyle}>
        {songs[currentSongIndex].img_src && (
          <img
            src={songs[currentSongIndex].img_src}
            alt={songs[currentSongIndex].title}
            style={cardImgStyle}
          />
        )}
        <div style={cardBodyStyle}>
          <h5>{songs[currentSongIndex].title}</h5>
          <h6>by {songs[currentSongIndex].artist}</h6>
          <AudioPlayer
            ref={player}
            src={songs[currentSongIndex].src}
            listenInterval={1000}
            onPlay={(e) => setIsPlaying(true)}
            onPause={(e) => setIsPlaying(false)}
            showJumpControls={false}
            layout="horizontal-reverse"
            customProgressBarSection={[]}
            customControlsSection={[]}
            autoPlayAfterSrcChange={false}
            style={{ display: "none" }}
          />
          <Slider
            min={0}
            max={100}
            value={progress}
            onChange={onSeek}
            trackStyle={{ backgroundColor: "blue", height: 10 }}
            handleStyle={{
              borderColor: "blue",
              height: 15,
              width: 15,
              marginLeft: 0,
              marginTop: -2,
              backgroundColor: "blue",
            }}
            railStyle={{ backgroundColor: "gray", height: 10 }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={handleMute}
              style={{
                ...controlButtonStyle,
                fontSize: "1rem",
                marginTop: "7px",
              }}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <Slider
              min={0}
              max={100}
              value={volume}
              onChange={setVolume}
              trackStyle={{ backgroundColor: "red", height: 5 }}
              handleStyle={{
                borderColor: "red",
                height: 10,
                width: 10,
                marginLeft: 0,
                marginTop: -2,
                backgroundColor: "red",
              }}
              railStyle={{ backgroundColor: "gray", height: 5 }}
              style={volumeControlStyle}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <button onClick={handlePrev} style={controlButtonStyle}>
              <FaBackward />
            </button>
            <button onClick={handlePlayPause} style={controlButtonStyle}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={handleNext} style={controlButtonStyle}>
              <FaForward />
            </button>
            <button onClick={shuffle} style={controlButtonStyle}>
              <IoShuffleSharp />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
