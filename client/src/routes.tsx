import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Main} from "./components/Main";
import AuthPage from "./components/AuthPage";
import {Create} from "./components/Create";
import {LinksList} from "./components/LinksList";
import {Detail} from "./components/Detail";
export const useRoutes = (isLogin: boolean) => {
    if (isLogin) {
        return (
            <Switch>
                <Route
                    exact
                    path="/main"
                    render={() => (
                        <Main />
                    )}
                />
                <Route
                    exact
                    path="/create"
                    render={() => (
                        <Create />
                    )}
                />
                <Route
                    exact
                    path="/links"
                    render={() => (
                        <LinksList />
                    )}
                />
                <Route
                    exact
                    path="/detail/:id"
                    render={() => (
                        <Detail />
                    )}
                />
            <Redirect to="/main" />
            </Switch>
    )
    }
    return (
        <Switch>
            <Route path="/" exact component={AuthPage}></Route>
        <Redirect to="/" />
        </Switch>
)
}