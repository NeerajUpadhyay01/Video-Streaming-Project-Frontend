import Video from "../video/Video";
import {
  axios,
  server,
  useFormattedDate,
  useEffect,
  useState,
  useParams,
  Playlist,
} from "../../imports";

function ChannelProfile() {
  const [videoData, setVideoData] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [userData, setUserData] = useState({});
  const { userId } = useParams();
  // console.log(userData)
  // console.log(playlistData)

  const location = "ChannelProfile";

  useEffect(() => {
    async function fetchChannelVideos() {
      const response = await axios
        .get(`${server}/videos`, {
          params: { userId: userId },
          withCredentials: true,
        })
        .then((res) => res.data);
      // console.log(response.data)
      setVideoData(response.data.videos);
    }
    fetchChannelVideos();
    async function fetchPlaylists() {
      const user = await axios
        .get(`${server}/users`, {
          params: { userId: userId },
          withCredentials: true,
        })
        .then((res) => res.data);
      setUserData(user.data);
      // console.log(user)
      const response = await axios
        .get(`${server}/playlist/user/${userId}`, {
          withCredentials: true,
        })
        .then((res) => res.data);
      // console.log(response.data);

      setPlaylistData(response.data);
    }
    fetchPlaylists();
  }, [userId, refreshData]);

  const formattedDate = useFormattedDate(userData.createdAt);

  function refresh() {
    setRefreshData(!refreshData);
  }

  return (
    <div className="userProfile">
      <div className="userProfile_sidePannel">
        <div className="userProfile_sidePannel_info">
          <div className="images">
            <img id="coverImage" src={`${userData.coverImage}`} alt="" />
            <img id="avatar" src={`${userData.avatar}`} alt="" />
          </div>
          <div className="user_details">
            <h2>{userData.fullname}</h2>
            <p id="username">
              <img src="/icons8-username-48.webp" alt="" />
              {userData.username}
            </p>
            <p id="bio">{userData.bio}</p>
          </div>
        </div>
      </div>
      <div className="channelProfile">
        <div className="channelProfile_stats">
          <span>
            <h3>{videoData.length}</h3>
            <p>Videos</p>
          </span>
          <span>
            <h3>{userData.subscribers}</h3>
            <p>Subscribers</p>
          </span>
          <span>
            <h3>{formattedDate}</h3>
            <p>Created At</p>
          </span>
        </div>
        <hr style={{ opacity: ".2" }} />
        <div className="channelProfile_videos">
          {videoData?.map((video) => {
            return <Video key={video._id} video={video} location={location}/>;
          })}
        </div>
        <hr style={{ opacity: ".2" }} />
        <div className="channelProfile_playlists">
          {playlistData?.map((playlist) => {
            return (
              <Playlist
                key={playlist._id}
                playlist={playlist}
                refresh={refresh}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ChannelProfile;
