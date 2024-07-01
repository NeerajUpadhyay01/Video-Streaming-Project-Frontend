import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function PlaylistVideo(props) {
  // console.log(props)
  const videoRef = useRef(null);

  const navigate=useNavigate()

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video to start
    }
  };

  function handleClick(){
    navigate(`/user/videos/${props.video._id}`);
  }

  const createdAtDate = new Date(props.video.createdAt);
  const year = createdAtDate.getFullYear();
  const month = createdAtDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = createdAtDate.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  return (
    <div className="playlistVideo" onClick={handleClick}>
      <video
        controls
        ref={videoRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <source src={`${props.video.videoFile}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="details">
        <div>
          <div id="title">
            {props.video.title}
          </div>
          <span id="username">
            <img src="/icons8-username-48.png" alt="" />
            {props.video.owner.username}
          </span>
          <div>
            <span id="owner">
              {props.video.views} views - {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistVideo;
