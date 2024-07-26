import { axios, server, useEffect, useState, Link, Tweet } from "../../imports";

function UserTweets() {
  const [data, setData] = useState([]);
  const [refreshTweets, setRefreshTweets] = useState(false);
  // console.log(data)

  useEffect(() => {
    async function fetchTweets() {
      const currentUserResponse = await axios.get(
        `${server}/users/current-user`,
        { withCredentials: true }
      );
      const currentUser = currentUserResponse.data.data;

      const tweetsResponse = await axios
        .get(`${server}/tweets/user/${currentUser._id}`, {
          withCredentials: true,
        })
        .then((res) => res.data);
      // console.log(tweetsResponse);

      setData(tweetsResponse.data);
    }
    fetchTweets();
  }, [refreshTweets]);

  const deleteTweet = async (tweetId) => {
    // console.log(tweetId);
    const response = await axios
      .delete(`${server}/tweets/${tweetId}`, { withCredentials: true })
      .then((res) => res.data);
    if (response.success === true) {
      setRefreshTweets(!refreshTweets);
    }
  };

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
    <div className="userTweets">
      <div id="tweets">
        {data.tweets?.map((item) => {
          return (
            <Tweet
              key={item._id}
              data={data}
              item={item}
              deleteTweet={deleteTweet}
              toggelTweetLike={toggelTweetLike}
            />
          );
        })}
      </div>
      <div id="addButton">
        <Link to="/user/tweets/create-tweet">
          <img src="/icons8-plus-64.webp" alt="" />
        </Link>
      </div>
    </div>
  );
}

export default UserTweets;
