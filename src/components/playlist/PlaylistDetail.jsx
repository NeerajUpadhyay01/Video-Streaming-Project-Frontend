import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../constants";
import PlaylistVideo from "./PlaylistVideo";

function PlaylistDetail() {
  const { playlistId } = useParams();
  const [playlistData, setPlaylistData] = useState({});
  const [refresh, setRefresh] = useState(false);

  const location =  "playlistDetail"

  useEffect(() => {
    async function fetchPlaylist() {
      const response = await axios
        .get(`${server}/playlist/${playlistId}`, { withCredentials: true })
        .then((res) => res.data);
      // console.log(response.data)
      if (response) {
        setPlaylistData(response.data[0]);
      }
    }
    fetchPlaylist();
  }, [refresh]);

  const createdAtDate = new Date(playlistData.createdAt);
  const year = createdAtDate.getFullYear();
  const month = createdAtDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = createdAtDate.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  async function removeVideo(videoId){
    const response = await axios.patch(`${server}/playlist/remove/${videoId}/${playlistId}`,{},{
      withCredentials: true
    }).then(res => res.data)
    // console.log(response)
    if(response.success === true){
      setRefresh(!refresh)
    }
  }

  return (
    <div className="playlistDetail">
      <div className="leftDiv">
        <h1>{playlistData.name}</h1>
        <span id="username">
          <img src="/icons8-username-48.webp" alt="" />
          {playlistData.owner && playlistData.owner.username}
        </span>
        <h3>{playlistData.description}</h3>
        <p>{formattedDate}</p>
      </div>
      <div className="rightDiv">
        {playlistData.videos?.map((video) => {
          return <PlaylistVideo key={video._id} video={video} removeVideo={removeVideo} location={location}/>;
        })}
      </div>
    </div>
  );
}

export default PlaylistDetail;
