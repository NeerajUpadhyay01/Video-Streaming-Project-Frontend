import "./App.css";
import { useEffect, axios, server } from "./imports.jsx";

function App() {
  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        await axios.post(
          `${server}/refresh-token`,
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error refreshing token", error);
      }
    };

    refreshAccessToken();
  }, []);
  return <></>;
}

export default App;
