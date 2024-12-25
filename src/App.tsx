import {Outlet} from "react-router-dom";
import {useAppDispatch} from "./hooks/redux.ts";
import {useEffect} from "react";
import {login} from "./store/redusers/auth/auth.store.ts";
import {setUser} from "./store/redusers/user/user.store.ts";
import "./App.css"

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const idToken = localStorage.getItem('idToken');

    if (uid && idToken) {
      dispatch(login({role: 'user', idToken}));
      dispatch(setUser({uid, email: 'tesliamain@gmail.com', name: ''}));
    }
  }, [dispatch]);


  return (
      <>
        <Outlet/>
      </>
  )
}

export default App
