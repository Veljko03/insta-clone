import App from "./App";
import LogPage from "./public/Log-in";
import SignPage from "./public/Sign-in";

const routes = [
  {
    path: "/",
    element: <App />,
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
