import React, { useEffect, useState } from "react";
import Tweet from "./Tweet";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants";

function UserTweets() {
  const [data, setData] = useState([]);

  const navigate= useNavigate()

  useEffect(() => {
    async function fetchTweets() {
      const currentUserResponse = await axios.get(
        `${server}/users/current-user`,
        { withCredentials: true }
      );
      const currentUser = currentUserResponse.data.data;

      const tweetsResponse = await axios.get(
        `${server}/tweets/user/${currentUser._id}`,
        { withCredentials: true }
      );
      const tweets = tweetsResponse.data.data;
      // console.log(tweets);

      setData(tweets);
    }
    fetchTweets();
  }, [data.tweets]);

    const deleteTweet = async (tweetId) => {
      // console.log(tweetId);
      await axios
        .delete(`${server}/tweets/${tweetId}`, { withCredentials: true })
        .then((res) => res.data);
      navigate("/user/tweets");
    };

  return (
    <div className="userTweets">
      <div id="tweets">
        {data.tweets?.map(item => {
          return <Tweet key={item._id} data={data} item={item} deleteTweet={deleteTweet}/>;
        })}
      </div>
      <div id="addButton">
        <Link to="/user/tweets/create-tweet">
          <img src="/icons8-plus-64.png" alt="" />
        </Link>
      </div>
    </div>
  );
}

export default UserTweets;
