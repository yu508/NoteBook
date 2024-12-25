import {FormEvent, useState} from 'react';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

import "./LoginAndSingup.scss";

import user_icon from "../../assets/photos/person.png"
import email_icon from "../../assets/photos/email.png"
import password_icon from "../../assets/photos/password.png"
import {useAppDispatch} from "../../hooks/redux.ts";
import {setUser} from "../../store/redusers/user/user.store.ts";
import {login} from "../../store/redusers/auth/auth.store.ts";
import app from "./../../firebase.tsx";

const LoginAndSingup = () => {

  const auth = getAuth(app);

  const dispatch = useAppDispatch()

  const [action, setAction] = useState("Sign Up")
  const [name, setName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (action === "Sign Up") {
        await createUserWithEmailAndPassword(auth, userEmail, password);
        setAction("Login")
        setPassword("")
      } else if(action === "Login"){
        const res = await signInWithEmailAndPassword(auth, userEmail, password);

        console.log(res)

        const user = res.user;
        const uid = user.uid;
        const email = user.email;
        const displayName = user.displayName || ""; // Використовується як name
        const idToken = await user.getIdToken();

        dispatch(setUser({ uid, email, name: displayName }));
        console.log(uid)

        dispatch(login({role: "user", idToken}))
        localStorage.setItem('isLoggedIn', JSON.stringify(true))
        localStorage.setItem('uid', uid);
        localStorage.setItem('idToken', idToken);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const changeMethod = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    action === "Sign Up" ? setAction("Login") : setAction("Sign Up")
    setPassword("")
  };
  return (
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
        </div>
        <form className="inputs" onSubmit={(e) => handleSubmit(e)}>
          {action === "Sign Up" ?
              <div className="input">
                <img src={user_icon} alt=""/>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
              </div>
              : <></>}
          <div className="input">
            <img src={email_icon} alt=""/>
            <input
                type="email"
                value={userEmail}
                placeholder="Email"
                onChange={(e) => setUserEmail(e.target.value)}
            />

          </div>
          <div className="input">
            <img src={password_icon} alt=""/>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {action === "Sign Up" ? <></> :
              <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
          <div className="submit-container">
            <button
                className={"submit"}
            >
              {action}
            </button>
          </div>
          <div className="change-method">
            {action === "Sign Up" ?
                <> Have an account? <span onClick={changeMethod}>Login!</span> </>
                :
                <> Don't have an account? <span onClick={changeMethod}>Sign Up!</span> </>
            }

          </div>
        </form>
      </div>
  );
};

export default LoginAndSingup;