import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  App,
  ChangePassword,
  Layout,
  EditPlaylist,
  EditTweet,
  Subscriptions,
  SubscribedChannels,
  PlaylistDetail,
  PlayLists,
  PlaylistSelection,
  LandingPage,
  VideoDetail,
  UpdateVideo,
  UserChannelSubscribers,
  UserPlaylists,
  UserProfile,
  UserTweets,
  CreateTweet,
  CreatePlaylist,
  ChannelProfile,
  ChannelVideos,
  Video,
  Tweets,
  Login,
  Register,
  Home,
  User,
  History,
  PublishVideo,
} from "./imports.jsx";

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
          <Route
            path=":videoId/select-playlist"
            element={<PlaylistSelection />}
          />
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
