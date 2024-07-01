import React from "react";
import { Link } from "react-router-dom";

function Tweet(props) {
  // console.log(props);

  const createdAtDate = new Date(props.item.createdAt);
  const year = createdAtDate.getFullYear();
  const month = createdAtDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = createdAtDate.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""}${day}`;

  function handelDelete(){
    props.deleteTweet(props.item._id)
  }

  function handleClick(){
    props.toggelTweetLike(props.item._id);
  }

  return (
    <div className="tweet">
      <div id="avatar">
        <img src={props.data.avatar} alt="" />
      </div>
      <div className="tweet-content">
        <span>
          <p>@{props.data.username}</p>
          <div className="tweet-icons">
            <span>
              <img
                onClick={handleClick}
                src="/icons8-like-48 (1).png"
                alt=""
              />
              <p>{props.item.likes}</p>
            </span>
            <Link to={`/user/tweets/edit-tweet/${props.item._id}`}>
              <img src="/icons8-edit-48.png" alt="" />
            </Link>
            <img onClick={handelDelete} src="/icons8-delete-48.png" alt="" />
          </div>
        </span>
        <p>{props.item.content}</p>
        <p id="createdAt">{formattedDate}</p>
      </div>
    </div>
  );
}

export default Tweet;
