import { createBrowserRouter } from "react-router-dom";

import MainLayouts from "../Layout/MainLayouts";
import Home from "../Component/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MarathonSecTionDetal from "../Component/MarathonSecTionDetal";
import AddMarathon from "../Component/AddMarathon";
import Marathons from "../Component/Marathons";
import MyMarathons from "../Component/MyMarathons";
import UpdateMarathon from "../Component/UpdateMarathon";
import ProfilePage from "../Component/ProfilePage";
import MyApplyList from "../Component/MyApplyList";
import MarathonApplyPage from "../Component/MarathonApplyPage";
import DashboardLayout from "../Component/DashboardLayout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import NotFound from "../Pages/NotFound";
import About from "../Component/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path:"/about",
        Component:About,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "marathons",
        element: (
          <PrivateRoute>
            <Marathons />
          </PrivateRoute>
        ),
      },
      {
        path: "marathonsdetails/:id",
        element: (
          <PrivateRoute>
            <MarathonSecTionDetal />
          </PrivateRoute>
        ),
      },
      {
        path: "marathonsdetails/:id/apply",
        element: (
          <PrivateRoute>
            <MarathonApplyPage />
          </PrivateRoute>
        ),
      },
      {
  path: "*",
  element: <NotFound/>,
},
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "add-marathon",
            element: <AddMarathon />,
          },
          {
            path: "my-marathons",
            element: <MyMarathons />,
          },
          {
            path: "update-marathon/:id",
            element: <UpdateMarathon />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "my-apply", // Only one route name
            element: <MyApplyList />,
          },
          {
            path: "my-applications", // Only one route name
            element: <MyApplyList />,
          },
        ],
      },
    ],
  },
]);

export default router;
