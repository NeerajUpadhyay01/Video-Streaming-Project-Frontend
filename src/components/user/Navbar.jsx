import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { server } from "../../constants";

function Navbar(props) {
  const [searchdata, setSearchData] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await axios
        .get(`${server}/users/current-user`, { withCredentials: true })
        .then((res) => res.data);
      setAvatar(response.data.avatar);
    }
    fetchUser();
  }, []);

  function handleChange(e) {
    setSearchData((prevData) => {
      return (prevData = e.target.value);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="Navbar">
      <img id="app-logo" src="/icons8-video-100.webp" alt="app-logo" />
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search"
          spellCheck="false"
          name="serachData"
          value={searchdata.searchdata}
          onChange={handleChange}
        />
        <button>
          <img
            id="search-logo"
            src="/icons8-search-200.webp"
            alt="search-logo"
          />
        </button>
      </form>
      <img
        id="avatar"
        src={avatar}
        alt="avatar"
        onClick={() => props.toggleMenu()}
      />
    </div>
  );
}

export default Navbar;
