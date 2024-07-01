import React, { useEffect, useState } from "react";
import Playlist from "./Playlist";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants";

function UserPlaylists() {
  const [playlistData,setPlaylistData]=useState([]);
  const [userData, setUserData] = useState({});
  const [refreshPlaylists, setRefreshPlaylists] = useState(false);
  // console.log(userData.data)
  // console.log(playlistData)


  useEffect(()=>{
    async function fetchPlaylists(){
      const user=await axios.get(`${server}/users/current-user`,{withCredentials:true}).then(res=>res.data)
      setUserData(user)
      // console.log(user)
      const response=await axios.get(`${server}/playlist/user/${user.data._id}`,{withCredentials:true}).then(res=>res.data);
      // console.log(response.data);

      setPlaylistData(response.data);
    }
    fetchPlaylists();
  },[refreshPlaylists])

  function refresh(){
    setRefreshPlaylists(!refreshPlaylists)
  }
  
  return (
    <div className="userPlaylists">
      <div id="playlists">
        {playlistData.map(playlist => {
          return <Playlist key={playlist._id} playlist={playlist} username={userData.data.username} refresh={refresh}/>
        })}
      </div>
      <div id="addButton">
        <Link to="/user/playlists/create-playlist">
          <img src="/icons8-plus-64.png" alt="" />
        </Link>
      </div>
    </div>
  );
}

export default UserPlaylists;
