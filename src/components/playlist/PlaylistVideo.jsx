import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../constants";

function PlaylistVideo(props) {
  // console.log(props)
  const [ishide, setIshide] = useState(false);

  const videoRef = useRef(null);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    setIshide(true);
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video to start
    }
    setIshide(false);
  };

  function handleClick() {
    axios.post(
      `${server}/users/history/add/${props.video._id}`,
      {},
      { withCredentials: true }
    );
    navigate(`/user/videos/${props.video._id}`);
  }

  function handleRemove() {
    props.removeVideo(props.video._id);
  }

  const createdAtDate = new Date(props.video.createdAt);
  const year = createdAtDate.getFullYear();
  const month = createdAtDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = createdAtDate.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  return (
    <div className="playlistVideo">
      {!ishide && (
        <img
          id="thumbnail"
          src={props.video.thumbnail}
          onMouseEnter={handleMouseEnter}
          alt="thumbnail"
        />
      )}
      {ishide && <video
        muted
        // controls
        ref={videoRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <source src={`${props.video.videoFile}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>}

      <div className="details">
        <div>
          <span id="first">
            <p id="title">{props.video.title}</p>
            {props.location ? (
              <img src="/icons8-remove-50.webp" alt="" onClick={handleRemove} />
            ) : (
              <Link to={`/user/playlists/${props.video._id}/select-playlist`}>
                <img src="/icons8-save-48.webp" alt="" />
              </Link>
            )}
          </span>
          <span id="username">
            <img src="/icons8-username-48.webp" alt="" />
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
