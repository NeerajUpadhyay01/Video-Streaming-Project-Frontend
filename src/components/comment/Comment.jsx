import axios from "axios";
import React from "react";
import { server } from "../../constants";

function Comment({ comment, features, setFeatures }) {
  // console.log(comment)
  const createdAtDate = new Date(comment.createdAt);
  const year = createdAtDate.getFullYear();
  const month = createdAtDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = createdAtDate.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  async function toggelCommentLike() {
    const response = await axios
      .post(
        `${server}/likes/toggle/c/${comment._id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => res.data);
    //   console.log(response)
    if (response.success === true) {
      setFeatures((prevData) => {
        return { ...prevData, isCommentLiked: !features.isCommentLiked };
      });
    }
  }
  return (
    <div className="comment">
      <img src={`${comment.owner.avatar}`} alt="" />
      <div className="commentDetail">
        <span>
          <p>@{comment.owner.username}</p>
          <span>|</span>
          <p>{formattedDate}</p>
        </span>
        <p>{comment.content}</p>
      </div>
      <button onClick={toggelCommentLike}>
        <img
          src="/icons8-like-48 (1).webp"
          alt=""
          //   onClick={toggelLike}
        />
        <p>{comment.likes}</p>
      </button>
    </div>
  );
}

export default Comment;
