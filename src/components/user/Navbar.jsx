import { axios, server, useEffect, useState, useNavigate } from "../../imports";

function Navbar(props) {
  const [searchData, setsearchData] = useState("");
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const response = await axios
        .get(`${server}/users/current-user`, { withCredentials: true })
        .then((res) => res.data);
      setAvatar(response.data.avatar);
    }
    fetchUser();
  }, []);

  function handleChange(e) {
    setsearchData(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchData !== "") {
      navigate(`/user/home?query=${searchData}`);
    }
  }

  function handleClick() {
    navigate("/user/home");
  }

  return (
    <div className="Navbar">
      <img
        id="app-logo"
        src="/Designer (4).webp"
        alt="app-logo"
        onClick={handleClick}
      />
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search"
          spellCheck="false"
          name="serachData"
          value={searchData}
          onChange={handleChange}
        />
        <button>
          <img
            id="search-logo"
            src="/icons8-search-200.webp"
            alt="search-logo"
          />
        </button>
      </form>
      <img
        id="avatar"
        src={avatar ? avatar : "/icons8-user-64.webp"}
        alt="avatar"
        onClick={() => props.toggleMenu()}
      />
    </div>
  );
}

export default Navbar;
