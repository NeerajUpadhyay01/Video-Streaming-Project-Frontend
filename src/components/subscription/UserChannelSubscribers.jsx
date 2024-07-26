import User from './User';
import { axios, server, useEffect, useState, Link } from "../../imports";

function UserChannelSubscribers() {
    const [data, setData] = useState({
      currentUser: {},
      subscribers: [],
    });

    useEffect(() => {
      async function fetchUsers() {
        try {
          const currentUserResponse = await axios.get(
            `${server}/users/current-user`,
            { withCredentials: true }
          );
          const currentUser = currentUserResponse.data.data;
        //   console.log(currentUser)

          const subscribersResponse = await axios.get(
            `${server}/subscriptions/c/${currentUser._id}`,
            { withCredentials: true }
          );
          const subscribersData = subscribersResponse.data.data;
        //   console.log(subscribersData)

          setData({
            ...data,
            currentUser: currentUser,
            subscribers: subscribersData,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchUsers();
    }, []);

  return (
    <div className="userChannelSubscribers">
      <div id="subscribers">
        {data.subscribers.map((item) => {
          return <User key={item._id} user={item.subscriber} />;
        })}
      </div>
      <div id="goto">
        <Link to="/user/subscriptions">
          <span>
            <p>&#x2190;</p>
            <h4>subscribed channels</h4>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default UserChannelSubscribers