import { axios, server, useEffect, useState, Link } from "../../imports";

function UserProfile() {
  const [data, setData] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
    avatar: null,
    coverImage: null,
    isDisabled: true,
  });

  useEffect(() => {
    async function fetchCurrentUser() {
      const response = await axios
        .get(`${server}/users/current-user`, { withCredentials: true })
        .then((res) => res.data);
      // console.log(response);

      if (response.success === true) {
        setData((prevData) => {
          return {
            ...prevData,
            fullname: response.data.fullname,
            username: response.data.username,
            email: response.data.email,
            bio: response.data.bio,
            avatar: response.data.avatar,
            coverImage: response.data.coverImage,
          };
        });
      }
    }
    fetchCurrentUser();
  }, []);

  function toggleFormDisability() {
    setData((prevData) => {
      return { ...prevData, isDisabled: !data.isDisabled };
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevData) => {
      return { ...prevData, [name]: value };
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

  async function handleDetails(e) {
    e.preventDefault();

    const response = await axios
      .patch(
        `${server}/users/update-account`,
        {
          fullname: data.fullname,
          email: data.email,
          bio: data.bio,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data);

    if (response.success === true) {
      setData((prevData) => {
        return { ...prevData, isDisabled: !data.isDisabled };
      });
    }
  }

  async function handleAvatar(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", data.avatar);

    const response = await axios
      .patch(`${server}/users/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => res.data);

    if (response.success === true) {
      setData((prevData) => {
        return { ...prevData, isDisabled: !data.isDisabled };
      });
    }
  }

  async function handleCoverImage(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("coverImage", data.coverImage);

    const response = await axios
      .patch(`${server}/users/cover-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => res.data);

    if (response.success === true) {
      setData((prevData) => {
        return { ...prevData, isDisabled: !data.isDisabled };
      });
    }
  }
  return (
    <div className="userProfile">
      <div className="userProfile_sidePannel">
        <div className="userProfile_sidePannel_info">
          <div className="images">
            <img id="coverImage" src={data.coverImage} alt="" />
            <img id="avatar" src={data.avatar} alt="" />
          </div>
          <div className="user_details">
            <h2>{data.fullname}</h2>
            <p id="username">
              <img src="/icons8-username-48.webp" alt="" />
              {data.username}
            </p>
            <p id="bio">{data.bio}</p>
          </div>
          <button onClick={toggleFormDisability}>edit profile</button>
        </div>
      </div>
      <div className="forms">
        <form action="" id="userDetailForm" onSubmit={handleDetails}>
          <input
            type="text"
            name="fullname"
            value={data.fullname}
            onChange={handleChange}
            placeholder="fullname"
            disabled={data.isDisabled}
          />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="email"
            disabled={data.isDisabled}
          />
          <textarea
            name="bio"
            value={data.bio}
            onChange={handleChange}
            cols="30"
            rows="5"
            placeholder="bio"
            disabled={data.isDisabled}
          ></textarea>
          <button>save</button>
        </form>
        <form action="" id="file" onSubmit={handleAvatar}>
          <input
            className="file"
            type="file"
            name="avatar"
            onChange={handleFileChange}
            required
          />
          <button>save</button>
        </form>
        <form action="" id="file" onSubmit={handleCoverImage}>
          <input
            className="file"
            type="file"
            name="coverImage"
            onChange={handleFileChange}
          />
          <button>save</button>
        </form>
        <Link to="/user/change-password">
          <span>
            <h4>change password</h4>
            <p>&rarr;</p>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;
