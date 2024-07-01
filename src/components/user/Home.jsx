import React, { useEffect, useState } from "react";
import Video from "../video/Video";
import axios from "axios";
import { server } from "../../constants";

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const response = await axios
        .get(`${server}/videos/otherVideos`, { withCredentials: true })
        .then((res) => res.data);
      setVideos(response.data);
    }
    fetchVideos();
  }, []);
  return (
    <div className="home">
      {videos.map((video) => {
        // console.log(video)
        return <Video key={video._id} video={video} />;
      })}
    </div>
  );
}

export default Home;
