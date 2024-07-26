import { axios, server, useState, useNavigate } from "../../imports";

function CreateTweet() {
  const [tweet, setTweet] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setTweet((tweet) => (tweet = e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios
      .post(
        `${server}/tweets/`,
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
        <button>tweet</button>
      </form>
    </div>
  );
}

export default CreateTweet;
