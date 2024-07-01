import React, { useEffect, useState } from "react";
import User from "./User";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants";

function SubscribedChannels() {
    const [data, setData] = useState({
      currentUser: {},
      subscribedChannels:[],
    });

    useEffect(() => {
      async function fetchUsers() {
        try {
          const currentUserResponse = await axios.get(
            `${server}/users/current-user`,
            { withCredentials: true }
          );
          const currentUser = currentUserResponse.data.data;
        //   console.log(currentUser);

          const subscribersResponse = await axios.get(
            `${server}/subscriptions/u/${currentUser._id}`,
            { withCredentials: true }
          );
          const subscribedChannelsData = subscribersResponse.data.data;
        //   console.log(subscribedChannelsData);

          setData({
            ...data,
            currentUser: currentUser,
            subscribedChannels: subscribedChannelsData,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchUsers();
    }, []);

  return (
    <div className="subscribedChannels">
      <div id="channels">
        {
            data.subscribedChannels.map(item => {
                return <User key={item._id} user={item.channel}/>
            })
        }
      </div>
      <div id="goto">
        <Link to="/user/subscriptions/userChannelSubscribers">
          <span>
            <h4>channel subscribers</h4>
            <p>&#x2192;</p>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SubscribedChannels;
