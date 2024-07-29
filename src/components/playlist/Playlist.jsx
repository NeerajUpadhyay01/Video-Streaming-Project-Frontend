import {
  axios,
  server,
  useEffect,
  useState,
  Link,
  useNavigate,
} from "../../imports";

function Playlist({ playlist, username, refresh }) {
  const [isActive, setIsActive] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  // console.log(currentUser)
  // console.log(playlist.videos);

  useEffect(() => {
    async function CurrentUser() {
      const response = await axios
        .get(`${server}/users/current-user`, { withCredentials: true })
        .then((res) => res.data);
      setCurrentUser(response.data);
    }
    CurrentUser();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/playlists/${playlist._id}`);
  };

  const handleClickMenu = () => {
    if (currentUser._id == playlist.owner._id) {
      setIsActive((isActive) => !isActive);
    }
  };

  const deletePlaylist = async () => {
    const response = await axios
      .delete(`${server}/playlist/${playlist._id}`, { withCredentials: true })
      .then((res) => res.data);
    // console.log(response)
    if (response.success === true) {
      refresh();
    }
  };
  return (
    <div className="playlist">
      <img
        src={playlist.videos[Math.floor(playlist.videos.length/2)]?.thumbnail || "/pexels-rickyrecap-1964471.webp"}
        alt=""
        width={250}
        height={150}
        onClick={handleClick}
      />
      <span id="playlist_no">
        <img src="/icons8-playlist-25.webp" alt="" />
        {playlist.videos.length}
      </span>
      <span id="playlist_name">
        <p>{playlist.name}</p>
        <img onClick={handleClickMenu} src="/icons8-menu-48.webp" alt="" />
        <div className={`playlist_operations ${isActive ? "active" : ""}`}>
          <span>
            <img src="/icons8-edit-48.webp" alt="" />
            <Link to={`/user/playlists/edit-playlist/${playlist._id}`}>
              <p>edit</p>
            </Link>
          </span>
          <span>
            <img src="/icons8-delete-48.webp" alt="" />
            <p onClick={deletePlaylist}>delete</p>
          </span>
        </div>
      </span>
      <span id="username">
        <img src="/icons8-username-48.webp" alt="" />
        {username || playlist.owner.username}
      </span>
    </div>
  );
}

export default Playlist;
