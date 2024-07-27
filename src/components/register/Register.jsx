import { axios, server, useNavigate, useState, Link } from "../../imports";
import Loader from "../Loader";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
    username: "",
    bio: "",
    // isRegistered: false,
  });
  // console.log(data);

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
    // console.log(files[0]);

    setData((prevData) => ({
      ...prevData,
      [name]: files[0], // Store the selected file object
    }));
  }

  async function handelSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("bio", data.bio);
    formData.append("avatar", data.avatar);
    formData.append("coverImage", data.coverImage);

    const response = await axios
      .post(`${server}/users/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .catch((error) => console.log(error));

    if (response) {
      // setData(prevData => {
      //   return {...prevData,isRegistered:true}
      // })
      setIsLoading(false);
      navigate("/login");
    }
  }

  return (
    <div className="formContainer register">
      <form className="registerForm" onSubmit={handelSubmit}>
        <input
          type="text"
          spellCheck="false"
          name="fullname"
          placeholder="fullname"
          value={data.fullname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          spellCheck="false"
          name="username"
          placeholder="username"
          value={data.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          spellCheck="false"
          name="email"
          placeholder="email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={data.password}
          onChange={handleChange}
          required
        />
        <textarea
          name="bio"
          value={data.bio}
          onChange={handleChange}
          cols="30"
          rows="5"
          placeholder="bio"
        ></textarea>{" "}
        <label htmlFor="avatar">
          <input
            className="file"
            type="file"
            name="avatar"
            id="avatar"
            onChange={handleFileChange}
            required
          />
          <span>
            <span>Avatar</span>
            {data.avatar
              ? data.avatar.name.slice(0, 8) +
                "......." +
                data.avatar.name.slice(-8)
              : "No file choosen"}
          </span>
        </label>
        <label htmlFor="coverImage">
          <input
            className="file"
            type="file"
            name="coverImage"
            id="coverImage"
            onChange={handleFileChange}
          />
          <span>
            <span>CoverImage</span>
            {data.coverImage
              ? data.coverImage.name.slice(0, 8) +
                "......." +
                data.coverImage.name.slice(-8)
              : "No file choosen"}
          </span>
        </label>
        <button>{!isLoading ? "Register" : <Loader />}</button>
        <p>
          Already have an account? <Link to="/login">login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
