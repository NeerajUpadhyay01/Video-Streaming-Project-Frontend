import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../constants";

function Video(props) {
  const [currentUser, setCurrentUser] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [ishide, setIshide] = useState(false);
  const videoRef = useRef(null);

  // console.log(props.video);

  useEffect(() => {
    async function CurrentUser() {
      const response = await axios
        .get(`${server}/users/current-user`, { withCredentials: true })
        .then((res) => res.data);
      setCurrentUser(response.data);
    }
    CurrentUser();
  }, []);

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

  const createdAtDate = new Date(props.video.createdAt);
  const year = createdAtDate.getFullYear();
  const month = createdAtDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = createdAtDate.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  const navigate = useNavigate();

  const handleClick = () => {
    axios.post(
      `${server}/users/history/add/${props.video._id}`,
      {},
      { withCredentials: true }
    );
    navigate(`/user/videos/${props.video._id}`);
  };

  const handleClickMenu = () => {
    if (currentUser._id == props.video.owner._id) {
      setIsActive((isActive) => !isActive);
    }
  };

  const deletevideo = async () => {
    await axios
      .delete(`${server}/videos/${props.video._id}`, { withCredentials: true })
      .then((res) => res.data);
    navigate("/user/videos");
  };
  return (
    <div className="video">
      {!ishide && (
        <img
          id="thumbnail"
          src={props.video.thumbnail}
          onMouseEnter={handleMouseEnter}
          alt="thumbnail"
        />
      )}
      {ishide && (
        <video
          muted
          // controls
          ref={videoRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <source src={props.video.videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="details">
        <div>
          <img src={props.video.owner.avatar} alt="" />
        </div>
        <div>
          <div id="title">{props.video.title}</div>
          <div>
            <span id="owner">
              {props.video.owner.username} - {props.video.views} views -
              {formattedDate}
            </span>
          </div>
        </div>
        <img
          id="menuIcon"
          onClick={handleClickMenu}
          src="/icons8-menu-48.webp"
          alt=""
        />
        <div className={`video_operations ${isActive ? "active" : ""}`}>
          <span>
            <img src="/icons8-edit-48.webp" alt="" />
            <Link to={`/user/videos/update-video/videoId`}>
              <p>edit</p>
            </Link>
          </span>
          <span>
            <img src="/icons8-delete-48.webp" alt="" />
            <p onClick={deletevideo}>delete</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Video;
