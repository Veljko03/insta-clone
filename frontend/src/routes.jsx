import App from "./App";
import LogPage from "./public/Log-in";
import SignPage from "./public/Sign-in";
import HomePage from "./pages/Home";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      // { path: "/shop", element: <Shop /> },
      // { path: "/basket", element: <Basket /> },
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
