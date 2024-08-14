import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import { HomePage } from "../pages/HomePage";
import { Settings } from "../pages/Settings";
import { Feed } from "../pages/Feed";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: 'feed',
        element: <Feed />
      },
      {
        path: 'settings',
        element: <Settings />
      },
    ]
  }
])


export default router