import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import History from "./components/user/History.jsx";
import UserProfile from "./components/user/UserProfile.jsx";
import Home from "./components/user/Home.jsx";
import User from "./layout/User.jsx";
import ChangePassword from "./components/user/ChangePassword.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import ChannelProfile from "./components/user/ChannelProfile.jsx";
import PublishVideo from "./components/video/PublishVideo.jsx";
import ChannelVideos from "./components/video/ChannelVideos.jsx";
import Video from "./layout/Video.jsx";
import Tweets from "./layout/Tweets.jsx";
import UserTweets from "./components/tweet/UserTweets.jsx";
import CreateTweet from "./components/tweet/CreateTweet.jsx";
import PlayLists from "./layout/Playlists.jsx";
import UserPlaylists from "./components/playlist/UserPlaylists.jsx";
import PlaylistDetail from "./components/playlist/PlaylistDetail.jsx";
import CreatePlaylist from "./components/playlist/CreatePlaylist.jsx";
import EditPlaylist from "./components/playlist/EditPlaylist.jsx";
import EditTweet from "./components/tweet/EditTweet.jsx";
import Subscriptions from "./layout/Subscriptions.jsx";
import SubscribedChannels from "./components/subscription/SubscribedChannels.jsx";
import UserChannelSubscribers from "./components/subscription/UserChannelSubscribers.jsx";
import UpdateVideo from "./components/video/UpdateVideo.jsx";
import VideoDetail from "./components/video/VideoDetail.jsx";
import LandingPage from "./components/LandingPage.jsx"
import PlaylistSelection from "./components/playlist/PlaylistSelection.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<LandingPage />} />
      <Route path="user" element={<User />}>
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="channel-profile/:userId" element={<ChannelProfile />} />
        <Route path="videos" element={<Video />}>
          <Route path="" element={<ChannelVideos />} />
          <Route path="publish-video" element={<PublishVideo />} />
          <Route path=":videoId" element={<VideoDetail />} />
          <Route path="update-video/:videoId" element={<UpdateVideo />} />
        </Route>
        <Route path="tweets" element={<Tweets />}>
          <Route path="" element={<UserTweets />} />
          <Route path="create-tweet" element={<CreateTweet />} />
          <Route path="edit-tweet/:tweetId" element={<EditTweet />} />
        </Route>
        <Route path="playlists" element={<PlayLists />}>
          <Route path="" element={<UserPlaylists />} />
          <Route path=":playlistId" element={<PlaylistDetail />} />
          <Route path="create-playlist" element={<CreatePlaylist />} />
          <Route path="edit-playlist/:playlistId" element={<EditPlaylist />} />
          <Route path=":videoId/select-playlist" element={<PlaylistSelection/>}/>
        </Route>
        <Route path="subscriptions" element={<Subscriptions />}>
          <Route path="" element={<SubscribedChannels />} />
          <Route
            path="userChannelSubscribers"
            element={<UserChannelSubscribers />}
          />
        </Route>
        <Route path="history" element={<History />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
