import React, { useEffect, useState } from "react";
import axios from "axios";
import Video from "../video/Video";
import { server } from "../../constants";

function History() {
  const [data, setData] = useState([]);
  // console.log(data)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${server}/users/history`,{withCredentials:true}
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [data]);

  // console.log(data)
  return (
    <div className="history">
      {/* {data.map((data) => {
        <Video key={data._id} data={data} />;
      })} */}
    </div>
  );
}

export default History;
