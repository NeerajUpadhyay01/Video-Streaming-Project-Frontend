import axios from "axios";
import React, { useState } from "react";
import { server } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";

function EditTweet() {
    const {tweetId} = useParams()
    
  const [tweet, setTweet] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setTweet((tweet) => (tweet = e.target.value));
  }

  async function handleSubmit(e) {
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
        <button>update tweet</button>
      </form>
    </div>
  );
}

export default EditTweet;
