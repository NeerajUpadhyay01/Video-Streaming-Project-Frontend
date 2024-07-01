import React from "react";
import { useNavigate } from "react-router-dom";

function User(props) {
    // console.log(props)
    const navigate=useNavigate()

    function handleClick(){
      navigate(`/user/channel-profile/${props.user._id}`);
    }
  return (
    <div className="user" onClick={handleClick}>
      <img src={props.user.avatar} alt="" />
      <p>{props.user.username}</p>
    </div>
  );
}

export default User;
