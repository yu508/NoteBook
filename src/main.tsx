import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App.tsx";
import AuthenticationPage from "./pages/authentication-page/AuthenticationPage.tsx";
import {Provider} from "react-redux";
import store from "./store/store.ts";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Posts from "./pages/Posts.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute> <App/> </ProtectedRoute>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: '/', element: <Posts/>
      },
      {
        path: '/authentication', element:
            <AuthenticationPage/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
)