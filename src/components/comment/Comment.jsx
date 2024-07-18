import axios from "axios";
import React from "react";
import { server } from "../../constants";

function Comment({ comment, features, setFeatures, deleteComment, setCommentData, handleFocus }) {
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

  function handleClick(){
    handleFocus()
    setCommentData((prevData) => {
      return {
        ...prevData,
        comment: comment.content,
        commentToUpdateId: comment._id,
      };
    });
  }

  function handelDelete() {
    deleteComment(comment._id);
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
      <div className="commentFeatures">
        <span>
          <img
            src="/icons8-like-48 (1).webp"
            alt=""
            onClick={toggelCommentLike}
          />
          <p>{comment.likes}</p>
        </span>
        <img src="/icons8-edit-48.webp" alt="" onClick={handleClick}/>
        <img onClick={handelDelete} src="/icons8-delete-48.webp" alt="" />
      </div>
    </div>
  );
}

export default Comment;
