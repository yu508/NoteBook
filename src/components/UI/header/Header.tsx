import {FC} from 'react';
import user from "./../../../assets/photos/user.png"
import "./Header.scss";
import {useAppDispatch} from "../../../hooks/redux.ts";
import {logout} from "../../../store/redusers/auth/auth.store.ts";
import {clearUser} from "../../../store/redusers/user/user.store.ts";

const Header: FC = () => {

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearUser())
  }

  return (
      <header className='main-header'>
        <div className="header-container">
          <div className="header-container__left">
            <h1 className="header-title">Нотатник</h1>
          </div>
          <div className="header-container__right">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>
  );
};

export default Header;
