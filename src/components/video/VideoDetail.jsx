import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../constants";
import PlaylistVideo from "../playlist/PlaylistVideo.jsx";
import Comment from "../comment/Comment.jsx";

function VideoDetail() {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState({});
  const [features, setFeatures] = useState({
    isSubscribed: videoData.isSubscribed,
    isVideoLiked: false,
    isCommentLiked: false,
    isSaved: false,
    isFocused: false,
  });
  const [commentData, setCommentData] = useState({
    comment: "",
    comments: [],
  });
  const [refreshComments, setRefreshComments] = useState(false);
  const [otherVideos, setOtherVideos] = useState([]);
  // console.log(commentData.comments)
  // console.log(videoData);
  //   console.log(features)
  // console.log(otherVideos)

  useEffect(() => {
    async function fetchVideo() {
      const response = await axios
        .get(`${server}/videos/${videoId}`, { withCredentials: true })
        .then((res) => res.data);
      // console.log(response)
      setVideoData(response.data[0]);
    }
    fetchVideo();
  }, [videoId, features.isSubscribed, features.isVideoLiked]);

  useEffect(() => {
    async function fetchVideoComments() {
      const response = await axios
        .get(`${server}/comments/${videoId}`, { withCredentials: true })
        .then((res) => res.data);
      setCommentData((prevData) => {
        return { ...prevData, comments: response.data };
      });
    }
    fetchVideoComments();
  }, [videoId, refreshComments, features.isCommentLiked]);

  useEffect(() => {
    async function fetchVideos() {
      const response = await axios
        .get(`${server}/videos/otherVideos`, { withCredentials: true })
        .then((res) => res.data);
      // console.log(response)
      if (response.success === true) {
        setOtherVideos(response.data);
      }
    }
    fetchVideos();
  }, [videoId]);

  const createdAtDate = new Date(videoData.createdAt);
  const year = createdAtDate.getFullYear();
  const month = createdAtDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = createdAtDate.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  async function handleClick() {
    const response = await axios
      .post(
        `${server}/subscriptions/c/${videoData.owner._id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => res.data);
    //   console.log(response)
    if (response.success === true) {
      setFeatures((prevData) => {
        return { ...prevData, isSubscribed: !videoData.isSubscribed };
      });
    }
  }

  async function toggelVideoLike() {
    const response = await axios
      .post(
        `${server}/likes/toggle/v/${videoData._id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => res.data);
    if (response.success === true) {
      setFeatures((prevData) => {
        return { ...prevData, isVideoLiked: !features.isVideoLiked };
      });
    }
  }

  async function saveToPlaylist() {
    // const response = await axios.post(`${server}/playlist/add/${videoData._id}/:playlistId`,{},{withCredentials:true}).then(res=>res.data);
    // if(response.success===true){
    //     setFeatures((prevData) => {
    //       return { ...prevData, isSaved: !features.isSaved };
    //     });
    // }
  }

  function cancelInput() {
    setCommentData((prevData) => {
      return { ...prevData, comment: "" };
    });
    setFeatures((prevData) => {
      return { ...prevData, isFocused: !features.isFocused };
    });
  }

  function handleFocus() {
    setFeatures((prevData) => {
      return { ...prevData, isFocused: true };
    });
  }

  function handleChange(e) {
    const { value } = e.target;
    setCommentData((prevData) => {
      return { ...prevData, comment: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (commentData.comment !== "") {
      const response = await axios
        .post(
          `${server}/comments/${videoData._id}`,
          {
            content: commentData.comment.trim(),
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data);
      // console.log(response)

      if (response.success === true) {
        setRefreshComments((prev) => !prev);
        cancelInput();
      }
    }
  }

  return (
    <div className="videoDetail">
      <div className="videoFeatures">
        <video controls src={`${videoData.videoFile}`}></video>
        <div className="detail">
          <p id="title">{videoData.title}</p>
          <span>
            <p>{videoData.views} views</p> <p>createdAt : {formattedDate}</p>
          </span>
          <div className="userDetail">
            {videoData.owner && (
              <>
                <img
                  id="avatar"
                  src={`${videoData.owner.avatar}`}
                  alt="avatar"
                />
                <span id="username">
                  <h3>{videoData.owner.fullname}</h3>
                  <span>
                    <img src="/icons8-username-48.webp" alt="" />
                    {videoData.owner.username}
                  </span>
                </span>
              </>
            )}
            <div className="features">
              <button onClick={handleClick}>
                {!videoData.isSubscribed ? "Subscribe" : "Unsubscribe"}
              </button>
              <button id="like">
                <img
                  src="/icons8-like-48 (1).webp"
                  alt=""
                  onClick={toggelVideoLike}
                />
                {videoData.likes}
                {/* <p>|</p> */}
                {/* <img src="/icons8-dislike-48.webp" alt="" onClick={decreaseLikes}/> */}
              </button>
              <button id="save">
                <img
                  src="/icons8-save-48.webp"
                  alt=""
                  onClick={saveToPlaylist}
                />
                {!features.isSaved ? "save" : "saved"}
              </button>
            </div>
          </div>
        </div>
        <div className="videoComments">
          <form onSubmit={handleSubmit}>
            <input
              id="input"
              type="text"
              name="comment"
              placeholder="Add a comment..."
              value={commentData.comment}
              onChange={handleChange}
              onFocus={handleFocus}
              required
              autoComplete="off"
            />
            {features.isFocused && (
              <span>
                <button type="submit">
                  <img src="/icons8-right-48.webp" alt="" />
                </button>
                <button id="cancel" type="button" onClick={cancelInput}>
                  cancel
                </button>
              </span>
            )}
          </form>
          <div className="comments">
            {commentData.comments.map((comment) => {
              return (
                <Comment
                  comment={comment}
                  key={comment._id}
                  features={features}
                  setFeatures={setFeatures}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="otherVideos">
        {otherVideos.map((video) => {
          return <PlaylistVideo key={video._id} video={video} />;
        })}
      </div>
    </div>
  );
}

export default VideoDetail;
