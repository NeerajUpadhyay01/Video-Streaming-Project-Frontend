import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../constants";

function Register() {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
    username: "",
    bio:"",
    // isRegistered: false,
  });
  console.log(data);

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
      navigate("/login");
    }
  }

  return (
    <div className="formContainer">
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
        <input
          className="file"
          type="file"
          name="avatar"
          onChange={handleFileChange}
          required
        />
        <input
          className="file"
          type="file"
          name="coverImage"
          onChange={handleFileChange}
        />
        <button>Register</button>
        <p>
          Already have an account? <Link to="/login">login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
