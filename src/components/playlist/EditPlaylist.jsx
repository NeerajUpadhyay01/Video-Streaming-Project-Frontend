import axios from "axios";
import React, { useState } from "react";
import { server } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";

function EditPlaylist() {
  const { playlistId } = useParams();
  // console.log(playlistId)

  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevdata) => {
      return { ...prevdata, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios
      .patch(
        `${server}/playlist/${playlistId}`,
        {
          name: data.name,
          description: data.description,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data);
    // console.log(response);
    if (response.success === true) {
      navigate("/user/playlists");
    }
  }
  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="playlistForm">
        <input
          type="text"
          name="name"
          placeholder="name"
          value={data.name}
          onChange={handleChange}
          required
        />
        <textarea
          cols="30"
          rows="10"
          name="description"
          placeholder="description"
          value={data.description}
          onChange={handleChange}
          required
        ></textarea>
        <button>update playlist</button>
      </form>
    </div>
  );
}

export default EditPlaylist;
