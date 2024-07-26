import {
  axios,
  server,
  useEffect,
  useState,
  Link,
  useNavigate,
} from "../../imports";

function Sidebar(props) {
  const [userData, setUserData] = useState({});
  // console.log(userData)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const user = await axios
        .get(`${server}/users/current-user`, { withCredentials: true })
        .then((res) => res.data);
      setUserData(user.data);
    }
    fetchUser();
  }, []);

  async function handleClick() {
    await axios.post(`${server}/users/logout`, {}, { withCredentials: true });
    navigate("/");
  }
  return (
    <div className={`sidebar ${props.isOpen ? "active" : ""}`}>
      <div
        id="menu-icon"
        className={`${props.isOpen ? "active" : ""}`}
        onClick={() => props.toggleMenu()}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Link to="/user/home" onClick={() => props.toggleMenu()}>
        Home
      </Link>
      <Link to="/user/profile" onClick={() => props.toggleMenu()}>
        View profile
      </Link>
      <Link
        to={`/user/channel-profile/${userData._id}`}
        onClick={() => props.toggleMenu()}
      >
        Your channel
      </Link>
      <Link to="/user/videos" onClick={() => props.toggleMenu()}>
        Your videos
      </Link>
      <Link to="/user/tweets" onClick={() => props.toggleMenu()}>
        Your tweets
      </Link>
      <Link to="/user/playlists" onClick={() => props.toggleMenu()}>
        Playlists
      </Link>
      <Link to="/user/subscriptions" onClick={() => props.toggleMenu()}>
        Subscriptions
      </Link>
      <Link to="/user/history" onClick={() => props.toggleMenu()}>
        History
      </Link>
      <hr style={{ opacity: ".2" }} />
      <Link onClick={handleClick}>
        <img src="/icons8-logout-30.webp" alt="" />
        Logout
      </Link>
    </div>
  );
}

export default Sidebar;
