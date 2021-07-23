import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

interface LoginOptions {
  token: string;
  userId: string;
}
interface FormOptions {
  email: string;
  password: string;
}
function AuthPage() {
  const [errMessage, setErrMessage] = useState("");
  const [regErrMessage, setRegErrMessage] = useState("");
  const history = useHistory();
  const [form, setForm] = useState<FormOptions>({
    email: "",
    password: "",
  });
  const { login }: { login: (jwtToken: string, id: string) => void } =
    useContext(AuthContext);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      await axios
        .post(
          "https://yshrt.herokuapp.com/api/auth/registration",
          { ...form },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          history.replace("/main");
        })
        .catch((err) => {
          setRegErrMessage(err.response.data.message);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const loginHandler = async () => {
    try {
      await axios
        .post<LoginOptions>(
          "https://yshrt.herokuapp.com/api/auth/login",
          { ...form },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          login(response.data.token, response.data.userId);
        })
        .catch((err) => {
          setErrMessage(err.response.data.message);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Router>
      <Switch>
        <React.Fragment>
          <Route exact path="/">
            <h3>Авторизация</h3>
            <div className="container login-form">
              <h4>Логин</h4>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={changeHandler}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={changeHandler}
                  />
                </div>
                {errMessage ? (
                  <div className="alert alert-danger" role="alert">
                    {errMessage}
                  </div>
                ) : null}
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => loginHandler()}
                >
                  Submit
                </button>
                <Link
                  to="/registration"
                  className="btn btn-outline-dark btn-not-acc"
                >
                  Нет аккаунта ?
                </Link>
              </form>
            </div>
          </Route>

          <Route path="/registration">
            <h3>Авторизация</h3>
            <div className="container login-form">
              <h4>Регистрация</h4>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={changeHandler}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={changeHandler}
                  />
                </div>
                {regErrMessage ? (
                  <div className="alert alert-danger" role="alert">
                    {regErrMessage}
                  </div>
                ) : null}
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => registerHandler()}
                >
                  Submit
                </button>
                <Link to="/" className="btn btn-outline-dark btn-not-acc">
                  Уже есть аккаунт ?
                </Link>
              </form>
            </div>
          </Route>
        </React.Fragment>
      </Switch>
    </Router>
  );
}
export default AuthPage;
