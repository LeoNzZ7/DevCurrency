import { Home } from "./pages/Home";
import { Details } from "./pages/Details";
import { NotFoundPage } from "./pages/NotFound";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        children: [
            { path: "/", element: <Home /> },
            { path: "/details/:cripto", element: <Details /> },
            { path: "*", element: <NotFoundPage /> }
        ]
    }
])

export default router;