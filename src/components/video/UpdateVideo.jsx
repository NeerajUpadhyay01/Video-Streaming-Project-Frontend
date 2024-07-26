import { axios, server, useNavigate, useParams, useState } from "../../imports";
import Loader from "../Loader";

function UpdateVideo() {
  const { videoId } = useParams();

  const [data, setData] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function handleFileChange(e) {
    const { name, files } = e.target;
    console.log(files[0]);

    setData((prevData) => ({
      ...prevData,
      [name]: files[0], // Store the selected file object
    }));
  }

  async function handelSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", data.thumbnail);

    const response = await axios
      .patch(`${server}/videos/${videoId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((error) => console.log(error));

    if (response.success === true) {
      // setData(prevData => {
      //   return {...prevData,isRegistered:true}
      // })
      setIsLoading(false);
      navigate("/user/videos");
    }
  }
  return (
    <div className="formContainer">
      <form action="" className="videoForm updateVideo" onSubmit={handelSubmit}>
        <input
          type="text"
          spellCheck="false"
          name="title"
          placeholder="title"
          value={data.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          spellCheck="false"
          name="description"
          placeholder="description"
          value={data.description}
          onChange={handleChange}
          required
        />
        <input
          className="file"
          type="file"
          name="thumbnail"
          onChange={handleFileChange}
          required
        />
        <button>{!isLoading ? "Update Video" : <Loader />}</button>
      </form>
    </div>
  );
}

export default UpdateVideo;
