import App from "./App";
import LogPage from "./public/Log-in";
import SignPage from "./public/Sign-in";
import HomePage from "./pages/Home";
import CreatePage from "./pages/Create";
import UsersPage from "./pages/Users";
import LikesPage from "./pages/Likes";
import SinglePost from "./pages/SinglePost";
import ProfilePage from "./pages/Profile";
import UserByIdPage from "./pages/UserByIdPage";
import ChatPage from "./pages/Message";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/create", element: <CreatePage /> },
      { path: "/users", element: <UsersPage /> },
      { path: "/liked-posts", element: <LikesPage /> },
      { path: "/post/:id", element: <SinglePost /> },
      { path: "/view-profile", element: <ProfilePage /> },
      { path: "/user/:id", element: <UserByIdPage /> },
      { path: "/chat", element: <ChatPage /> },
    ],
  },
  {
    path: "/auth/sign-in",
    element: <SignPage />,
  },
  {
    path: "/auth/log-in",
    element: <LogPage />,
  },
];

export default routes;
