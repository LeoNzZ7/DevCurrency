import { RouterProvider } from 'react-router-dom'
import router from "./router"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <>
      <ToastContainer autoClose={3000} limit={1} />
      <RouterProvider router={router} />
    </>
  )
}

export default App