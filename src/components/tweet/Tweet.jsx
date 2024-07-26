import { useFormattedDate, Link } from "../../imports";


function Tweet(props) {
  // console.log(props);

  const formattedDate = useFormattedDate(props.item.createdAt);
  
  function handelDelete() {
    props.deleteTweet(props.item._id);
  }

  function handleClick() {
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
                src="/icons8-like-48 (1).webp"
                alt=""
              />
              <p>{props.item.likes}</p>
            </span>
            {(props.location==="home") || (<><Link to={`/user/tweets/edit-tweet/${props.item._id}`}>
              <img src="/icons8-edit-48.webp" alt="" />
            </Link>
            <img onClick={handelDelete} src="/icons8-delete-48.webp" alt="" /></>)}
          </div>
        </span>
        <p>{props.item.content}</p>
        <p id="createdAt">{formattedDate}</p>
      </div>
    </div>
  );
}

export default Tweet;
