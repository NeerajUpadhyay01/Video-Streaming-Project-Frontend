import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Navbar(props) {
  const [searchdata, setSearchData] = useState("");

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
      <img id="app-logo" src="/icons8-video-100.png" alt="app-logo" />
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
            src="/icons8-search-200.png"
            alt="search-logo"
          />
        </button>
      </form>
      <img
        id="avatar"
        src="/icons8-avatar-48.png"
        alt="avatar"
        onClick={() => props.toggleMenu()}
      />
    </div>
  );
}

export default Navbar;
