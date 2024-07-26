import { axios, server, Link, useNavigate, useState } from "../../imports";
import Loader from "../Loader";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
    // isLoggedIn:false
  });
  const [isLoading,setIsLoading] = useState(false)

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
    e.preventDefault();
    setIsLoading(true)
    const response = await axios
      .post(
        `${server}/users/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data);

    if (response) {
      // setData(prevData => {
      //   return {
      //     ...prevData,
      //     isLoggedIn:true
      //   }
      // })
      navigate("/user/home");
      setIsLoading(false)
    }
  }
  return (
    <div className="formContainer">
      {/* //   {data.isLoggedIn ? ( */}
      {/* //     <p>You are logged in! Redirecting...</p> */}
      {/* //   ) : ( */}
      <form className="LoginForm" onSubmit={handelSubmit}>
        <input
          type="email"
          spellCheck="false"
          name="email"
          placeholder="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={data.password}
          onChange={handleChange}
        />
        <button>{!isLoading ? "Login" : <Loader/>}</button>
        <p>
          Don't have an account? <Link to="/register">register here</Link>
        </p>
      </form>
      {/* )} */}
    </div>
  );
}

export default Login;
