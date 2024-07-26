import {
  axios,
  server,
  useFormattedDate,
  useEffect,
  useState,
  useParams,
  PlaylistVideo
} from "../../imports";

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

  const formattedDate = useFormattedDate(playlistData.createdAt);

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
