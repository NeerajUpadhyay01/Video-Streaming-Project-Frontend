import {
  axios,
  server,
  useEffect,
  useState,
  Link,
  useNavigate,
  useParams,
  CreatePlaylist,
} from "../../imports";
import Loader from "../Loader";

function PlaylistSelection() {
  const { videoId } = useParams();
  const [playlistData, setPlaylistData] = useState([]);
  const [refreshPlaylists, setRefreshPlaylists] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [checkedPlaylists, setCheckedPlaylists] = useState([]);
  const location = "PlaylistSelection";
  const [isLoading, setIsLoading] = useState(false);
  // console.log(checkedPlaylists)
  // console.log(playlistData)

  useEffect(() => {
    async function fetchPlaylists() {
      const user = await axios
        .get(`${server}/users/current-user`, { withCredentials: true })
        .then((res) => res.data);

      const response = await axios
        .get(`${server}/playlist/user/${user.data._id}`, {
          withCredentials: true,
        })
        .then((res) => res.data);

      setPlaylistData(response.data);
    }
    fetchPlaylists();
  }, [refreshPlaylists]);

  function refresh() {
    setRefreshPlaylists(!refreshPlaylists);
  }

  function handleClick() {
    setIsClicked(!isClicked);
  }

  function handleChange(event) {
    const { id, checked } = event.target;
    const checkedPlaylist = playlistData.find(
      (playlist) => playlist._id === id
    );

    setCheckedPlaylists((prevCheckedPlaylists) => {
      if (checked) {
        return [...prevCheckedPlaylists, checkedPlaylist];
      } else {
        return prevCheckedPlaylists.filter((playlist) => playlist._id !== id);
      }
    });
  }

  const navigate = useNavigate();

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    try {
      await handleAdd();
      navigate(`/user/videos/${videoId}`);
      setIsLoading(false);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  }

  async function handleAdd() {
    const promises = checkedPlaylists.map(async (playlist) => {
      try {
        const videoExists = playlist.videos.some(
          (video) => video._id === videoId
        );
        if (!videoExists) {
          await axios.patch(
            `${server}/playlist/add/${videoId}/${playlist._id}`,
            {},
            { withCredentials: true }
          );
        }
      } catch (error) {
        console.error(`Error with playlist ${playlist._id}:`, error);
      }
    });

    await Promise.all(promises);
  }

  return (
    <>
      {!isClicked ? (
        <div className="formContainer">
          <div className="playlistSelection">
            <span>
              <p>Save video to...</p>
              <a onClick={handleClick}>
                <span id="plus">+</span> New playlist
              </a>
            </span>
            <form className="checkBox" onSubmit={handleSubmit}>
              <span>
                {playlistData.map((playlist) => {
                  return (
                    <p className="container" key={playlist._id}>
                      <input
                        type="checkbox"
                        id={playlist._id}
                        onChange={handleChange}
                      />
                      <svg viewBox="0 0 64 64" height="2em" width="2em">
                        <path
                          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                          pathLength="575.0541381835938"
                          className="path"
                        ></path>
                      </svg>
                      <label htmlFor={playlist._id}>{playlist.name}</label>
                    </p>
                  );
                })}
              </span>
              <span>
                <button type="submit">
                  {!isLoading ? "Done" : <Loader />}
                </button>
                <Link to={`/user/videos/${videoId}`}>
                  <button type="button">Cancel</button>
                </Link>
              </span>
            </form>
          </div>
        </div>
      ) : (
        <CreatePlaylist
          location={location}
          handleClick={handleClick}
          refresh={refresh}
        />
      )}
    </>
  );
}

export default PlaylistSelection;
