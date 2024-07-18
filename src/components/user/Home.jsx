import React, { useEffect, useState } from "react";
import Video from "../video/Video";
import axios from "axios";
import { server } from "../../constants";
import Tweet from "../tweet/Tweet";

function Home() {
  const [videos, setVideos] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [isActive,setIsActive] = useState(false)
  const [refreshTweets, setRefreshTweets] = useState(false);
  // console.log(tweets);

  const location = "home";

  useEffect(() => {
    async function fetchVideos() {
      const response = await axios
        .get(`${server}/videos/otherVideos`, { withCredentials: true })
        .then((res) => res.data);
      setVideos(response.data);
    }

    async function fetchTweets() {
      const currentUserResponse = await axios
        .get(`${server}/users/current-user`, { withCredentials: true })
        .then((res) => res.data);
      const currentUser = currentUserResponse.data;

      const subscribersResponse = await axios
        .get(`${server}/subscriptions/u/${currentUser._id}`, {
          withCredentials: true,
        })
        .then((res) => res.data);
      const subscribedChannelsData = subscribersResponse.data;

      let allTweetsData = [];

      for (let i = 0; i < subscribedChannelsData.length; i++) {
        const subscriberId = subscribedChannelsData[i].channel._id;
        const tweetsResponse = await axios
          .get(`${server}/tweets/user/${subscriberId}`, {
            withCredentials: true,
          })
          .then((res) => res.data);

        if (tweetsResponse.data.tweets.length !== 0) {
          allTweetsData = [...allTweetsData, tweetsResponse.data];
        }
      }
      setTweets(allTweetsData);
    }
    fetchVideos();
    fetchTweets();
  }, [refreshTweets]);

  function handleClick(){
    setIsActive(!isActive)
  }

  async function toggelTweetLike(tweetId) {
    const response = await axios
      .post(
        `${server}/likes/toggle/t/${tweetId}`,
        {},
        { withCredentials: true }
      )
      .then((res) => res.data);
    if (response.success === true) {
      setRefreshTweets(!refreshTweets);
    }
  }

  return (
    <div className="home">
      <div id="goto">
        <span onClick={handleClick}>
          <h4>{isActive ? "videos" : "tweets"}</h4>
          <p>&#x2192;</p>
        </span>
      </div>
      {!isActive && <div className="videos">
        {videos.map((video) => {
          // console.log(video)
          return <Video key={video._id} video={video} />;
        })}
      </div>}
      {isActive && <div className="tweets">
        {tweets.map((tweetData) => {
          return tweetData.tweets.map((tweet) => {
            return (
              <Tweet
                key={tweet._id}
                data={tweetData}
                item={tweet}
                location={location}
                toggelTweetLike={toggelTweetLike}
              />
            );
          });
        })}
      </div>}
    </div>
  );
}

export default Home;
