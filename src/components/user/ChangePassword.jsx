import { axios, server, useState, useNavigate } from "../../imports";
import Loader from "../Loader";

function ChangePassword() {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    // const {name,value}=e.target
    setData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  }

  const navigate = useNavigate();

  async function handelSubmit(e) {
    setIsLoading(true)
    e.preventDefault();

    const response = await axios
      .post(
        `${server}/users/change-password`,
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        { withCredentials: true }
      )
      .then((res) => res.data);

    if (response.success === true) {
    setIsLoading(false)
      navigate("/user/profile");
    }
  }

  return (
    <div className="formContainer">
      <form className="changePasswordForm" onSubmit={handelSubmit}>
        <input
          type="text"
          spellCheck="false"
          placeholder="old password"
          name="oldPassword"
          value={data.oldPassword}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          spellCheck="false"
          placeholder="new password"
          name="newPassword"
          value={data.newPassword}
          onChange={handleChange}
          required
        />
        <button>{!isLoading ? "Change Password" : <Loader />}</button>
      </form>
    </div>
  );
}

export default ChangePassword;
