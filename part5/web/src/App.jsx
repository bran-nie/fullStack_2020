import React, { Suspense } from 'react';
import routes from './router/index';
import Login from './pages/login/index';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = () => {
    return (
        <>
            <Login />
            <Router>
                <div>
                    <nav>
                        {routes.map((route) => {
                            return (
                                <button key={route.path}>
                                    <Link to={route.path}>{route.path}</Link>
                                </button>
                            );
                        })}
                    </nav>
                    <Suspense fallback={<div>loading...</div>}>
                        <Switch>
                            {routes.map((route) => {
                                return (
                                    <Route
                                        exact={route.expect}
                                        path={route.path}
                                        component={route.component}
                                        key={route.path}
                                    ></Route>
                                );
                            })}
                        </Switch>
                    </Suspense>
                </div>
            </Router>
        </>
    );
};

export default App;
