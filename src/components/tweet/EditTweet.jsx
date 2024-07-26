import { axios, server, useState, useNavigate, useParams } from "../../imports";
import Loader from "../Loader";

function EditTweet() {
  const { tweetId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [tweet, setTweet] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setTweet((tweet) => (tweet = e.target.value));
  }

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    const response = await axios
      .patch(
        `${server}/tweets/${tweetId}`,
        {
          content: tweet,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data);
    // console.log(response);
    if (response) {
      setIsLoading(false);
      navigate("/user/tweets");
    }
  }
  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="tweetForm">
        <textarea
          cols="30"
          rows="10"
          placeholder="content"
          onChange={handleChange}
          value={tweet}
          required
        ></textarea>
        <button>{!isLoading ? "Update Tweet" : <Loader />}</button>
      </form>
    </div>
  );
}

export default EditTweet;
