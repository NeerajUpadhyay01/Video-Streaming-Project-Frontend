import Video from "../video/Video";
import { axios, server, useEffect, useState, Link } from "../../imports";

function ChannelVideos() {
  const [videoData, setVideoData] = useState([]);
  // console.log(videoData)

  const location = "ChannelVideos"

  useEffect(() => {
    async function fetchChannelVideos() {
      const response = await axios
        .get(`${server}/dashboard/videos`, { withCredentials: true })
        .then((res) => res.data);
      // console.log(response.data)
      setVideoData(response.data);
    }
    fetchChannelVideos();
  }, [videoData.length]);
  return (
    <div className="channelVideos">
      <div id="videos">
        {videoData.map((video) => {
          return <Video key={video._id} video={video} location={location}/>;
        })}
      </div>
      <div id="addButton">
        <Link to="/user/videos/publish-video">
          <img src="/icons8-plus-64.webp" alt="" />
        </Link>
      </div>
    </div>
  );
}

export default ChannelVideos;
