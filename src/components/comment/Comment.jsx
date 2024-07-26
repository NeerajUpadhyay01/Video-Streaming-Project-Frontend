import {
  axios,
  server,
  useFormattedDate,
  useEffect,
  useState,
} from "../../imports";

function Comment({ comment, features, setFeatures, deleteComment, setCommentData, handleFocus }) {
  const [currentUser,setCurrentUser] = useState([])
  // console.log(comment);
  const formattedDate = useFormattedDate(comment.createdAt);

  useEffect(()=>{
    async function fetchUser(){
      const response = await axios.get(`${server}/users/current-user`,{withCredentials:true}).then(res=>res.data)
      setCurrentUser(response.data)
    }
    fetchUser()
  },[])

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
        {(currentUser._id === comment.owner._id) && (
          <>
            <img src="/icons8-edit-48.webp" alt="" onClick={handleClick} />
            <img onClick={handelDelete} src="/icons8-delete-48.webp" alt="" />
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;
