import Loader from "../Loader";
import { axios, server, useState, useNavigate } from "../../imports";

function CreatePlaylist(props) {
  const [isLoading, setIsLoading] = useState(false);
  // console.log(props)
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevdata) => {
      return { ...prevdata, [name]: value };
    });
  }

  async function handleSubmit(e) {
    setIsLoading(true)
    e.preventDefault();
    const response = await axios
      .post(
        `${server}/playlist/`,
        {
          name: data.name,
          description: data.description,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data);
    // console.log(response);
    if (response.success === true) {
      {
        !props.location && navigate("/user/playlists");
      }
    }
    props.refresh();
    props.handleClick();
    setIsLoading(false);
  }

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="playlistForm">
        <input
          type="text"
          name="name"
          placeholder="name"
          value={data.name}
          onChange={handleChange}
          required
        />
        <textarea
          cols="30"
          rows="10"
          name="description"
          placeholder="description"
          value={data.description}
          onChange={handleChange}
          required
        ></textarea>
        <button>{!isLoading ? "Create Playlist" : <Loader />}</button>
      </form>
    </div>
  );
}

export default CreatePlaylist;
