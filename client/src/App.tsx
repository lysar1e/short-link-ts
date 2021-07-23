import React from 'react';
import './App.css';
// @ts-ignore
import {useAuth} from 'auth-hook-yera';
import {useRoutes} from "./routes";
import { AuthContext } from './context/AuthContext';
import {BrowserRouter as Router, Switch} from "react-router-dom";

interface AuthUserModel {
  login: (jwtToken: string, id: string) => void;
  logout: () => void;
  token: string;
  userId: string;
  isReady: boolean;
}
function App() {
  const {login, logout, token, userId, isReady}: AuthUserModel = useAuth();
  const isLogin = !!token;
  const routes = useRoutes(isLogin);
  return (
      <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin}}>
    <div>
      <Router>
          <Switch>
            {routes}
          </Switch>
      </Router>
    </div>
      </AuthContext.Provider>
  );
}

export default App;
