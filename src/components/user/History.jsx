import Video from "../video/Video";
import { axios, server, useEffect, useState } from "../../imports";

function History() {
  const [data, setData] = useState([]);
  // console.log(data);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${server}/users/history`, {
          withCredentials: true,
        }).then(res => res.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[]);

  return (
    <div className="history">
      {data.map((video) => {
        return <Video key={video._id} video={video} />;
      })}
    </div>
  );
}

export default History;
