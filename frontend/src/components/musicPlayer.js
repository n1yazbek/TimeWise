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

const MusicPlayer = ({
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
}) => {
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

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={cardStyle}>
        {currentSong.img_src && (
          <img
            src={currentSong.img_src}
            alt={currentSong.title}
            style={cardImgStyle}
          />
        )}
        <div style={cardBodyStyle}>
          <h5>{currentSong.title}</h5>
          <h6>by {currentSong.artist}</h6>
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
