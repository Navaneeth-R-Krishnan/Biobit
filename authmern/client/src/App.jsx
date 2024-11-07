
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, HomeLayout, Landing, Login, Logout, Register, Qrscanner, ManufacturerRegister, ManufacturerLogin, RALogin, RARegister, RADashboard } from "./pages";
import { ToastContainer, toast } from 'react-toastify';




const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "manulogin",
        element: <ManufacturerLogin />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "qrscanner",
        element: <Qrscanner />,
      },
      {
        path: "manuregister",
        element: <ManufacturerRegister />,
      },
      {
        path: "ralogin",
        element: <RALogin />,
      },
      {
        path: "raregister",
        element: <RARegister />,
      },
      {
        path: "radashboard",
        element: <RADashboard />,
      },
      
    ],
  },
]);

function App() {


  return (
    <>
        <RouterProvider router={router} />
        <ToastContainer position='top-center' />
    </>
  )
}

export default App
