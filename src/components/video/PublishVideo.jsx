import axios from 'axios';
import React, { useState } from 'react'
import { server } from '../../constants';

function PublishVideo() {
   const [ data, setData ] = useState({
    title: "",
    description: "",
    videoFile: "",
    thumbnail: "",
  });

  function handleChange(e){
    const {name,value}=e.target
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

  async function handelSubmit(e){
    e.preventDefault();  
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile);
    formData.append("thumbnail", data.thumbnail); 

    const response = await axios
      .post(`${server}/videos/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((error) => console.log(error));

    if (response.success===true) {
      // setData(prevData => {
      //   return {...prevData,isRegistered:true}
      // })
      navigate("/user/videos");
    }
  }
  return (
    <div className="formContainer">
      <form action="" className="videoForm" onSubmit={handelSubmit}>
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
          name="videoFile"
          onChange={handleFileChange}
          required
        />
        <input
          className="file"
          type="file"
          name="thumbnail"
          onChange={handleFileChange}
        />
        <button>publish video</button>
      </form>
    </div>
  );
}

export default PublishVideo