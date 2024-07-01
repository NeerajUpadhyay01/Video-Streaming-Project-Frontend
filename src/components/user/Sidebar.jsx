import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../constants";

function Sidebar(props) {
  const [userData, setUserData] = useState({});
  // console.log(userData)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const user = await axios
        .get(`${server}/users/current-user`, { withCredentials: true })
        .then((res) => res.data);
      setUserData(user.data);
    }
    fetchUser();
  }, []);

  async function handleClick() {
    await axios.post(`${server}/users/logout`, {}, { withCredentials: true });
    navigate("/login");
  }
  return (
    <div className={`sidebar ${props.isOpen ? "active" : ""}`}>
      <div
        id="menu-icon"
        className={`${props.isOpen ? "active" : ""}`}
        onClick={() => props.toggleMenu()}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Link to="/user" onClick={() => props.toggleMenu()}>
        home
      </Link>
      <Link to="/user/profile" onClick={() => props.toggleMenu()}>
        view profile
      </Link>
      <Link
        to={`/user/channel-profile/${userData._id}`}
        onClick={() => props.toggleMenu()}
      >
        channel profile
      </Link>
      <Link to="/user/videos" onClick={() => props.toggleMenu()}>
        videos
      </Link>
      <Link to="/user/tweets" onClick={() => props.toggleMenu()}>
        tweets
      </Link>
      <Link to="/user/playlists" onClick={() => props.toggleMenu()}>
        playlists
      </Link>
      <Link to="/user/subscriptions" onClick={() => props.toggleMenu()}>
        subscriptions
      </Link>
      <Link to="/user/history" onClick={() => props.toggleMenu()}>
        history
      </Link>
      <hr style={{ opacity: ".2" }} />
      <Link onClick={handleClick}>
        <img src="/icons8-logout-30.webp" alt="" />
        logout
      </Link>
    </div>
  );
}

export default Sidebar;
